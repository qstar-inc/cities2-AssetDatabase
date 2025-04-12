const { pushState } = require("history-throttled");

const assetGroups = {
  "asset-group-1": "Zones Toolbar Group",
  "asset-group-2": "Services Toolbar Group",
};

const BLUR_ON = "1vh";
const BLUR_OFF = "0vh";

const assetBar = document.querySelector(".asset-bar");
const bottomBar = document.querySelector(".bottom-bar");
const detailsPane = document.querySelector(".details-pane");
const assetDetailsPane = document.getElementById("asset-details-pane");
// const assetDetailsPaneContainer = document.querySelector(
//   ".asset-details-pane-container"
// );
const topIcons = document.querySelector(".top-icons");

const assetDetailsPaneX = document.getElementById("details-pane-x");
const api = document.getElementById("asset-panel-items");
const apht = document.getElementById("asset-panel-header-tabs");
const assetPanel = document.getElementById("asset-panel");
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

let isAssetDetailsOpen;
let isAssetPanelOpen;
let isAssetPanelFlexed;

$(document).ready(async function () {
  await initDB(false);
  loadFile();
  initResizer(
    assetDetailsPane,
    assetDetailsPaneHeaderTitle,
    "assetDetailState"
  );
  assetPanel.addEventListener("wheel", handleWheel);
});

// const toolsPanel = document.getElementById("tools-panel");
// toolsPanel.addEventListener("click", function () {
//   deleteIndexedDB()
//     .then((message) => console.log(message))
//     .catch((error) => console.error(error));
// });

function initResizer(element, header, saveName) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  const savedState = JSON.parse(localStorage.getItem(saveName));
  if (savedState) {
    element.style.left = `${savedState.left}px`;
    element.style.top = `${savedState.top}px`;
    element.style.width = `${savedState.width}px`;
    element.style.height = `${savedState.height}px`;
  }

  function saveWindowState() {
    const state = {
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
    localStorage.setItem(saveName, JSON.stringify(state));
  }

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      recalculateLimit(e);
    }
  }

  function onMouseUp() {
    isDragging = false;
    recalculateLimit();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  function recalculateLimit(e = null) {
    let newLeft = element.offsetLeft;
    let newTop = element.offsetTop;
    let bottomY = window.innerHeight;

    if (e) {
      newLeft = e.clientX - offsetX;
      newTop = e.clientY - offsetY;
    }

    newLeft = Math.max(0, newLeft);
    newTop = Math.max(0, newTop);
    if (isAssetPanelFlexed) {
      bottomY = assetPanel.offsetTop;
      element.style.maxHeight = `${assetPanel.offsetTop}px`;
    }
    if (element.offsetWidth + newLeft > window.innerWidth) {
      newLeft = window.innerWidth - element.offsetWidth;
    }
    if (element.offsetHeight + newTop > bottomY) {
      newTop = bottomY - element.offsetHeight;
    }

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;

    saveWindowState();
  }

  element.addEventListener("mousemove", (e) => {
    recalculateLimit();
    const minWidth = 200;
    const minHeight = 150;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    if (element.offsetWidth < minWidth) {
      element.style.width = `${minWidth}px`;
    } else if (element.offsetWidth > maxWidth) {
      element.style.width = `${maxWidth}px`;
    }

    if (element.offsetHeight < minHeight) {
      element.style.height = `${minHeight}px`;
    } else if (element.offsetHeight > maxHeight) {
      element.style.height = `${maxHeight}px`;
    }
  });

  window.addEventListener("resize", () => {
    recalculateLimit();
  });
}

async function updateCityName() {
  const cityName = document.getElementById("city_name");
  if (cityName) {
    cityName.innerText = await getLangDataRandomly("Assets.CITY_NAME");
  }
}

function createButton(element) {
  const button = document.createElement("button");
  button.className = "asset-menu-icon";
  button.setAttribute("data-name", element.PrefabID);
  var elementName = element.PrefabID.split(":")[1];
  var icon = iconDecider(elementName, element.UI_Icon, element.PrefabID);
  button.innerHTML = `<img src="${icon}"/>`;
  return button;
}

async function processAssetGroup() {
  await updateLangGame();
  let data = await getAssetGroupData();
  data.forEach((x) => {
    if (x.PrefabID === "UIAssetMenuPrefab:Zones") {
      x.UI_Priority = 10;
    }
  });
  data.sort((a, b) => a.UI_Priority - b.UI_Priority);
  Object.entries(assetGroups).forEach(([groupName, groupId]) => {
    const groupElement = document.getElementById(groupName);
    groupElement.innerHTML = "";
    data.forEach(async (element) => {
      if (element.UI_Group === `UIToolbarGroupPrefab:${groupId}`) {
        const button = createButton(element);

        const tooltip = document.createElement("div");
        tooltip.className = "asset-group-tooltip";
        let langTitle, langDescription;
        [langTitle, langDescription] = await getTitleAndDescription(element);
        const tooltipHeader = document.createElement("div");
        tooltipHeader.className = "asset-group-tooltip-header";
        tooltipHeader.textContent = langTitle;
        tooltip.appendChild(tooltipHeader);

        const tooltipBody = document.createElement("div");
        tooltipBody.className = "asset-group-tooltip-body";
        tooltipBody.textContent = langDescription;
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
  // getAssetTabData();
  // getAssetPanelData();
  addAssetBarIconTrigger();
  await updateCityName();

  const assetId = getQueryParam("prefab");
  if (assetId) {
    await processAssetData(assetId);
  }
  // getAssetData();
}

function addAssetBarIconTrigger() {
  const assetGroupContainers = document.querySelectorAll("[id^=asset-group-]");
  assetGroupContainers.forEach((assetContainer) => {
    assetContainer.addEventListener("click", async function (event) {
      allIcons = document.querySelectorAll(".asset-menu-icon");
      allIcons.forEach((allIcon) => {
        allIcon.classList.remove("active");
      });
      const icon = event.target.closest(".asset-menu-icon");
      if (!isAssetPanelOpen) {
        if (icon) {
          toggleBlur(true);

          icon.classList.add("active");
          const prefabID = icon.dataset.name;
          apht.innerHTML = "";
          api.innerHTML = "";
          openAssetPanel();
          addLoader(api);
          await processAssetTab(prefabID);
        }
      } else {
        if (icon) {
          if (icon.classList.contains("active")) {
            closeAssetPanel();
            icon.classList.remove("active");
          } else {
            icon.classList.add("active");
            const prefabID = icon.dataset.name;
            apht.innerHTML = "";
            api.innerHTML = "";
            openAssetPanel();
            addLoader(api);
            await processAssetTab(prefabID);
          }
        }
      }
    });
  });
}

async function processAssetTab(prefabID, Group = null) {
  let data = await getAssetTabData(prefabID);
  apht.innerHTML = "";
  data.sort((a, b) => a.UI_Priority - b.UI_Priority);
  // if (data.length == 1) {
  //   element = data[0];
  //   const tab = document.createElement("div");
  //   tab.className = "asset-panel-header-tab single round-border-top active";
  //   if (isAssetPanelFlexed) {
  //     tab.classList.add("flexed");
  //   }
  //   tab.innerHTML = `<img src="${imageRepoPath}/cities2/${element.icon}"/>`;
  //   apht.appendChild(tab);
  //   getAssetPanelData(element.id);
  // } else {
  data.forEach(async (element) => {
    let className = "multiple";

    let active = "";
    if (data.length == 1) {
      className = "single";
    }
    if (element == data[0] && !Group) {
      active = " active";
    } else {
      if (element.PrefabID == Group) {
        active = " active";
      }
    }

    const tab = document.createElement("div");
    tab.className = `asset-panel-header-tab ${className} round-border-top${active}`;
    if (isAssetPanelFlexed) {
      tab.classList.add("flexed");
    }
    var elementName = element.PrefabID.split(":")[1];
    var icon = iconDecider(elementName, element.UI_Icon, element.PrefabID);
    const imgSrc = `<img src="${icon}"/>`;
    tab.setAttribute("data-id", element.PrefabID);
    tab.innerHTML = imgSrc;

    tab.addEventListener("mouseover", async function () {
      if (isAssetPanelFlexed) {
        quickInfoDiv.classList.add("flexed");
      } else {
        quickInfoDiv.classList.remove("flexed");
      }
      [langTitle, langDescription] = await getTitleAndDescription(element);
      quickInfoHeaderTitle.innerHTML = langTitle ?? "";
      quickInfoBodyImage.innerHTML = imgSrc;
      quickInfoBodyDescription.innerHTML = langDescription ?? "";
      quickInfoBodyDescription.innerHTML = quickInfoBodyDescription.innerHTML
        .replace(/ \n/g, "<br>")
        .replace(/\n/g, "<br>");
      setDisplay(quickInfoDiv, "block");
      tab.classList.add("hover");
    });

    tab.addEventListener("mouseout", function () {
      setDisplay(quickInfoDiv, "none");
      tab.classList.remove("hover");
    });

    apht.appendChild(tab);

    if (element == data[0] && !Group) {
      let panelData = await getAssetPanelData(element.PrefabID);
      processAssetPanel(panelData);
    }
  });
  const tabs = document.querySelectorAll(".asset-panel-header-tab.multiple");
  tabs.forEach((tab) => {
    tab.addEventListener("click", async function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      api.innerHTML = "";
      addLoader(api);
      let panelData = await getAssetPanelData(this.dataset.id);
      processAssetPanel(panelData);
    });
  });
}

function createAssetPanelItem(element) {
  const item = document.createElement("div");
  item.className = "asset-panel-item round-border";
  if (isAssetPanelFlexed) {
    item.classList.add("flexed");
  }
  item.dataset.prefab = element.PrefabID;

  const itemDiv = document.createElement("div");
  itemDiv.className = "asset-panel-item-inner";
  var elementName = element.PrefabID.split(":")[1];
  var icon = iconDecider(elementName, element.UI_Icon, element.PrefabID);
  itemDiv.innerHTML = `<img src="${icon}" loading="lazy"/>`;
  item.appendChild(itemDiv);

  item.addEventListener("mouseover", async function () {
    if (isAssetPanelFlexed) {
      quickInfoDiv.classList.add("flexed");
    } else {
      quickInfoDiv.classList.remove("flexed");
    }
    [langTitle, langDescription] = await getTitleAndDescription(element);
    quickInfoHeaderTitle.innerHTML = langTitle ?? "";
    quickInfoBodyImage.innerHTML = `<img src="${icon}"/>`;
    quickInfoBodyDescription.innerHTML = langDescription ?? "";
    quickInfoBodyDescription.innerHTML = quickInfoBodyDescription.innerHTML
      .replace(/ \n/g, "<br>")
      .replace(/\n/g, "<br>");
    setDisplay(quickInfoDiv, "block");
  });

  item.addEventListener("mouseout", function () {
    setDisplay(quickInfoDiv, "none");
  });

  item.addEventListener("click", function () {
    processAssetData(this.dataset.prefab);
  });

  return item;
}

function processAssetPanel(data, activePrefab = null) {
  data.sort((a, b) => a.UI_Priority - b.UI_Priority);
  api.innerHTML = "";

  data.forEach((element) => {
    const item = createAssetPanelItem(element);
    api.appendChild(item);
  });

  if (activePrefab) {
    const activePrefabElement = document.querySelector(
      `.asset-panel-item[data-prefab="${activePrefab}"]`
    );
    if (activePrefabElement) {
      activePrefabElement.classList.add("selected");
    }
    let i = 0;
    const checkInterval = setInterval(checkAndTrigger, 500);
    function checkAndTrigger() {
      i++;
      if (i > 10) {
        clearInterval(checkInterval);
      }
      if (activePrefabElement.classList.contains("flexed")) {
        if (api.scrollWidth > api.clientWidth) {
          elementPosition = Math.max(
            activePrefabElement.offsetLeft - api.clientWidth / 2,
            0
          );
          api.scrollTo({
            left: elementPosition,
            behavior: "smooth",
          });
          clearInterval(checkInterval);
        }
      }
    }
  } else {
    api.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

async function processAssetData(PrefabID, typeX) {
  const data = await getAssetDataSingle(PrefabID);
  // let panelGroup = await getPrefabUIGroup(PrefabID);

  detailsPane.style.display = "block";
  const current = getQueryParam("prefab");
  if (current != PrefabID) {
    const newTitle = `${PrefabID} - Cities: Skylines II Asset Database`;
    document.title = newTitle;
    pushState(null, newTitle, `?prefab=${encodeURIComponent(PrefabID)}`);
  }
  topIcons.classList.add("behind");
  if (typeX == "type2") {
    assetDetailsPane.style.left = "52vw";
  }

  var elementName = data.PrefabID.split(":")[1] ?? "";
  var icon = iconDecider(elementName, data.UI_Icon, PrefabID);

  [langTitle, langDescription] = await getTitleAndDescription(data);
  assetDetailsPaneHeaderTitle.innerHTML = langTitle ?? "";
  assetDetailsPaneImage.innerHTML = `<img src="${icon}"/>`;
  assetDetailsPaneDescText.innerHTML =
    langDescription ?? "".replace(/ \n/g, "<br>").replace(/\n/g, "<br>");

  const temp = document.getElementById("temp");
  temp.innerHTML = "";
  const adpbbb = document.getElementById(
    "asset-details-pane-body-bottom-boxes"
  );
  adpbbb.innerHTML = "";
  tagContainer.innerHTML = "";
  notifContainer.innerHTML = "";
  adpbbb.classList.add("visible");
  try {
    await processAssetPanelUIData(data, [
      adpbbb,
      tagContainer,
      notifContainer,
      temp,
    ]);
  } catch (error) {}
  isAssetDetailsOpen = true;

  // if (!isAssetPanelOpen) {
  //   assetDetailsPane.style.bottom = "6vh";
  // } else {
  //   assetDetailsPane.style.bottom = "10vw";
  // }

  assetDetailsPane.classList.add("open");
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isAssetDetailsOpen) {
      processCloseDetailsPane(event);
    }
  });
  assetDetailsPaneX.addEventListener("click", function (event) {
    if (isAssetDetailsOpen) {
      processCloseDetailsPane(event);
    }
  });
  transformAssetPanel();
  toggleBlur(true);
  toggleDetailsPane();
  if (data.UI_Group) {
    let panelData = await getAssetPanelData(data.UI_Group);
    let panelMenu = await getPrefabUIMenu(data.UI_Group);
    if (panelMenu) {
      await processAssetTab(panelMenu, data.UI_Group);
      openAssetPanel();
      processAssetPanel(panelData, PrefabID);
      const element = document.querySelector(
        `.asset-menu-icon[data-name="${panelMenu}"]`
      );
      if (element) {
        element.classList.add("active");
      }
    }
  }
  if (isAssetPanelOpen) {
    assetDetailsPane.style.bottom = "10vw";
  } else {
    assetDetailsPane.style.bottom = "6vh";
  }

  await distributeDivsToColumnsByHeight();
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

function openAssetPanel() {
  isAssetPanelOpen = true;
  assetDetailsPane.style.bottom = "10vw";

  assetPanel.classList.add("opened");
  window.removeEventListener("keydown", closeAssetPanel);
  if (!isAssetDetailsOpen) {
    window.addEventListener("keydown", function (event) {
      console.log("Trigger added to closeAssetPanel");
      if (event.key === "Escape" && isAssetPanelOpen && !isAssetDetailsOpen) {
        closeAssetPanel();
      }
    });
  }
}

function closeAssetPanel() {
  isAssetPanelOpen = false;

  assetDetailsPane.style.bottom = "6vh";
  assetPanel.classList.remove("opened");
  window.removeEventListener("keydown", closeAssetPanel);
  const menuIcons = document.querySelectorAll(".asset-menu-icon");
  menuIcons.forEach((icon) => icon.classList.remove("active"));
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
    // event.target === assetDetailsPaneContainer ||
    event.target === assetDetailsPaneX ||
    event.key === "Escape"
  ) {
    isAssetDetailsOpen = false;
    document.getElementById("asset-details-pane").classList.remove("open");
    topIcons.classList.remove("behind");
    toggleBlur(false);
    toggleDetailsPane();
    if (isAssetPanelOpen) {
      revertAssetPanel();
      window.removeEventListener("keydown", closeAssetPanel);
      if (!isAssetDetailsOpen) {
        window.addEventListener("keydown", function (event) {
          console.log("Trigger added to closeAssetPanel");
          if (
            event.key === "Escape" &&
            isAssetPanelOpen &&
            !isAssetDetailsOpen
          ) {
            closeAssetPanel();
          }
        });
      }
    }

    const newTitle = `Cities: Skylines II Asset Database`;
    document.title = newTitle;
    pushState(null, newTitle, window.location.pathname);
    detailsPane.style.display = "none";
  }
}

function toggleDetailsPane() {
  window.removeEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      toggleDetailsPane();
    }
  });
  if (isAssetPanelOpen) {
    window.removeEventListener("keydown", closeAssetPanel);
    detailsPane.addEventListener("click", processCloseDetailsPane);
    assetDetailsPaneX.removeEventListener("click", processCloseDetailsPane);
  } else {
    detailsPane.removeEventListener("click", processCloseDetailsPane);
  }
}

function iconDecider(name, ogicon, prefabID) {
  const frPrefabID = prefabID.replace(":", ".");
  var icon = findValueInLinesCail(name);
  if (icon != null) {
    icon = `${imageRepoPath}/thumbs/${icon}`;
    return icon;
  }

  var iconX = findValueInLines(name);
  if (iconX != null) {
    if (iconX[1] == 0) {
      icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${iconX[0]}`;
      return icon;
    } else {
      icon = `${imageRepoPath}/thumbs/.ail/${iconX[0]}`;
      return icon;
    }
  }

  var iconY = findValueInLinesCail(frPrefabID);
  if (iconY != null) {
    icon = `${imageRepoPath}/thumbs/${icon}`;
    return icon;
  }

  var iconZ = findValueInLines(frPrefabID);
  if (iconZ != null) {
    if (iconZ[1] == 0) {
      icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${iconZ[0]}`;
      return icon;
    } else {
      icon = `${imageRepoPath}/thumbs/.ail/${iconZ[0]}`;
      return icon;
    }
  }

  if (icon == null && ogicon != undefined && ogicon != "") {
    if (ogicon.startsWith("coui://")) {
      if (ogicon.startsWith("coui://uil/")) {
        icon = `https://raw.githubusercontent.com/algernon-A/UnifiedIconLibrary/refs/heads/master/Icons/${ogicon.replace(
          "coui://uil/",
          ""
        )}`;
      } else if (ogicon.startsWith("coui://ail/")) {
        icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${ogicon.replace(
          "coui://ail/",
          ""
        )}`;
      } else if (ogicon.startsWith("coui://customassets/")) {
        icon = imageRepoPath + `/thumbs/${ogicon.replace("coui://", "")}`;
        // } else if (ogicon.startsWith("coui://ail/")) {
        // icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${ogicon.replace("coui://ail/","")}`
      } else {
        console.log(`Unsupported UI protocol: ${ogicon}`);
        icon = `${imageRepoPath}/cities2/Media/Placeholder.svg`;
      }
    } else if (ogicon.startsWith("assetdb://global")) {
      icon = `${imageRepoPath}/thumbs/assetdb/${ogicon.replace(
        "assetdb://global",
        ""
      )}.png`;
    } else if (ogicon.startsWith("assetdb://Global")) {
      icon = `${imageRepoPath}/thumbs/assetdb/${ogicon.replace(
        "assetdb://Global",
        ""
      )}.png`;
    } else if (ogicon.startsWith("thumbnail://")) {
      icon = `${imageRepoPath}/cities2/Media/Placeholder.svg`;
    } else {
      icon = `${imageRepoPath}/cities2/${decodeURIComponent(ogicon)}`;
    }
  } else if (prefabID.startsWith("ContentPrefab")) {
    icon = `${imageRepoPath}/cities2/Media/DLC/${name}.svg`;
  } else {
    icon = `${imageRepoPath}/cities2/Media/Placeholder.svg`;
  }

  icon = icon.replace(
    "Media/Game/Icons/Highways.svg",
    "Media/Game/Icons/HIghways.svg"
  );
  return icon;
}

async function getTitleAndDescription(element) {
  let title = element.PrefabID;
  let desc = "";
  if (element.ServiceUpgrade_Buildings) {
    const [_, prefabName] = element.PrefabID.split(":");
    title = await getLangData(`Assets.UPGRADE_NAME[${prefabName}]`);
    desc = await getLangData(`Assets.UPGRADE_DESCRIPTION[${prefabName}]`);
  } else {
    [title, desc] = await getTitleAndDescriptionFromPrefab(element.PrefabID);
  }

  return [title, desc];
}

async function getTitleAndDescriptionFromPrefab(PrefabID) {
  // let title = PrefabID;
  // let desc = "";
  const [prefabType, prefabName] = PrefabID.split(":");
  let titlePromise, descPromise;
  if (prefabType == "UIAssetMenuPrefab" || prefabType == "ServicePrefab") {
    titlePromise = getLangData(`Services.NAME[${prefabName}]`);
    descPromise = getLangData(`Services.DESCRIPTION[${prefabName}]`);
  } else if (prefabType == "UIAssetCategoryPrefab") {
    titlePromise = getLangData(`SubServices.NAME[${prefabName}]`);
    descPromise = getLangData(`Assets.SUB_SERVICE_DESCRIPTION[${prefabName}]`);
  } else if (prefabType == "ContentPrefab") {
    titlePromise = getLangData(`Common.DLC_TITLE[${prefabName}]`);
    descPromise = Promise.resolve("");
  } else {
    titlePromise = getLangData(`Assets.NAME[${prefabName}]`);
    descPromise = getLangData(`Assets.DESCRIPTION[${prefabName}]`);
  }

  const [title, desc] = await Promise.all([titlePromise, descPromise]);
  const cleanTitle =
    title.includes(".NAME[") || title.includes(".DLC_TITLE")
      ? prefabName
      : title;
  const cleanDesc = desc.includes(".DESCRIPTION[") ? "" : desc;

  return [cleanTitle, cleanDesc];
}

async function getTitleResource(prefab) {
  let title = await getLangData(`Resources.TITLE[${prefab}]`);
  return title;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function handleWheel(event) {
  if (api.classList.contains("flexed")) {
    event.preventDefault();
    api.scrollLeft += event.deltaY;
  }
}

window.closeAssetPanel = closeAssetPanel;
window.toggleDetailsPane = toggleDetailsPane;
window.processAssetGroup = processAssetGroup;
window.processAssetTab = processAssetTab;
window.processAssetPanel = processAssetPanel;
window.processAssetData = processAssetData;
window.getTitleAndDescription = getTitleAndDescription;
window.getTitleAndDescriptionFromPrefab = getTitleAndDescriptionFromPrefab;
window.iconDecider = iconDecider;
