let db;
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function initDB() {
  const request = indexedDB.open("cities2-AssetDatabase");
  console.log("Starting InitDB");
  request.onerror = function (event) {
    console.log(
      "Why didn't you allow my web app to use IndexedDB?: " +
        event.target.errorCode
    );
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB opened successfully");
    currentVersion = db.version;
    if (
      !db.objectStoreNames.contains("assetGroupData") ||
      !db.objectStoreNames.contains("assetTabData") ||
      !db.objectStoreNames.contains("assetPanelData") ||
      !db.objectStoreNames.contains("timeSince")
    ) {
      db.close();
      let upgradeRequest = indexedDB.open(
        "cities2-AssetDatabase",
        currentVersion + 1
      );
      upgradeRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        createDBs(db);
      };

      upgradeRequest.onsuccess = function (event) {
        db = event.target.result;
        console.log("Database upgraded successfully to version", db.version);
      };

      upgradeRequest.onerror = function (event) {
        console.error("Error upgrading IndexedDB:", event.target.errorCode);
      };
    }

    getAssetGroupData();
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    createDBs(db);
  };
}

let lines = [];
function loadFile() {
  return fetch(dataBasePath + "/ail_list.txt")
    .then((response) => response.text())
    .then((text) => {
      lines = text.split("\n");
      console.log("File loaded and stored in memory");
    })
    .catch((error) => {
      console.error("Error reading the file:", error);
    });
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

  if (!db.objectStoreNames.contains("timeSince")) {
    let timeSince = db.createObjectStore("timeSince", {
      keyPath: "name",
    });
    timeSince.createIndex("name", "name");
  }
}

function addAssetGroupData(data) {
  let transaction = db.transaction(["assetGroupData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log("Transaction completed");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  data.forEach((asset) => {
    let objectStore = transaction.objectStore("assetGroupData");
    objectStore.put({
      name: asset.name,
      icon: asset.icon,
      ui_group: asset.ui_group,
      priority: asset.priority,
    });
  });

  let objectStore_t = transaction_t.objectStore("timeSince");
  objectStore_t.put({ name: "assetGroupData", time: new Date().getTime() });

  getAssetGroupData();
}

function getAssetGroupData() {
  let transaction = db.transaction(["assetGroupData"], "readonly");
  let objectStore = transaction.objectStore("assetGroupData");

  let request = objectStore.getAll();

  request.onsuccess = async function (event) {
    let timeSince = await getTimeSince("assetGroupData");
    let currentTime = new Date().getTime();
    var result = event.target.result;

    if (result.length === 0 || result.length === undefined) {
      fetchAssetGroupData();
    } else {
      if (currentTime - timeSince < 60 * 60 * 100) {
        processAssetGroup(event.target.result);
      } else {
        fetchAssetGroupData();
      }
    }
  };

  request.onerror = function (event) {
    console.log("Error retrieving data:", event);
  };
}

function addAssetTabData(name, data) {
  let transaction = db.transaction(["assetTabData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log("Transaction completed");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  let i = 0;
  data.forEach((asset) => {
    let objectStore = transaction.objectStore("assetTabData");
    objectStore.put({
      id: `${name}___${asset.name}`,
      name: name,
      tab: asset.name,
      icon: asset.icon,
      priority: i,
    });
    i++;
  });

  let objectStore_t = transaction_t.objectStore("timeSince");
  objectStore_t.put({
    name: `assetTabData-${name}`,
    time: new Date().getTime(),
  });
  getAssetTabData(name);
}

function getAssetTabData(name) {
  let transaction = db.transaction(["assetTabData"], "readonly");
  let objectStore = transaction.objectStore("assetTabData");
  let index = objectStore.index("name");

  let request = index.getAll(name);

  request.onsuccess = async function (event) {
    let timeSince = await getTimeSince(`assetTabData-${name}`);
    let currentTime = new Date().getTime();
    var result = event.target.result;

    if (result.length === 0 || result.length === undefined) {
      fetchAssetTabData(name);
    } else {
      if (currentTime - timeSince < 60 * 60 * 100) {
        processAssetTab(result);
      } else {
        fetchAssetTabData(name);
      }
    }
  };

  request.onerror = function (event) {
    console.log("Error retrieving data:", event);
  };
}

function addAssetPanelData(name, data) {
  let transaction = db.transaction(["assetPanelData"], "readwrite");
  let transaction_t = db.transaction(["timeSince"], "readwrite");

  transaction.oncomplete = function () {
    console.log("Transaction completed");
  };

  transaction.onerror = function (event) {
    console.log("Transaction error:", event);
  };
  let i = 0;
  data.forEach((asset) => {
    let objectStore = transaction.objectStore("assetPanelData");
    objectStore.put({
      id: `${name}___${asset.name}`,
      tab: name,
      name: asset.name,
      icon: asset.icon,
      lang_name: asset.lang_name,
      lang_desc: asset.lang_desc,
      priority: i,
    });
    i++;
  });

  let objectStore_t = transaction_t.objectStore("timeSince");
  objectStore_t.put({
    name: `assetPanelData-${name}`,
    time: new Date().getTime(),
  });
  getAssetPanelData(name);
}

function getAssetPanelData(name) {
  let transaction = db.transaction(["assetPanelData"], "readonly");
  let objectStore = transaction.objectStore("assetPanelData");
  let index = objectStore.index("tab");

  let request = index.getAll(name);

  request.onsuccess = async function (event) {
    let timeSince = await getTimeSince(`assetPanelData-${name}`);
    let currentTime = new Date().getTime();
    var result = event.target.result;

    if (result.length === 0 || result.length === undefined) {
      fetchAssetPanelData(name);
    } else {
      if (currentTime - timeSince < 60 * 60 * 100) {
        processAssetPanel(event.target.result);
      } else {
        fetchAssetPanelData(name);
      }
    }
  };

  request.onerror = function (event) {
    console.log("Error retrieving data:", event);
  };
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
window.getAssetGroupData = getAssetGroupData;
window.deleteIndexedDB = deleteIndexedDB;
window.getAssetTabData = getAssetTabData;
window.addAssetTabData = addAssetTabData;
window.getAssetPanelData = getAssetPanelData;
window.addAssetPanelData = addAssetPanelData;
window.loadFile = loadFile;
window.findValueInLines = findValueInLines;
