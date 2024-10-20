function fetchAssetGroupData() {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-group-all",
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

// function fetchAssetTabData(name) {
//   fetch(atob(u) + "cities2_get_data", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Authorization: auth,
//       reqType: "asset-tab-data",
//       name: name,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       addAssetTabData(name, data.data);
//     });
// }

function fetchAssetTabDataAll() {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-tab-data-all",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const processedData = data.data.map((element) => ({
        groupName: element.groupName,
        tabData: element.tabData.map((asset) => ({
          id: `${element.groupName}___${asset.name}`,
          name: element.groupName,
          tab: asset.name,
          icon: asset.icon,
          priority: asset.priority,
        })),
      }));

      addAssetTabData(processedData);
    });
}

function fetchAssetPanelDataAll() {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-panel-data-all",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const processedData = data.data.map((element) => ({
        tabName: element.tabName,
        panelData: element.panelData.map((asset) => {
          const uiObject = asset.UIObject;
          const matches = uiObject.match(/\[(.*?)\]/);
          const values =
            matches && matches[1]
              ? matches[1].split(",").map((value) => value.trim())
              : [];
          return {
            id: `${element.tabName}___${asset.Name}`,
            tab: element.tabName,
            name: asset.Name,
            icon: values[3],
            lang_name: asset.lang_name,
            lang_desc: asset.lang_desc,
            priority: values[2],
            prefab: asset.PrefabID,
          };
        }),
      }));
      addAssetPanelData(processedData);
    });
}

// function fetchAssetPanelData(name) {
//   fetch(atob(u) + "cities2_get_data", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Authorization: auth,
//       reqType: "asset-panel-data",
//       name: name.split("___")[1],
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       addAssetPanelData(name, data.data);
//     });
// }

function fetchAssetData(prefab) {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-data",
      prefab: prefab,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      addAssetData(prefab, data.data);
    });
}

window.fetchAssetGroupData = fetchAssetGroupData;
// window.fetchAssetTabData = fetchAssetTabData;
window.fetchAssetTabDataAll = fetchAssetTabDataAll;
// window.fetchAssetPanelData = fetchAssetPanelData;
window.fetchAssetPanelDataAll = fetchAssetPanelDataAll;
window.fetchAssetData = fetchAssetData;
