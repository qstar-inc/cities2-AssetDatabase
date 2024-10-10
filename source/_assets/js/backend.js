function fetchAssetGroupData() {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-group-",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      addAssetGroupData(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchAssetTabData(name) {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-tab-data",
      name: name,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      addAssetTabData(name, data.data);
    });
}

function fetchAssetPanelData(name) {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-panel-data",
      name: name.split("___")[1],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      addAssetPanelData(name, data.data);
    });
}

window.fetchAssetGroupData = fetchAssetGroupData;
window.fetchAssetTabData = fetchAssetTabData;
window.fetchAssetPanelData = fetchAssetPanelData;
