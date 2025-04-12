import pako from "pako";

let batchSize = 5000;
let currentOffset = 0;
let allDataLoaded = false;
let dataLoaded = 0;

let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000;

function delayRequest() {
  return new Promise((resolve) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    const delay =
      timeSinceLastRequest < RATE_LIMIT_DELAY
        ? RATE_LIMIT_DELAY - timeSinceLastRequest
        : 0;

    setTimeout(() => {
      lastRequestTime = Date.now();
      resolve();
    }, delay);
  });
}

// async function fetchAssetDataAll() {
//   if (allDataLoaded) return;

//   try {
//     await delayRequest();

//     const response = await fetch(atob(u) + "cities2_prefab_data", {
//       method: "POST",
//       headers: {
//         "Accept-Encoding": "gzip",
//         "Content-Type": "application/json",
//         Authorization: auth,
//       },
//       body: JSON.stringify({
//         reqType: "asset-data-all",
//         offset: currentOffset,
//         limit: batchSize,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }

//     const data = await response.json();

//     if (data.data.length === 0) {
//       allDataLoaded = true;
//       console.log(`All ${dataLoaded} asset data loaded.`);
//       await getAssetData();
//       return;
//     }

//     dataLoaded += data.data.length;

//     await addAssetDataAll(data.data);
//     currentOffset += batchSize;
//     console.log(`Processing ${currentOffset}`);
//     await fetchAssetDataAll();
//   } catch (error) {
//     console.error("Error loading asset data batch:", error);
//     const dbLoading = document.getElementById("db-loading");
//     const dbLoadingText = document.getElementById("db-loading-text");
//     dbLoadingText.innerText = "Server not accessible. Try again later.";
//     dbLoading.classList.remove("d-none");
//     throw error;
//   }
// }

// function fetchLangDataAll(lang = language) {
//   return new Promise((resolve, reject) => {
//     fetch(atob(u) + "cities2_lang_data", {
//       method: "POST",
//       headers: {
//         "Accept-Encoding": "gzip",
//         "Content-Type": "application/json",
//         Authorization: auth,
//       },
//       body: JSON.stringify({
//         langID: lang,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         addLangDataAll(data.data);
//         resolve();
//       })
//       .catch((error) => {
//         console.error("Error loading lang data batch:", error);
//         const dbLoading = document.getElementById("db-loading");
//         const dbLoadingText = document.getElementById("db-loading-text");
//         dbLoadingText.innerText = "Server not accessible. Try again later.";
//         dbLoading.classList.remove("d-none");
//         reject(error);
//       });
//   });
// }

// function fetchSupportedMods() {
//   return new Promise((resolve, reject) => {
//     fetch(atob(u) + "cities2_mods_data", {
//       method: "POST",
//       headers: {
//         "Accept-Encoding": "gzip",
//         "Content-Type": "application/json",
//         Authorization: auth,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         addModsDataAll(data.data);
//         resolve();
//       })
//       .catch((error) => {
//         console.error("Error loading lang data batch:", error);
//         const dbLoading = document.getElementById("db-loading");
//         const dbLoadingText = document.getElementById("db-loading-text");
//         dbLoadingText.innerText = "Server not accessible. Try again later.";
//         dbLoading.classList.remove("d-none");
//         reject(error);
//       });
//   });
// }

// function fetchTimeTrack() {
//   return new Promise(async (resolve, reject) => {
//     fetch(atob(u) + "cities2_tracker", {
//       method: "POST",
//       headers: {
//         "Accept-Encoding": "gzip",
//         Authorization: auth,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//       })
//       .then(async (data) => {
//         resolve(data[0].updated_at);
//       })
//       .catch((error) => {
//         console.error("Error fetching time track:", error);
//         reject(error);
//       });
//   });
// }

async function fetchTrackerData() {
  try {
    const response = await fetch(atob(u) + "cities2_tracker", {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tracker data:", error);
    throw error;
  }
}

async function fetchFileData(fileName) {
  try {
    const response = await fetch(atob(u) + "download/" + fileName, {
      method: "GET",
      headers: {
        "Accept-Encoding": "gzip",
        Authorization: auth,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const fileBlob = await response.blob();
    return fileBlob;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

async function fetchAndProcessData() {
  try {
    const trackerData = await fetchTrackerData();
    const lastTrackerUpdate = trackerData.update_at;
    const localTrackerUpdate = localStorage.getItem("trackerUpdatedAt");

    if (!localTrackerUpdate || lastTrackerUpdate > localTrackerUpdate) {
      console.log("New files available. Downloading...");

      const assetData = await fetchFileData("AssetData_final.json.gz");
      // console.log("assetData");
      const langData = await fetchFileData("LangData_merged.json.gz");
      // console.log("langData");

      const processedAssetData = await processAssetData(assetData);
      await addAssetDataAll(processedAssetData);

      const processedLangData = await processLangData(langData);
      await addLangDataAll(processedLangData);
      // console.log("processLangData");

      await addSupportedModsAll(trackerData.SupportedMods.mods);

      localStorage.setItem("trackerUpdatedAt", lastTrackerUpdate);

      console.log("Data downloaded and processed successfully.");
    } else {
      console.log("No new data available.");
    }
  } catch (error) {
    console.error("Error during fetch and process:", error);
    const dbLoading = document.getElementById("db-loading");
    const dbLoadingText = document.getElementById("db-loading-text");
    dbLoadingText.innerText = "Server not accessible. Try again later.";
    dbLoading.classList.remove("d-none");
  }
}

async function processAssetData(fileBlob) {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const decompressedData = await decompressGzip(arrayBuffer);
  const assetData = JSON.parse(decompressedData);

  return assetData;
}

async function processLangData(fileBlob) {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const decompressedData = await decompressGzip(arrayBuffer);
  const langData = JSON.parse(decompressedData);

  return langData;
}

async function decompressGzip(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const decompressed = pako.ungzip(uint8Array, { to: "string" });

  return decompressed;
}

// window.fetchAssetDataAll = fetchAssetDataAll;
// window.fetchLangDataAll = fetchLangDataAll;
window.fetchTimeTrack = fetchTrackerData;
window.fetchAndProcessData = fetchAndProcessData;
