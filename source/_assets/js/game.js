const assetGroups = {
  "asset-group-1": "0d743b09aa1b82040bfb8a3acb2f18a3",
  "asset-group-2": "78b77cd071c12434a934336e627b4683",
};

const BLUR_ON = "1vh";
const BLUR_OFF = "0vh";

const assetBar = document.querySelector(".asset-bar");
const bottomBar = document.querySelector(".bottom-bar");
const assetDetailsPaneContainer = document.querySelector(
  ".asset-details-pane-container"
);

const assetDetailsPaneX = document.getElementById("details-pane-x");
const api = document.getElementById("asset-panel-items");
const apht = document.getElementById("asset-panel-header-tabs");
const assetPanel = document.getElementById("asset-panel");
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
const gameBgElement = document.getElementById("game-bg");

let isAssetPanelOpen = false;
let isAssetPanelFlexed = false;

$(document).ready(async function () {
  await initDB(false);
  loadFile();
});

// const toolsPanel = document.getElementById("tools-panel");
// toolsPanel.addEventListener("click", function () {
//   deleteIndexedDB()
//     .then((message) => console.log(message))
//     .catch((error) => console.error(error));
// });

function createButton(element) {
  const button = document.createElement("button");
  button.className = "asset-menu-icon";
  button.setAttribute("data-name", element.name);
  button.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
  return button;
}

function processAssetGroup(data) {
  data.forEach((x) => {
    if (x.name === "Zones") {
      x.priority = 10;
    }
  });
  data.sort((a, b) => a.priority - b.priority);
  Object.entries(assetGroups).forEach(([groupName, groupId]) => {
    const groupElement = document.getElementById(groupName);
    groupElement.innerHTML = "";
    data.forEach((element) => {
      if (element.group === groupId) {
        const button = createButton(element);

        const tooltip = document.createElement("div");
        tooltip.className = "asset-group-tooltip";

        const tooltipHeader = document.createElement("div");
        tooltipHeader.className = "asset-group-tooltip-header";
        tooltipHeader.textContent = element.langTitle;
        tooltip.appendChild(tooltipHeader);

        const tooltipBody = document.createElement("div");
        tooltipBody.className = "asset-group-tooltip-body";
        tooltipBody.textContent = element.langDescription;
        tooltip.appendChild(tooltipBody);

        const arrow = document.createElement("div");
        arrow.className = "asset-group-tooltip-arrow";
        tooltip.appendChild(arrow);

        button.appendChild(tooltip);

        let tooltipTimeout;

        button.addEventListener("mouseover", () => {
          tooltipTimeout = setTimeout(() => {
            tooltip.style.visibility = "visible";
          }, 100);
        });

        button.addEventListener("mouseout", () => {
          clearTimeout(tooltipTimeout);
          tooltip.style.visibility = "hidden";
        });

        groupElement.appendChild(button);
      }
    });
  });
  getAssetTabData();
  getAssetPanelData();
  addAssetBarIconTrigger();
  getAssetData();
}

function addAssetBarIconTrigger() {
  const assetGroupContainers = document.querySelectorAll("[id^=asset-group-]");
  assetGroupContainers.forEach((assetContainer) => {
    assetContainer.addEventListener("click", function (event) {
      if (event.target.closest(".asset-menu-icon")) {
        const icon = event.target.closest(".asset-menu-icon");
        if (icon) {
          toggleBlur(true);
          const name = icon.dataset.name;
          apht.innerHTML = "";
          api.innerHTML = "";
          assetPanel.classList.add("opened");
          addLoader(api);

          getAssetTabData(name);
        }
      }
    });
  });
}

function processAssetTab(data) {
  data.sort((a, b) => a.priority - b.priority);
  // if (data.length == 1) {
  //   element = data[0];
  //   const tab = document.createElement("div");
  //   tab.className = "asset-panel-header-tab single round-border-top active";
  //   if (isAssetPanelFlexed) {
  //     tab.classList.add("flexed");
  //   }
  //   tab.innerHTML = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
  //   apht.appendChild(tab);
  //   getAssetPanelData(element.id);
  // } else {
  data.forEach((element) => {
    let className = "multiple";
    if (data.length == 1) {
      className = "single";
    }
    if (element == data[0]) {
      var active = " active";
      getAssetPanelData(data[0].id);
    } else {
      var active = "";
    }
    const tab = document.createElement("div");
    tab.className = `asset-panel-header-tab ${className} round-border-top ${active}`;
    if (isAssetPanelFlexed) {
      tab.classList.add("flexed");
    }
    const imgSrc = `<img src="${imageBasePath}/cities2/${element.icon}"/>`;
    tab.setAttribute("data-id", element.id);
    tab.innerHTML = imgSrc;

    tab.addEventListener("mouseover", function () {
      if (!isAssetPanelFlexed) {
        quickInfoHeaderTitle.innerHTML = element.langTitle ?? "";
        quickInfoBodyImage.innerHTML = imgSrc;
        quickInfoBodyDescription.innerHTML = element.langDescription ?? "";
        quickInfoBodyDescription.innerHTML = quickInfoBodyDescription.innerHTML
          .replace(/ \n/g, "<br>")
          .replace(/\n/g, "<br>");
        setDisplay(quickInfoDiv, "block");
      }
      tab.classList.add("hover");
    });

    tab.addEventListener("mouseout", function () {
      if (!isAssetPanelFlexed) {
        setDisplay(quickInfoDiv, "none");
      }
      tab.classList.remove("hover");
    });

    apht.appendChild(tab);
  });
  const tabs = document.querySelectorAll(".asset-panel-header-tab.multiple");
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

function createAssetPanelItem(element) {
  const item = document.createElement("div");
  item.className = "asset-panel-item round-border";
  if (isAssetPanelFlexed) {
    item.classList.add("flexed");
  }
  item.dataset.prefab = element.prefab;

  const itemDiv = document.createElement("div");
  itemDiv.className = "asset-panel-item-inner";
  var icon = iconDecider(element.name, element.icon);
  // const icon = element.icon
  //   ? imageBasePath + "/cities2/" + decodeURIComponent(element.icon)
  //   : ailFinder(element.name);
  itemDiv.innerHTML = `<img src="${icon}"/>`;
  item.appendChild(itemDiv);

  item.addEventListener("mouseover", function () {
    if (!isAssetPanelFlexed) {
      quickInfoHeaderTitle.innerHTML = element.lang_name ?? "";
      quickInfoBodyImage.innerHTML = `<img src="${icon}"/>`;
      quickInfoBodyDescription.innerHTML = element.lang_desc ?? "";
      quickInfoBodyDescription.innerHTML = quickInfoBodyDescription.innerHTML
        .replace(/ \n/g, "<br>")
        .replace(/\n/g, "<br>");
      setDisplay(quickInfoDiv, "block");
    }
  });

  item.addEventListener("mouseout", function () {
    if (!isAssetPanelFlexed) {
      setDisplay(quickInfoDiv, "none");
    }
  });

  item.addEventListener("click", function () {
    getAssetData(this.dataset.prefab);
      console.log(this.dataset.prefab)
  });

  return item;
}

function processAssetPanel(data) {
  data.sort((a, b) => a.priority - b.priority);
  api.innerHTML = "";

  data.forEach((element) => {
    const item = createAssetPanelItem(element);
    api.appendChild(item);
  });
  api.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function processAssetData(data) {
  const assetDetailsPane = document.getElementById("asset-details-pane");
  const assetDetailsPaneHeaderTitle = document.getElementById(
    "asset-details-pane-header-title"
  );
  const assetDetailsPaneImage = document.getElementById(
    "asset-details-pane-image"
  );
  const assetDetailsPaneDescText = document.getElementById(
    "asset-details-pane-desc-text"
  );
  const tagContainer = document.getElementById("tag-container");
  const notifContainer = document.getElementById("notif-container");

  let uiObject = data.details.UIObject;
  const uiObjectMatches = uiObject.match(/\[(.*?)\]/);
  const uiObjectValues =
    uiObjectMatches && uiObjectMatches[1]
      ? uiObjectMatches[1]
          .split(",")
          .map((uiObjectValues) => uiObjectValues.trim())
      : [];
  var icon = iconDecider(data.name, uiObjectValues[2]);

  assetDetailsPaneHeaderTitle.innerHTML = data.details.Lang_Title ?? "";
  assetDetailsPaneImage.innerHTML = `<img src="${icon}"/>`;
  assetDetailsPaneDescText.innerHTML =
    data.details.Lang_Description ??
    "".replace(/ \n/g, "<br>").replace(/\n/g, "<br>");

  const temp = document.getElementById("temp");
  temp.innerHTML = "";
  const adpbrb = document.getElementById(
    "asset-details-pane-body-bottom-boxes"
  );
  adpbrb.innerHTML = "";
  tagContainer.innerHTML = "";
  notifContainer.innerHTML = "";

  await processAssetPanelUIData(data.name, data.details, [
    adpbrb,
    tagContainer,
    notifContainer,
    temp,
  ]);

  assetDetailsPane.classList.add("open");
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isAssetPanelOpen == true) {
      processCloseDetailsPane(event);
    }
  });
  assetDetailsPaneX.addEventListener("click", function (event) {
    if (isAssetPanelOpen == true) {
      processCloseDetailsPane(event);
    }
  });
  isAssetPanelOpen = true;
  transformAssetPanel();
  toggleBlur(true);
  toggleDetailsPane();
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

function toggleBlur(shouldBlur) {
  gameBgElement.style.filter = shouldBlur
    ? `blur(${BLUR_ON})`
    : `blur(${BLUR_OFF})`;
  hof.style.filter = shouldBlur ? `blur(${BLUR_ON})` : `blur(${BLUR_OFF})`;
}

function closeAssetPanel() {
  assetPanel.classList.remove("opened");
  toggleBlur(false);
}

function transformAssetPanel() {
  const assetPanelItem = document.querySelectorAll(".asset-panel-item");
  const assetPanelItems = document.querySelectorAll(".asset-panel-items");
  const assetPanelTab = document.querySelectorAll(".asset-panel-header-tab");
  const closeButton = document.querySelectorAll(".asset-panel-header-close");
  closeButton.forEach((item) => {
    setDisplay(item, "none");
  });
  setDisplay(quickInfoDiv, "none");
  assetPanel.classList.add("flexed");
  assetPanelItem.forEach((item) => {
    item.classList.add("flexed");
  });
  assetPanelItems.forEach((item) => {
    item.classList.add("flexed");
  });
  assetPanelTab.forEach((item) => {
    item.classList.add("flexed");
  });
  isAssetPanelFlexed = true;
  bottomBar.classList.add("minimized");
  assetBar.classList.add("minimized");
  toggleBlur(false);
  const assetBarChildren = document.querySelectorAll(
    ".asset-bar.minimized > *"
  );
  assetBarChildren.forEach((item) => {
    if (!item.id.startsWith("asset-group-")) {
      setDisplay(item, "none");
    }
  });
}

function revertAssetPanel() {
  const assetPanelItem = document.querySelectorAll(".asset-panel-item");
  const assetPanelItems = document.querySelectorAll(".asset-panel-items");
  const assetPanelTab = document.querySelectorAll(".asset-panel-header-tab");
  const closeButton = document.querySelectorAll(".asset-panel-header-close");
  const assetBarChildren = document.querySelectorAll(
    ".asset-bar.minimized > *"
  );
  assetBarChildren.forEach((item) => {
    if (!item.id.startsWith("asset-group-")) {
      setDisplay(item, "unset");
    }
  });
  closeButton.forEach((item) => {
    setDisplay(item, "flex");
  });
  assetPanel.classList.remove("flexed");
  assetPanelItem.forEach((item) => {
    item.classList.remove("flexed");
  });
  assetPanelItems.forEach((item) => {
    item.classList.remove("flexed");
  });
  assetPanelTab.forEach((item) => {
    item.classList.remove("flexed");
  });
  isAssetPanelFlexed = false;
  bottomBar.classList.remove("minimized");
  assetBar.classList.remove("minimized");
  toggleBlur(true);
}

function setDisplay(x, y) {
  if (x) {
    x.style.display = y;
  }
}

function processCloseDetailsPane(event) {
  if (
    event.target === assetBar ||
    event.target === bottomBar ||
    event.target === assetDetailsPaneContainer ||
    event.target === assetDetailsPaneX ||
    event.key === "Escape"
  ) {
    document.getElementById("asset-details-pane").classList.remove("open");
    toggleBlur(false);
    isAssetPanelOpen = false;
    toggleDetailsPane();
    revertAssetPanel();
  }
}

function toggleDetailsPane() {
  const assetDetailsPaneContainer = document.querySelector(
    ".asset-details-pane-container"
  );
  window.removeEventListener("keydown", function (event) {
    if (event.key === "Escape" && isAssetPanelOpen == true) {
      toggleDetailsPane();
    }
  });

  if (!isAssetPanelOpen) {
    assetDetailsPaneContainer.removeEventListener(
      "click",
      processCloseDetailsPane
    );
  } else {
    assetDetailsPaneContainer.addEventListener(
      "click",
      processCloseDetailsPane
    );
    assetDetailsPaneX.removeEventListener("click", processCloseDetailsPane);
  }
}

function iconDecider(name, ogicon) {
  var icon = findValueInLines(name)
  if (icon != null) {
    icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${icon}`;
  } else if (icon == null && ogicon != undefined) {
    icon = imageBasePath + "/cities2/" + decodeURIComponent(ogicon);
  } else {
    icon = imageBasePath + "/cities2/Media/Placeholder.svg";
  }
  return icon;
}

window.closeAssetPanel = closeAssetPanel;
window.toggleDetailsPane = toggleDetailsPane;
window.processAssetGroup = processAssetGroup;
window.processAssetTab = processAssetTab;
window.processAssetPanel = processAssetPanel;
window.processAssetData = processAssetData;
