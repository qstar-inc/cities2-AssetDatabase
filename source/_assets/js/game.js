$(document).ready(function () {
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
      proceesAssetGroup(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

function addAssetBarIconTrigger() {
  var assetPanel = document.getElementById("asset-panel");
  const assetIcons = document.querySelectorAll(".asset-menu-icon");
  assetIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      const apht = document.getElementById("asset-panel-header-tabs");
      apht.innerHTML = "";
      const api = document.getElementById("asset-panel-items");
      api.innerHTML = "";
      const loader = document.createElement("div");
      loader.classList.add("lds-ripple");
      const loaderInner1 = document.createElement("div");
      const loaderInner2 = document.createElement("div");
      loader.appendChild(loaderInner1);
      loader.appendChild(loaderInner2);
      api.appendChild(loader);
      fetch(atob(u) + "cities2_get_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Authorization: auth,
          reqType: "asset-tab-data",
          name: this.dataset.name,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          data = data.data;
          if (data.length == 1) {
            element = data[0];
            const tab = document.createElement("div");
            tab.className = "asset-panel-header-tab-single active";
            tab.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
            apht.appendChild(tab);
            loadAssets(element.name);
          } else {
            data.forEach((element) => {
              if (element == data[0]) {
                var active = " active";
                loadAssets(data[0].name);
              } else {
                var active = "";
              }
              const tab = document.createElement("div");
              tab.className = "asset-panel-header-tab-multiple" + active;
              tab.setAttribute("data-name", element.name);
              tab.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
              apht.appendChild(tab);
            });
            const tabs = document.querySelectorAll(
              ".asset-panel-header-tab-multiple"
            );
            tabs.forEach((tab, index) => {
              tab.addEventListener("click", function () {
                tabs.forEach((t) => t.classList.remove("active"));
                this.classList.add("active");
                api.innerHTML = "";
                const loader = document.createElement("div");
                loader.classList.add("lds-ripple");
                const loaderInner1 = document.createElement("div");
                const loaderInner2 = document.createElement("div");
                loader.appendChild(loaderInner1);
                loader.appendChild(loaderInner2);
                api.appendChild(loader);
                loadAssets(this.dataset.name);
              });
            });
          }
        });
      assetPanel.style.display = "block";
    });
  });
}

function proceesAssetGroup(data) {
  groupNames = ["asset-group-1", "asset-group-2"];
  groupNames.forEach((groupName) => {
    const ag = document.getElementById(groupName);
    ag.innerHTML = "";
    data.forEach((element) => {
      if (
        (groupName == "asset-group-1" &&
          element.ui_group == "0d743b09aa1b82040bfb8a3acb2f18a3") ||
        (groupName == "asset-group-2" &&
          element.ui_group == "78b77cd071c12434a934336e627b4683")
      ) {
        const button = document.createElement("button");
        button.className = "asset-menu-icon";
        button.setAttribute("data-name", element.name);
        // button.setAttribute("data-guid", element.guid);
        button.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
        ag.appendChild(button);
      }
    });
  });
  addAssetBarIconTrigger();
}

function loadAssets(name) {
  fetch(atob(u) + "cities2_get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Authorization: auth,
      reqType: "asset-panel-data",
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
      const api = document.getElementById("asset-panel-items");
      const quickInfoDiv = document.getElementById("asset-quick-info");
      data = data.data;
      api.innerHTML = "";
      data.forEach((element) => {
        const item = document.createElement("div");
        item.className = "asset-panel-item round-border";
        item.setAttribute("data-name", element.name);
        const itemDiv = document.createElement("div");
        itemDiv.className = "asset-panel-item-inner";
        if (element.icon == null) {
          var icon = imageBasePath + "/cities2/Media/Placeholder.svg";
        } else {
          var icon =
            imageBasePath + "/cities2/" + decodeURIComponent(element.icon);
        }
        itemDiv.innerHTML = `<img src="${icon}"/>`;
        item.addEventListener("mouseover", function () {
          quickInfoDiv.innerHTML = this.getAttribute("data-name");
          quickInfoDiv.style.display = "block";
        });
        item.addEventListener("mouseout", function () {
          quickInfoDiv.innerHTML = "";
          quickInfoDiv.style.display = "none";
        });
        item.appendChild(itemDiv);
        api.appendChild(item);
      });
      api.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
}

function closeAssetPanel() {
  document.getElementById("asset-panel").style.display = "none";
}

window.closeAssetPanel = closeAssetPanel;
