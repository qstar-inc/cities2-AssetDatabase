const assetGroups = {
  "asset-group-1": "Zones Toolbar Group",
  "asset-group-2": "Services Toolbar Group",
};

const BLUR_ON = "1vh";
const BLUR_OFF = "0vh";

const assetBar = document.querySelector(".asset-bar");
const bottomBar = document.querySelector(".bottom-bar");
const detailsPane = document.querySelector(".details-pane");
const assetDetailsPaneContainer = document.querySelector(
  ".asset-details-pane-container"
);
const topIcons = document.querySelector(".top-icons");

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
  assetPanel.addEventListener('wheel', handleWheel);
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
  button.setAttribute("data-name", element.PrefabID);
  var elementName = element.PrefabID.split(":")[1];
  var icon = iconDecider(elementName, element.UI_Icon);
  button.innerHTML = `<img src="${icon}"/>`;
  return button;
}

async function processTime() {
  setTimeout(async () => {
    const time = await getTimeSince('assetData');
    const last_updated = await fetchTimeTrack();
    const last_updated_obj = new Date(last_updated);
    if (last_updated_obj.getTime() > time) {
      const chirper = document.querySelector(".chirper");
      chirper.style.opacity = 0.9;
      
      const chirp = document.querySelector(".chirp");
      const chirpAvatar = document.querySelector(".chirp-avatar");
      const chirpUser = document.querySelector(".chirp-user");
      const chirpTime = document.querySelector(".chirp-time");
      const chirpText = document.querySelector(".chirp-text");
      const chirpLike = document.querySelector(".chirp-like");
      // const chirpArrow = document.querySelector(".chirp-arrow");
      chirpUserGender = Math.round(Math.random());
      if (chirpUserGender == 0) {
        firstName = await getLangDataRandomly("Assets.CITIZEN_NAME_MALE");
        lastName = await getLangDataRandomly("Assets.CITIZEN_SURNAME_MALE");
      } else {
        firstName = await getLangDataRandomly("Assets.CITIZEN_NAME_FEMALE");
        lastName = await getLangDataRandomly("Assets.CITIZEN_SURNAME_FEMALE");
      }
      chirpUser.innerHTML = `${firstName} ${lastName}`;
      chirpTime.innerHTML = timeAgo(last_updated_obj);
      chirpText.innerHTML = "New Content available.<br/>Go to Options > Reload Database."
      chirpLike.innerHTML = Math.floor(Math.random() * 1000);
      chirpLike.style.display = "block";
      chirpAvatar.style.display = "flex";
      chirpAvatar.style.backgroundColor = getRandomHexColor();
      // chirpArrow.style.display = "flex";
        chirp.style.display = "flex";
      setTimeout(() => {
        chirp.style.width = "unset";
        chirp.style.padding = "2vh";
        chirp.style.opacity = "1";
      }, 100);
    }
  }, 3000);

}

async function processAssetGroup() {
  await processTime();
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

  const assetId = getQueryParam('prefab');
  if (assetId) {
    await processAssetData(assetId);
  }
  // getAssetData();
}

function addAssetBarIconTrigger() {
  const assetGroupContainers = document.querySelectorAll("[id^=asset-group-]");
  assetGroupContainers.forEach((assetContainer) => {
    assetContainer.addEventListener("click", async function (event) {
      if (event.target.closest(".asset-menu-icon")) {
        const icon = event.target.closest(".asset-menu-icon");
        if (icon) {
          toggleBlur(true);
          allIcons = document.querySelectorAll(".asset-menu-icon");
          allIcons.forEach((allIcon) => {
            allIcon.classList.remove("active");
          })
          icon.classList.add("active");
          const prefabID = icon.dataset.name;
          apht.innerHTML = "";
          api.innerHTML = "";
          assetPanel.classList.add("opened");
          addLoader(api);
          let tabData = await getAssetTabData(prefabID);
          processAssetTab(tabData);
        }
      }
    });
  });
}

function processAssetTab(data) {
  apht.innerHTML = "";
  data.sort((a, b) => a.UI_Priority - b.UI_Priority);
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
  data.forEach(async (element) => {
    let className = "multiple";
    if (data.length == 1) {
      className = "single";
    }
    if (element == data[0]) {
      var active = " active";
      // let panelData = await getAssetPanelData(element.PrefabID);
      // processAssetPanel(panelData);
    } else {
      var active = "";
    }
    
    const tab = document.createElement("div");
    tab.className = `asset-panel-header-tab ${className} round-border-top${active}`;
    if (isAssetPanelFlexed) {
      tab.classList.add("flexed");
    }
    var elementName = element.PrefabID.split(":")[1];
    var icon = iconDecider(elementName, element.UI_Icon);
    const imgSrc = `<img src="${icon}"/>`;
    tab.setAttribute("data-id", element.PrefabID);
    tab.innerHTML = imgSrc;

    tab.addEventListener("mouseover", async function () {
      if (!isAssetPanelFlexed) {
        [langTitle, langDescription] = await getTitleAndDescription(element);
        quickInfoHeaderTitle.innerHTML = langTitle ?? "";
        quickInfoBodyImage.innerHTML = imgSrc;
        quickInfoBodyDescription.innerHTML = langDescription ?? "";
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
  
    if (element == data[0]) { 
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
  var icon = iconDecider(elementName, element.UI_Icon);
  itemDiv.innerHTML = `<img src="${icon}" loading="lazy"/>`;
  item.appendChild(itemDiv);

  item.addEventListener("mouseover", async function () {
    if (!isAssetPanelFlexed) {
      [langTitle, langDescription] = await getTitleAndDescription(element);
      quickInfoHeaderTitle.innerHTML = langTitle ?? "";
      quickInfoBodyImage.innerHTML = `<img src="${icon}"/>`;
      quickInfoBodyDescription.innerHTML = langDescription ?? "";
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
    processAssetData(this.dataset.prefab);
  });

  return item;
}

function processAssetPanel(data) {
  data.sort((a, b) => a.UI_Priority - b.UI_Priority);
  api.innerHTML = "";

  let index = 0;
  const batchSize = 25; // Number of elements to render per batch
  const delay = 500; // Delay in milliseconds between batches

  function renderBatch() {
    if (index >= data.length) {
      // All items processed
      api.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Process a batch of items
    for (let i = 0; i < batchSize && index < data.length; i++, index++) {
      const item = createAssetPanelItem(data[index]);
      api.appendChild(item);
    }

    // Schedule the next batch
    setTimeout(renderBatch, delay);
  }

  // Start rendering in batches
  renderBatch();

  // data.forEach((element) => {
  //   const item = createAssetPanelItem(element);
  //   api.appendChild(item);
  // });
  // api.scrollTo({
  //   top: 0,
  //   behavior: "smooth",
  // });
}

async function processAssetData(PrefabID) {
  detailsPane.style.display = "block";
  const newTitle = `${PrefabID} - Cities: Skylines II Asset Database`;
  document.title = newTitle;
  history.pushState(null, newTitle, `?prefab=${encodeURIComponent(PrefabID)}`);
  const data = await getAssetDataSingle(PrefabID);
  topIcons.classList.add("behind");
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
  var elementName = data.PrefabID.split(":")[1] ?? "";
  var icon = iconDecider(elementName, data.UI_Icon);

  [langTitle, langDescription] = await getTitleAndDescription(data);
  assetDetailsPaneHeaderTitle.innerHTML = langTitle ?? "";
  assetDetailsPaneImage.innerHTML = `<img src="${icon}"/>`;
  assetDetailsPaneDescText.innerHTML =
    langDescription ??
    "".replace(/ \n/g, "<br>").replace(/\n/g, "<br>");

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
  } catch (error) {
    
  }
  await distributeDivsToColumnsByHeight();

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
  const menuIcons = document.querySelectorAll('.asset-menu-icon');
  menuIcons.forEach(icon => icon.classList.remove('active'));
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
    topIcons.classList.remove("behind");
    toggleBlur(false);
    isAssetPanelOpen = false;
    toggleDetailsPane();
    revertAssetPanel();

    const newTitle = `Cities: Skylines II Asset Database`;
    document.title = newTitle;
    history.pushState(null, newTitle, ``);
    detailsPane.style.display = "none";
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
      "click", processCloseDetailsPane
    );
  } else {
    assetDetailsPaneContainer.addEventListener(
      "click", processCloseDetailsPane
    );
    assetDetailsPaneX.removeEventListener("click", processCloseDetailsPane);
  }
}

function iconDecider(name, ogicon) {
  var icon = findValueInLines(name)
  if (icon != null) {
    icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${icon}`;
  } else if (icon == null && ogicon != undefined && ogicon != "") {
    if (ogicon.startsWith("coui://")) {
      if (ogicon.startsWith("coui://uil/")) {
        icon = `https://raw.githubusercontent.com/algernon-A/UnifiedIconLibrary/refs/heads/master/Icons/${ogicon.replace("coui://uil/", "")}`
      } else if (ogicon.startsWith("coui://ail/")) {
        icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${ogicon.replace("coui://ail/","")}`
      // } else if (ogicon.startsWith("coui://customassets/")) {
      //   icon = ``
      // } else if (ogicon.startsWith("coui://ail/")) {
      //   icon = `https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/${ogicon.replace("coui://ail/","")}`
      } else {
        console.log(`Unsupported UI protocol: ${ogicon}`);
        icon = imageBasePath + "/cities2/Media/Placeholder.svg";
      }
    } else if (ogicon.startsWith("assetdb://")) { 
      console.log(`Unsupported UI protocol: ${ogicon}`);
      icon = imageBasePath + "/cities2/Media/Placeholder.svg";
    } else {
      ogicon = ogicon.replace("Media/Game/Icons/Highways.svg", "Media/Game/Icons/HIghways.svg")
      icon = imageBasePath + "/cities2/" + decodeURIComponent(ogicon);
    }
  } else {
    icon = imageBasePath + "/cities2/Media/Placeholder.svg";
  }
  return icon;
}

async function getTitleAndDescription(element) {
  let title = element.PrefabID;
  let desc = "";
  if (element.ServiceUpgrade_Buildings) {
    const [_, prefabName] = element.PrefabID.split(':');
    title = await getLangData(`Assets.UPGRADE_NAME[${prefabName}]`);
    desc = await getLangData(`Assets.UPGRADE_DESCRIPTION[${prefabName}]`);
  } else {
    [title, desc] = await getTitleAndDescriptionFromPrefab(element.PrefabID);
  }
  
  return [title, desc];
}

async function getTitleAndDescriptionFromPrefab(PrefabID) {
  let title = PrefabID;
  let desc = "";
  const [prefabType, prefabName] = PrefabID.split(':');
  if (prefabType == "UIAssetMenuPrefab" || prefabType == "ServicePrefab") {
    title = await getLangData(`Services.NAME[${prefabName}]`);
    desc = await getLangData(`Services.DESCRIPTION[${prefabName}]`);
  } else if (prefabType == "UIAssetCategoryPrefab") {
    title = await getLangData(`SubServices.NAME[${prefabName}]`);
    desc = await getLangData(`Assets.SUB_SERVICE_DESCRIPTION[${prefabName}]`);
  } else {
    title = await getLangData(`Assets.NAME[${prefabName}]`);
    desc = await getLangData(`Assets.DESCRIPTION[${prefabName}]`);
  }
  if (title.includes(".NAME[")) {
    title = prefabName;
  }
  if (desc.includes(".DESCRIPTION[")) {
    desc = "";
  }
  return [title, desc];
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
  if (api.classList.contains('flexed')) {
    console.log("wheel");
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