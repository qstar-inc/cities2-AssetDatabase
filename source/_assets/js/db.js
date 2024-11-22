const expiryTime = 24 * 60 * 60 * 1000;

let db;
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

async function initDB(bool = fals) {
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
    console.log("IndexedDB opened successfully");
    currentVersion = db.version;
    if (
      !db.objectStoreNames.contains("assetGroupData") ||
      !db.objectStoreNames.contains("assetTabData") ||
      !db.objectStoreNames.contains("assetPanelData") ||
      !db.objectStoreNames.contains("assetData") ||
      !db.objectStoreNames.contains("timeSince")
    ) {
      db.close();
      deleteIndexedDB();
      createDBs(db);
      // let upgradeRequest = indexedDB.open(
      //   "cities2-AssetDatabase",
      //   currentVersion + 1
      // );
      // upgradeRequest.onupgradeneeded = function (event) {
      //   db = event.target.result;
      //   createDBs(db);
      // };

      // upgradeRequest.onsuccess = function (event) {
      //   db = event.target.result;
      //   console.log("Database upgraded successfully to version", db.version);
      // };

      // upgradeRequest.onerror = function (event) {
      //   console.error("Error upgrading IndexedDB:", event.target.errorCode);
      // };
    }
    let hasEntry = await checkAssetGroupData();
    if (!hasEntry) {
      await getAssetGroupData();
      hasEntry = await checkAssetGroupData();
    }
    if (hasEntry && bool) {
      const customEvent = new Event("dbInitialized");
      document.dispatchEvent(customEvent);
    } else {
      await getAssetGroupData();
    }
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    createDBs(db);
  };
}

let lines = [];
async function loadFile() {
  try {
    const response = await fetch(dataBasePath + "/ail_list.txt");
    const text = await response.text();
    lines = text.split("\n");
    console.log("AIL list loaded and stored in memory");
  } catch (error) {
    console.error("Error reading AIL list:", error);
  }
}

function findValueInLines(value) {
  if (!lines.length) {
    console.error("File is not loaded yet!");
    return false;
  }

  return lines.some((line) => line.includes(value));
}

function createDBs(db) {
  if (!db.objectStoreNames.contains("assetGroupData")) {
    let assetGroupData = db.createObjectStore("assetGroupData", {
      keyPath: "name",
    });
    assetGroupData.createIndex("name", "name");
    assetGroupData.createIndex("ui_group", ["ui_group"], {
      unique: false,
    });
  }

  if (!db.objectStoreNames.contains("assetTabData")) {
    let assetTabData = db.createObjectStore("assetTabData", {
      keyPath: "id",
    });
    assetTabData.createIndex("name", "name", { unique: false });
    assetTabData.createIndex("id", "id", { unique: true });
  }

  if (!db.objectStoreNames.contains("assetPanelData")) {
    let assetPanelData = db.createObjectStore("assetPanelData", {
      keyPath: "id",
    });
    assetPanelData.createIndex("tab", "tab", { unique: false });
    assetPanelData.createIndex("name", "name", { unique: false });
    assetPanelData.createIndex("id", "id", { unique: true });
  }

  if (!db.objectStoreNames.contains("assetData")) {
    let assetPanelData = db.createObjectStore("assetData", {
      keyPath: "id",
    });
    assetPanelData.createIndex("id", "id", { unique: true });
  }

  if (!db.objectStoreNames.contains("timeSince")) {
    let timeSince = db.createObjectStore("timeSince", {
      keyPath: "name",
    });
    timeSince.createIndex("name", "name");
  }
}

async function addAssetGroupData(data) {
  let transaction = db.transaction(["assetGroupData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log("Asset Group Data saved");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  data.forEach((asset) => {
    let objectStore = transaction.objectStore("assetGroupData");
    objectStore.put({
      name: asset.name,
      icon: asset.icon,
      group: asset.group,
      priority: asset.priority,
      langTitle: asset.LangTitle,
      langDescription: asset.LangDescription,
    });
  });

  let objectStore_t = transaction_t.objectStore("timeSince");
  objectStore_t.put({ name: "assetGroupData", time: new Date().getTime() });

  await getAssetGroupData();
}

function checkAssetGroupData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetGroupData"], "readonly");
    let objectStore = transaction.objectStore("assetGroupData");

    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;
      if (result.length === 0 || result.length === undefined) {
        resolve(false);
      }
      resolve(true);
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

async function getAssetGroupData() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["assetGroupData"], "readonly");
    let objectStore = transaction.objectStore("assetGroupData");

    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let timeSince = await getTimeSince("assetGroupData");
      let currentTime = new Date().getTime();
      let result = event.target.result;

      if (result.length === 0 || result.length === undefined) {
        await fetchAssetGroupData();
        resolve();
        return;
      } else {
        if (typeof processAssetGroup !== "function") {
          resolve();
          return;
        }
        if (currentTime - timeSince < expiryTime) {
          processAssetGroup(event.target.result);
        } else {
          // alert(`Expired: ${currentTime - timeSince}`);
          await fetchAssetGroupData();
        }
        resolve();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
      reject(event);
    };
  });
}

function addAssetTabData(groupedData) {
  let transaction = db.transaction(["assetTabData", "timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log("Asset Tab Data saved");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };

  let assetObjectStore = transaction.objectStore("assetTabData");
  let timeObjectStore = transaction.objectStore("timeSince");

  const currentTime = new Date().getTime();

  groupedData.forEach(({ groupName, tabData }) => {
    tabData.forEach((asset) => {
      assetObjectStore.put(asset);
    });

    timeObjectStore.put({
      name: `assetTabData-${groupName}`,
      time: currentTime,
    });
  });
}

function getAssetTabData(name) {
  console.log("GettingAssetTabData: " + name);
  let transaction = db.transaction(["assetTabData"], "readonly");
  let objectStore = transaction.objectStore("assetTabData");

  if (name === undefined) {
    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;

      if (result.length === 0 || result === undefined) {
        fetchAssetTabDataAll();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  } else {
    let index = objectStore.index("name");

    let request = index.getAll(name);

    request.onsuccess = async function (event) {
      let timeSince = await getTimeSince(`assetTabData-${name}`);
      let currentTime = new Date().getTime();
      let result = event.target.result;

      if (result.length === 0 || result.length === undefined) {
        fetchAssetTabDataAll();
      } else {
        if (currentTime - timeSince < expiryTime) {
          processAssetTab(result);
        } else {
          // alert(`Expired: ${currentTime - timeSince}`);
          fetchAssetTabDataAll();
        }
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  }
}

function addAssetPanelData(groupedData) {
  let transaction = db.transaction(
    ["assetPanelData", "timeSince"],
    "readwrite"
  );

  transaction.oncomplete = function () {
    console.log("Asset Panel Data saved");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  let assetObjectStore = transaction.objectStore("assetPanelData");
  let timeObjectStore = transaction.objectStore("timeSince");

  const currentTime = new Date().getTime();

  groupedData.forEach(({ tabName, panelData }) => {
    panelData.forEach((asset) => {
      assetObjectStore.put(asset);
    });

    timeObjectStore.put({
      name: `assetPanelData-${tabName}`,
      time: currentTime,
    });
  });
}

function getAssetPanelData(name) {
  let transaction = db.transaction(["assetPanelData"], "readonly");
  let objectStore = transaction.objectStore("assetPanelData");
  if (name === undefined) {
    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;

      if (result.length === 0 || result === undefined) {
        fetchAssetPanelDataAll();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  } else {
    let index = objectStore.index("tab");

    let request = index.getAll(name);

    request.onsuccess = async function (event) {
      let timeSince = await getTimeSince(`assetPanelData-${name}`);
      let currentTime = new Date().getTime();
      let result = event.target.result;

      if (result.length === 0 || result.length === undefined) {
        fetchAssetPanelDataAll();
      } else {
        if (currentTime - timeSince < expiryTime) {
          processAssetPanel(event.target.result);
        } else {
          // alert(`Expired: ${currentTime - timeSince}`);
          fetchAssetPanelDataAll();
        }
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  }
}

function addAssetData(prefab, data) {
  let transaction = db.transaction(["assetData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log(`${prefab} data saved`);
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  data.forEach((asset) => {
    let objectStore = transaction.objectStore("assetData");
    objectStore.put({
      name: asset.Name,
      id: prefab,
      details: asset.Details,
    });
  });

  let objectStore_t = transaction_t.objectStore("timeSince");
  objectStore_t.put({
    name: `assetData-${prefab}`,
    time: new Date().getTime(),
  });

  getAssetData(prefab);
}

function addAssetDataAll(data) {
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
      name: asset.Name,
      id: asset.PrefabID,
      details: asset.Details,
    });
    objectStore_t.put({
      name: `assetData-${asset.PrefabID}`,
      time: new Date().getTime(),
    });
  });
}

function getAssetData(prefab) {
  let transaction = db.transaction(["assetData"], "readonly");
  let objectStore = transaction.objectStore("assetData");
  if (prefab === undefined) {
    let request = objectStore.getAll();

    request.onsuccess = async function (event) {
      let result = event.target.result;

      if (result.length === 0 || result === undefined) {
        fetchAssetDataAll();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  } else {
    let request = objectStore.get(prefab);

    request.onsuccess = async function (event) {
      let result = event.target.result;

      if (!result) {
        fetchAssetData(prefab);
      } else {
        let timeSince = await getTimeSince(`assetData-${prefab}`);
        let currentTime = new Date().getTime();
        if (currentTime - timeSince < expiryTime) {
          processAssetData(event.target.result);
        } else {
          // alert(`Expired: ${currentTime - timeSince}`);
          fetchAssetData(prefab);
        }
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data:", event);
    };
  }
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
window.addAssetGroupData = addAssetGroupData;
window.checkAssetGroupData = checkAssetGroupData;
window.getAssetGroupData = getAssetGroupData;
window.deleteIndexedDB = deleteIndexedDB;
window.getAssetTabData = getAssetTabData;
window.addAssetTabData = addAssetTabData;
window.getAssetPanelData = getAssetPanelData;
window.addAssetPanelData = addAssetPanelData;
window.getAssetData = getAssetData;
window.addAssetData = addAssetData;
window.addAssetDataAll = addAssetDataAll;
window.loadFile = loadFile;
window.findValueInLines = findValueInLines;
