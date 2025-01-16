const expiryTime = 24 * 60 * 60 * 1000;

let db;
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

async function initDB(bool = false) {
  const request = indexedDB.open("cities2-AssetDatabase");
  console.log("Starting InitDB");
  request.onerror = function (event) {
    console.log(
      "Why didn't you allow cities2-AssetDatabase to use IndexedDB?: " +
        event.target.errorCode
    );
  };

  request.onsuccess = async function (event) {
    db = event.target.result;
    currentVersion = db.version;
    if (
      !db.objectStoreNames.contains("assetData") ||
      !db.objectStoreNames.contains("langData") ||
      !db.objectStoreNames.contains("timeSince")
    ) {
      db.close();
      deleteIndexedDB();
      createDBs(db);
    }
    let hasEntry = await checkAssetData();
    if (hasEntry == 0) {
      await fetchLangDataAll();
      await fetchAssetDataAll();
      hasEntry = await checkAssetData();
    }
    console.log(`Found ${hasEntry} items in IndexedDB`);

    if (hasEntry > 0 && bool) {
      const dbInitialized = new Event("dbInitialized");
      document.dispatchEvent(dbInitialized);
    }
    else if (typeof processAssetGroup == "function") {
      await getAssetData();
    }
    
    const dbLoading = document.getElementById('db-loading');
    dbLoading.classList.add("display-none");
    console.log("IndexedDB opened successfully");
    await processTime();
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    createDBs(db);
  };
}

let lines = [];
let ail_loaded = false;
async function loadFile() {
  try {
    const response = await fetch(dataBasePath + "/ail_list.txt");
    const text = await response.text();
    lines = text.split("\n").map(line => line.trim());
    ail_loaded = true;
    console.log("AIL list loaded and stored in memory");
  } catch (error) {
    console.error("Error reading AIL list:", error);
  }
}

function findValueInLines(value) {
  const checkInterval = setInterval(checkAndTrigger, 3000);
  function checkAndTrigger() {
    if (!ail_loaded) {
      findValueInLines(value);
    } else {
      clearInterval(checkInterval);
    }
  }

  const inWhiteFolder = lines.find(line => {
    const nameWithoutExtension = getNameWithoutExtension(line);
    return nameWithoutExtension === "White\\"+value && line.startsWith("White\\");
  });

  if (inWhiteFolder) {
    return inWhiteFolder;
  }

  const inRoot = lines.find(line => {
    const nameWithoutExtension = getNameWithoutExtension(line);
    return nameWithoutExtension === value;
  });

  if (inRoot) {
    return inRoot;
  }

  return null;

  // return lines.some((line) => line.includes(value));
}

function findValueInLinesCail(value) {
  const checkInterval = setInterval(checkAndTrigger, 3000);
  function checkAndTrigger() {
    if (!ail_loaded) {
      findValueInLines(value);
    } else {
      clearInterval(checkInterval);
    }
  }

  const inCail = lines.find(line => {
    const nameWithoutExtension = getNameWithoutExtension(line);
    return nameWithoutExtension === "cail\\"+value && line.startsWith("cail\\");
  });

  if (inCail) {
    return inCail;
  }

  return null;
}

const getNameWithoutExtension = (line) => {
  return line.substring(0, line.lastIndexOf(".")) || line;
};

function createDBs(db) {
  if (!db.objectStoreNames.contains("assetData")) {
    let assetPanelData = db.createObjectStore("assetData", {
      keyPath: "PrefabID",
    });
    assetPanelData.createIndex("PrefabID", "PrefabID", { unique: true });
  }

  if (!db.objectStoreNames.contains("langData")) {
    let assetPanelData = db.createObjectStore("langData", {
      keyPath: "key",
    });
    assetPanelData.createIndex("key", "key", { unique: true });
  }

  if (!db.objectStoreNames.contains("timeSince")) {
    let timeSince = db.createObjectStore("timeSince", {
      keyPath: "name",
    });
    timeSince.createIndex("name", "name");
  }
}

// async function addAssetGroupData(data) {
//   let transaction = db.transaction(["assetGroupData"], "readwrite");
//   let transaction_t = db.transaction(["timeSince"], "readwrite");

//   transaction.oncomplete = function () {
//     console.log("Asset Group Data saved");
//   };

//   transaction.onerror = function (event) {
//     console.log("Transaction error:", event);
//   };
//   data.forEach((asset) => {
//     let objectStore = transaction.objectStore("assetGroupData");
//     objectStore.put({
//       name: asset.name,
//       icon: asset.icon,
//       group: asset.group,
//       priority: asset.priority,
//       langTitle: asset.LangTitle,
//       langDescription: asset.LangDescription,
//     });
//   });

//   let objectStore_t = transaction_t.objectStore("timeSince");
//   objectStore_t.put({ name: "assetGroupData", time: new Date().getTime() });

//   await getAssetGroupData();
// }

function checkAssetData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;
      if (result.length === 0 || result.length === undefined) {
        resolve(0);
      }
      resolve(result.length);
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

async function checkLangData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["langData"], "readonly");
    let objectStore = transaction.objectStore("langData");

    let request = objectStore.get(`Assets.NAME[Small Road]`);
    
    request.onsuccess = async function (event) {
      let result = event.target.result;
      if (result === undefined || result.length === 0 || result.length === undefined || result[0][language] === undefined) {
        resolve(false);
      }
      resolve(true);
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      resolve(false);
    };
  });
}

async function updateLangGame() {
  document.querySelectorAll('[data-lang-game]').forEach(async (el) => {
    const key = el.dataset.langGame;
    el.textContent = await getLangData(key) || key;
  });
}

async function getAssetData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;

      if (result.length === 0 || result.length === undefined) {
        // fetchAssetDataAll();
        resolve();
        return;
      } else {
        if (typeof processAssetGroup !== "function") {
          resolve();
          return;
        }
        
        await processAssetGroup(event.target.result);
        resolve();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

async function getAssetGroupData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let assets = [];
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;

        if (record.UI_Group && record.UI_Group.startsWith("UIToolbarGroupPrefab")) {
          assets.push(record);
        }

        cursor.continue();
      } else {
        resolve(assets);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving group data:", event);
      reject(event);
    };
  });
}

async function getAssetTabData(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let assets = [];
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;

        if (record.UI_Menu && record.UI_Menu.startsWith(PrefabID)) {
          assets.push(record);
        }

        cursor.continue();
      } else {
        resolve(assets);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving tab data:", event);
      reject(event);
    };
  });
}

async function getZoneBuildings(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let assets = [];
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;

        if (record.SpawnableBuilding_Zone && record.SpawnableBuilding_Zone == PrefabID) {
          assets.push(record);
        }

        cursor.continue();
      } else {
        resolve(assets);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving tab data:", event);
      reject(event);
    };
  });
}

async function getBuildingUpgrades(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let assets = [];
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;

        if (record.ServiceUpgrade_Buildings && record.ServiceUpgrade_Buildings == PrefabID) {
          assets.push(record);
        }

        cursor.continue();
      } else {
        resolve(assets);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving tab data:", event);
      reject(event);
    };
  });
}

async function getLangData(format, lang = language) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["langData"], "readonly");
    let objectStore = transaction.objectStore("langData");

    let request = objectStore.get(format);

    request.onsuccess = function (event) {
      let data = event.target.result;

      if (data && lang in data) {
        resolve(data[lang]);
      } else {
        resolve(format);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving lang data:", event);
      reject(event);
    };
  });
}

async function getLangDataRandomly(format, lang = language) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["langData"], "readonly");
    let objectStore = transaction.objectStore("langData");

    let range = IDBKeyRange.bound(format, `${format}\uffff`);
    let request = objectStore.openCursor(range);
    
    let count = 0;
    let randomItem = null;

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let data = cursor.value;
        if (cursor.key.startsWith(format) && data && lang in data) {
          count++;

          if (Math.random() < 1 / count) {
            randomItem = data[lang];
          }
        }
        cursor.continue();
      } else {
        resolve(randomItem);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving random lang data:", event);
      reject(event);
    };
  });
}

async function searchAssets(searchTerm, by) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["assetData"], "readonly");
    const objectStore = transaction.objectStore("assetData");
    const results = [];
    const request = objectStore.openCursor();

    request.onsuccess = function (event) {
      const cursor = event.target.result;

      if (cursor) {
        let find;
        if (by == "name") {
          find = cursor.value.PrefabID || "";
        } else if (by == "guid") {
          find = cursor.value.GUID || "";
        } else {
          reject();
        }
          
        if (find.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(cursor.value);
        }

        cursor.continue();
      } else {
        resolve(results);
      }
    };

    // 9511fbbc3b07b713222662e48f040e3f
    request.onerror = function (event) {
      console.error("Error searching assets:", event.target.error);
      reject(event.target.error);
    };
  });
}

async function getAssetPanelData(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let assets = [];
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;

        if (record.UI_Group && record.UI_Group.startsWith(PrefabID)) {
          assets.push(record);
        }

        cursor.continue();
      } else {
        resolve(assets);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving tab data:", event);
      reject(event);
    };
  });
}

async function getPrefabUIGroup(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.get(PrefabID);

    request.onsuccess = function (event) {
      let data = event.target.result;

      if (data) {
        resolve(data.UI_Group);
      } else {
        resolve(null);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

async function getPrefabUIMenu(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.get(PrefabID);

    request.onsuccess = function (event) {
      let data = event.target.result;

      if (data) {
        resolve(data.UI_Menu);
      } else {
        resolve(null);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

async function getPrefabUIIcon(PrefabID) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.get(PrefabID);

    request.onsuccess = function (event) {
      let data = event.target.result;

      if (data) {
        resolve(data.UI_Icon);
      } else {
        resolve(null);
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

// function addAssetTabData(groupedData) {
//   let transaction = db.transaction(["assetTabData", "timeSince"], "readwrite");

//   transaction.oncomplete = function () {
//     console.log("Asset Tab Data saved");
//   };

//   transaction.onerror = function (event) {
//     console.log("Transaction error:", event);
//   };

//   let assetObjectStore = transaction.objectStore("assetTabData");
//   let timeObjectStore = transaction.objectStore("timeSince");

//   const currentTime = new Date().getTime();

//   groupedData.forEach(({ groupName, tabData }) => {
//     tabData.forEach((asset) => {
//       assetObjectStore.put(asset);
//     });

//     timeObjectStore.put({
//       name: `assetTabData-${groupName}`,
//       time: currentTime,
//     });
//   });
// }

// async function getAssetTabData(name) {
//   console.log("GettingAssetTabData: " + name);
//   let transaction = db.transaction(["assetTabData"], "readonly");
//   let objectStore = transaction.objectStore("assetTabData");

//   if (name === undefined) {
//     let request = objectStore.getAll();

//     request.onsuccess = async function (event) {
//       let result = event.target.result;
//       if (result.length === 0 || result === undefined) {
//         fetchAssetTabDataAll();
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   } else {
//     let index = objectStore.index("name");

//     let request = index.getAll(name);

//     request.onsuccess = async function (event) {
//       let timeSince = await getTimeSince(`assetTabData-${name}`);
//       let currentTime = new Date().getTime();
//       let result = event.target.result;

//       if (result.length === 0 || result.length === undefined) {
//         fetchAssetTabDataAll();
//       } else {
//         if (currentTime - timeSince < expiryTime) {
//           processAssetTab(result);
//         } else {
//           // alert(`Expired: ${currentTime - timeSince}`);
//           fetchAssetTabDataAll();
//         }
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   }
// }

// function addAssetPanelData(groupedData) {
//   let transaction = db.transaction(
//     ["assetPanelData", "timeSince"],
//     "readwrite"
//   );

//   transaction.oncomplete = function () {
//     console.log("Asset Panel Data saved");
//   };

//   transaction.onerror = function (event) {
//     console.log("Transaction error:", event);
//   };
//   let assetObjectStore = transaction.objectStore("assetPanelData");
//   let timeObjectStore = transaction.objectStore("timeSince");

//   const currentTime = new Date().getTime();

//   groupedData.forEach(({ tabName, panelData }) => {
//     panelData.forEach((asset) => {
//       assetObjectStore.put(asset);
//     });

//     timeObjectStore.put({
//       name: `assetPanelData-${tabName}`,
//       time: currentTime,
//     });
//   });
// }

// function getAssetPanelData(name) {
//   let transaction = db.transaction(["assetPanelData"], "readonly");
//   let objectStore = transaction.objectStore("assetPanelData");
//   if (name === undefined) {
//     let request = objectStore.getAll();

//     request.onsuccess = async function (event) {
//       let result = event.target.result;

//       if (result.length === 0 || result === undefined) {
//         fetchAssetPanelDataAll();
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   } else {
//     let index = objectStore.index("tab");

//     let request = index.getAll(name);

//     request.onsuccess = async function (event) {
//       let timeSince = await getTimeSince(`assetPanelData-${name}`);
//       let currentTime = new Date().getTime();
//       let result = event.target.result;

//       if (result.length === 0 || result.length === undefined) {
//         fetchAssetPanelDataAll();
//       } else {
//         if (currentTime - timeSince < expiryTime) {
//           processAssetPanel(event.target.result);
//         } else {
//           // alert(`Expired: ${currentTime - timeSince}`);
//           fetchAssetPanelDataAll();
//         }
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   }
// }

// function addAssetData(prefab, data) {
//   let transaction = db.transaction(["assetData"], "readwrite");
//   let transaction_t = db.transaction(["timeSince"], "readwrite");

//   transaction.oncomplete = function () {
//     console.log(`${prefab} data saved`);
//   };

//   transaction.onerror = function (event) {
//     console.log("Transaction error:", event);
//   };
//   data.forEach((asset) => {
//     let objectStore = transaction.objectStore("assetData");
//     objectStore.put({
//       name: asset.Name,
//       id: prefab,
//       details: asset.Details,
//     });
//   });

//   let objectStore_t = transaction_t.objectStore("timeSince");
//   objectStore_t.put({
//     name: `assetData-${prefab}`,
//     time: new Date().getTime(),
//   });

//   getAssetData(prefab);
// }

async function addAssetDataAll(data) {
  let transaction = db.transaction(["assetData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    // console.log(`Asset data saved`);
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  let objectStore = transaction.objectStore("assetData");
  let objectStore_t = transaction_t.objectStore("timeSince");
  data.forEach((asset) => {
    objectStore.put({
      ...asset,
    });
  });
  objectStore_t.put({
    name: `assetData`,
    time: new Date().getTime(),
  });
}

function addLangDataAll(data) {
  let transaction = db.transaction(["langData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    // console.log(`Lang data saved`);
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  let objectStore = transaction.objectStore("langData");
  let objectStore_t = transaction_t.objectStore("timeSince");
  data.forEach((lang) => {
    objectStore.put({
      ...lang,
    });
  });
  objectStore_t.put({
    name: `langData`,
    time: new Date().getTime(),
  });
}

// function getAssetData(prefab) {
//   let transaction = db.transaction(["assetData"], "readonly");
//   let objectStore = transaction.objectStore("assetData");
//   if (prefab === undefined) {
//     let request = objectStore.getAll();

//     request.onsuccess = async function (event) {
//       let result = event.target.result;

//       if (result.length === 0 || result === undefined) {
//         fetchAssetDataAll();
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   } else {
//     let request = objectStore.get(prefab);

//     request.onsuccess = async function (event) {
//       let result = event.target.result;

//       if (!result) {
//         fetchAssetDataAll();
//       } else {
//         // let timeSince = await getTimeSince(`assetData-${prefab}`);
//         // let currentTime = new Date().getTime();
//         // if (currentTime - timeSince < expiryTime) {
//           processAssetData(event.target.result);
//         // } else {
//           // alert(`Expired: ${currentTime - timeSince}`);
//           // fetchAssetDataAll();
//         // }
//       }
//     };

//     request.onerror = function (event) {
//       console.log("Error retrieving data:", event);
//     };
//   }
// }

async function getAssetDataSingle(prefab) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");

    let request = objectStore.get(prefab);

    request.onsuccess = function (event) {
      let data = event.target.result;

      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    };

    request.onerror = function (event) {
      console.log(`Error retrieving ${prefab} data: ${event}`);
      reject(event);
    };
  });
}

function getTimeSince(name) {
  return new Promise((resolve, reject) => {
    let transaction_t = db.transaction(["timeSince"], "readonly");
    let objectStore_t = transaction_t.objectStore("timeSince");
    let index_t = objectStore_t.index("name");
    let request = index_t.get(name);
    request.onsuccess = function (event) {
      if (request.result) {
        resolve(request.result.time);
      } else {
        resolve(0);
      }
    };
    request.onerror = function (event) {
      reject(
        new Error("Error fetching data from IndexedDB: " + event.target.error)
      );
    };
  });
}

function searchInIndexedDB(searchText) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetData"], "readonly");
    let objectStore = transaction.objectStore("assetData");
    const matchingIds = [];

    const request = objectStore.openCursor();

    request.onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        const object = cursor.value;
        const id = cursor.key;

        let found = false;
        for (let prop in object) {
          if (object.hasOwnProperty(prop)) {
            if (typeof object[prop] === 'string' && object[prop].includes(searchText)) {
              found = true;
              break;
            }
          }
        }
        if (found) {
          matchingIds.push(id);
        }

        cursor.continue();
      } else {
        resolve(matchingIds);
      }
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  });
}

function deleteIndexedDB() {
  var dbName = "cities2-AssetDatabase";
  return new Promise((resolve, reject) => {
    db.close();
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = function () {
      console.log(`Database "${dbName}" deleted successfully`);

      resolve(location.reload());
    };

    request.onerror = function (event) {
      console.error(`Error deleting database "${dbName}":`, event.target.error);
      reject(
        new Error(`Error deleting database "${dbName}": ${event.target.error}`)
      );
    };

    request.onblocked = function () {
      console.warn(`Deletion of database "${dbName}" is blocked`);
    };
  });
}

window.db = db;
window.initDB = initDB;
// window.addAssetGroupData = addAssetGroupData;
window.checkAssetData = checkAssetData;
window.getAssetGroupData = getAssetGroupData;
window.deleteIndexedDB = deleteIndexedDB;
window.getAssetTabData = getAssetTabData;
// window.addAssetTabData = addAssetTabData;
window.getAssetPanelData = getAssetPanelData;
// window.addAssetPanelData = addAssetPanelData;
window.getAssetData = getAssetData;
window.getZoneBuildings = getZoneBuildings;
window.getBuildingUpgrades = getBuildingUpgrades;
window.getLangData = getLangData;
window.getLangDataRandomly = getLangDataRandomly;
window.getAssetDataSingle = getAssetDataSingle;
// window.addAssetData = addAssetData;
window.addAssetDataAll = addAssetDataAll;
window.addLangDataAll = addLangDataAll;
window.loadFile = loadFile;
window.findValueInLines = findValueInLines;
window.findValueInLinesCail = findValueInLinesCail;
window.searchInIndexedDB = searchInIndexedDB;
window.getTimeSince = getTimeSince;
window.updateLangGame = updateLangGame;
window.getPrefabUIGroup = getPrefabUIGroup;
window.getPrefabUIMenu = getPrefabUIMenu;
window.getPrefabUIIcon = getPrefabUIIcon;
window.searchAssets = searchAssets;