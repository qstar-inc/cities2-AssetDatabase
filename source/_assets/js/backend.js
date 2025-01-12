let batchSize = 5000;
let currentOffset = 0;
let allDataLoaded = false;
let dataLoaded = 0;

let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000;

function delayRequest() {
  return new Promise(resolve => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    const delay = timeSinceLastRequest < RATE_LIMIT_DELAY
      ? RATE_LIMIT_DELAY - timeSinceLastRequest
      : 0;

    setTimeout(() => {
      lastRequestTime = Date.now();
      resolve();
    }, delay);
  });
}

function fetchAssetDataAll() {
  return new Promise(async (resolve, reject) => {
    if (allDataLoaded) { return resolve(); }

    delayRequest()
      .then(() => {
        fetch(atob(u) + "cities2_prefab_data", {
          method: "POST",
          headers: {
            "Accept-Encoding": "gzip",
            "Content-Type": "application/json",
            "Authorization": auth,
          },
          body: JSON.stringify({
            reqType: "asset-data-all",
            offset: currentOffset,
            limit: batchSize,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then(async (data) => {
            dataLoaded += data.data.length;
            if (data.data.length === 0) {
              allDataLoaded = true;
              console.log(`All ${dataLoaded} asset data loaded.`);
              await getAssetData();
              return resolve();
            }
            await addAssetDataAll(data.data)
            currentOffset += batchSize;
            console.log(`Processed ${currentOffset}`)
            return fetchAssetDataAll();
          })
          .catch((error) => {
            console.error("Error loading asset data batch:", error);
            const dbLoading = document.getElementById('db-loading');
            const dbLoadingText = document.getElementById('db-loading-text');
            dbLoadingText.innerText = "Server not accessible. Try again later."
            dbLoading.classList.remove("display-none");
            reject(error);
          });
      });
  });
}

function fetchLangDataAll(lang = language) {
  return new Promise((resolve, reject) => {
    fetch(atob(u) + "cities2_lang_data", {
      method: "POST",
      headers: {
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "Authorization": auth,
      },
      body: JSON.stringify({
        langID: lang,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        addLangDataAll(data.data);
        resolve();
      })
      .catch((error) => {
        console.error("Error loading lang data batch:", error);
        const dbLoading = document.getElementById('db-loading');
        const dbLoadingText = document.getElementById('db-loading-text');
        dbLoadingText.innerText = "Server not accessible. Try again later."
        dbLoading.classList.remove("display-none");
        reject(error);
      });
  });
}

function fetchTimeTrack() {
  return new Promise(async (resolve, reject) => {
    fetch(atob(u) + "cities2_tracker", {
      method: "POST",
      headers: {
        "Accept-Encoding": "gzip",
        "Authorization": auth,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(async (data) => {
        resolve(data[0].updated_at);
      })
      .catch((error) => {
        console.error("Error fetching time track:", error);
        reject(error);
      });
  });
}

window.fetchAssetDataAll = fetchAssetDataAll;
window.fetchLangDataAll = fetchLangDataAll;
window.fetchTimeTrack = fetchTimeTrack;