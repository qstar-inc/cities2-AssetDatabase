const api = document.getElementById("asset-panel-items");
const apht = document.getElementById("asset-panel-header-tabs");
const assetPanel = document.getElementById("asset-panel");
let isAssetPanelOpen = false;

$(document).ready(function () {
  initDB();
  loadFile();
});

const toolsPanel = document.getElementById("tools-panel");
toolsPanel.addEventListener("click", function () {
  deleteIndexedDB()
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
});

function processAssetGroup(data) {
  data.sort((a, b) => a.priority - b.priority);
  groupNames = ["asset-group-1", "asset-group-2"];
  groupNames.forEach((groupName) => {
    const ag = document.getElementById(groupName);
    ag.innerHTML = "";
    data.forEach((element) => {
      if (
        (groupName == "asset-group-1" &&
          element.group == "0d743b09aa1b82040bfb8a3acb2f18a3") ||
        (groupName == "asset-group-2" &&
          element.group == "78b77cd071c12434a934336e627b4683")
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
  getAssetTabData();
  getAssetPanelData();
  addAssetBarIconTrigger();
}

function addAssetBarIconTrigger() {
  const assetIcons = document.querySelectorAll(".asset-menu-icon");
  assetIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      addBlur();
      const name = this.dataset.name;
      apht.innerHTML = "";
      api.innerHTML = "";
      assetPanel.style.display = "block";
      addLoader(api);
      getAssetTabData(name);
    });
  });
}

function processAssetTab(data) {
  data.sort((a, b) => a.priority - b.priority);
  if (data.length == 1) {
    element = data[0];
    const tab = document.createElement("div");
    tab.className = "asset-panel-header-tab-single round-border-top active";
    tab.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
    apht.appendChild(tab);
    getAssetPanelData(element.id);
  } else {
    data.forEach((element) => {
      if (element == data[0]) {
        var active = " active";
        getAssetPanelData(data[0].id);
      } else {
        var active = "";
      }
      const tab = document.createElement("div");
      tab.className =
        "asset-panel-header-tab-multiple round-border-top" + active;
      tab.setAttribute("data-id", element.id);
      tab.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
      apht.appendChild(tab);
    });
    const tabs = document.querySelectorAll(".asset-panel-header-tab-multiple");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        api.innerHTML = "";
        addLoader(api);
        getAssetPanelData(this.dataset.id);
      });
    });
  }
}

function processAssetPanel(data) {
  data.sort((a, b) => a.priority - b.priority);
  const quickInfoDiv = document.getElementById("asset-quick-info");
  const quickInfoHeaderTitle = document.getElementById(
    "asset-quick-info-header-title"
  );
  const quickInfoBodyImage = document.getElementById(
    "asset-quick-info-body-image"
  );
  const quickInfoBodyDescription = document.getElementById(
    "asset-quick-info-body-desc"
  );
  api.innerHTML = "";

  data.forEach((element) => {
    const item = document.createElement("div");
    item.className = "asset-panel-item round-border";
    const itemDiv = document.createElement("div");
    item.dataset.prefab = element.prefab;
    itemDiv.className = "asset-panel-item-inner";
    if (element.icon == null || element.icon == "") {
      var icon = ailFinder(element.name);
    } else {
      var icon = imageBasePath + "/cities2/" + decodeURIComponent(element.icon);
    }
    itemDiv.innerHTML = `<img src="${icon}"/>`;
    item.addEventListener("mouseover", function () {
      quickInfoHeaderTitle.innerHTML = element.lang_name;
      quickInfoBodyImage.innerHTML = `<img src="${icon}"/>`;
      quickInfoBodyDescription.innerHTML = element.lang_desc
        .replace(/ \n/g, "<br>")
        .replace(/\n/g, "<br>");
      quickInfoDiv.style.display = "block";
    });
    item.addEventListener("mouseout", function () {
      quickInfoDiv.style.display = "none";
    });

    item.addEventListener("click", function () {
      getAssetData(this.dataset.prefab);
    });

    item.appendChild(itemDiv);
    api.appendChild(item);
  });
  api.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function processAssetData(data) {
  const assetDetailsPane = document.getElementById("asset-details-pane");
  const assetDetailsPaneHeaderTitle = document.getElementById(
    "asset-details-pane-header-title"
  );
  const assetDetailsPaneImage = document.getElementById(
    "asset-details-pane-image"
  );
  const assetDetailsPaneDesc = document.getElementById(
    "asset-details-pane-desc"
  );

  addLoader(assetDetailsPaneDesc);
  let uiObject = data.details.UIObject;
  const uiObjectMatches = uiObject.match(/\[(.*?)\]/);
  const uiObjectValues =
    uiObjectMatches && uiObjectMatches[1]
      ? uiObjectMatches[1]
          .split(",")
          .map((uiObjectValues) => uiObjectValues.trim())
      : [];
  if (uiObjectValues[3] == null || uiObjectValues[3] == "") {
    var icon = ailFinder(data.name);
  } else {
    var icon = imageBasePath + "/cities2/" + decodeURIComponent(data.Name);
  }

  assetDetailsPaneHeaderTitle.innerHTML = data.details.Lang_Title ?? "";
  assetDetailsPaneImage.innerHTML = `<img src="${icon}"/>`;
  assetDetailsPaneDesc.innerHTML =
    data.details.Lang_Description ??
    "".replace(/ \n/g, "<br>").replace(/\n/g, "<br>");

  const temp = document.getElementById("temp");
  temp.innerHTML = "";
  const assetDetailsPaneBodyRightBoxes = document.getElementById(
    "asset-details-pane-body-right-boxes"
  );
  assetDetailsPaneBodyRightBoxes.innerHTML = "";
  processAssetPanelUIData(
    data.name,
    data.details,
    assetDetailsPaneBodyRightBoxes
  );

  assetDetailsPane.classList.add("open");
  isAssetPanelOpen = true;
  // assetDetailsPane.style.display = "block";
  closeAssetPanel();
  addBlur();
  closeDetailsPane();
}

function loadAssets(name) {
  console.log("loadAssets(" + name + ")");
  // getAssetPanelData(name);
}

function addLoader(div) {
  const loader = document.createElement("div");
  loader.classList.add("lds-ripple");
  const loaderInner1 = document.createElement("div");
  const loaderInner2 = document.createElement("div");
  loader.appendChild(loaderInner1);
  loader.appendChild(loaderInner2);
  div.appendChild(loader);
}

function addBlur() {
  const element = document.getElementById("game-bg");
  element.style.filter = "blur(1vh)";
}

function removeBlur() {
  const element = document.getElementById("game-bg");
  element.style.filter = "blur(0vh)";
}

function closeAssetPanel() {
  document.getElementById("asset-panel").style.display = "none";
  removeBlur();
}

function processCloseDetailsPane(event) {
  const assetBar = document.querySelector(".asset-bar");
  const bottomBar = document.querySelector(".bottom-bar");
  const assetDetailsPaneContainer = document.querySelector(
    ".asset-details-pane-container"
  );
  if (
    event.target === assetBar ||
    event.target === bottomBar ||
    event.target === assetDetailsPaneContainer
  ) {
    document.getElementById("asset-details-pane").classList.remove("open");
    removeBlur();
    isAssetPanelOpen = false;
    closeDetailsPane();
  }
}

function closeDetailsPane() {
  const assetBar = document.querySelector(".asset-bar");
  const bottomBar = document.querySelector(".bottom-bar");
  const assetDetailsPaneContainer = document.querySelector(
    ".asset-details-pane-container"
  );

  if (!isAssetPanelOpen) {
    assetBar.removeEventListener("click", processCloseDetailsPane);
    bottomBar.removeEventListener("click", processCloseDetailsPane);
    assetDetailsPaneContainer.removeEventListener(
      "click",
      processCloseDetailsPane
    );
  } else {
    assetBar.addEventListener("click", processCloseDetailsPane);
    bottomBar.addEventListener("click", processCloseDetailsPane);
    assetDetailsPaneContainer.addEventListener(
      "click",
      processCloseDetailsPane
    );
  }

  const toggleForBar = (bar) => {
    if (bar) {
      const children = bar.children;
      const isBlurred = children[0].style.filter === "blur(1vh)";

      for (let child of children) {
        child.style.filter = isBlurred ? "none" : "blur(1vh)";
        child.style.pointerEvents = isBlurred ? "auto" : "none";
      }
    }
  };

  toggleForBar(assetBar);
  toggleForBar(bottomBar);
}

function ailFinder(name) {
  if (findValueInLines(`${name}.png`)) {
    var icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${name}.png`;
  } else if (findValueInLines(`${name}.svg`)) {
    var icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${name}.svg`;
  } else {
    var icon = imageBasePath + "/cities2/Media/Placeholder.svg";
  }
  return icon;
}

window.closeAssetPanel = closeAssetPanel;
window.closeDetailsPane = closeDetailsPane;
window.processAssetGroup = processAssetGroup;
window.processAssetTab = processAssetTab;
window.processAssetPanel = processAssetPanel;
window.processAssetData = processAssetData;
