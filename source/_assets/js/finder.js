const finder = document.getElementById("finder");
const search = document.getElementById("search");
const blockEverything = document.getElementById("finder-block-everything");
const searchResults = document.querySelector(".search-drop");

let searchType = "name";

let isAssetDetailsOnRight = false;

async function openFinder() {
  if (finder) {
    finder.style.height = "max-content";
    finder.style.opacity = 1;
    finder.style.zIndex = 1002;
    finder.classList.add("d-flex");
    if (search) {
      search.placeholder = await getTranslation("search");
      search.focus();
    }
    if (blockEverything) {
      swapClass(blockEverything, "d-block", "d-none");
      blockEverything.addEventListener("click", () => {
        closeFinder();
      });
      blockEverything.addEventListener("dragstart", () => {
        closeFinder();
      });
    }
  }
}

async function closeFinder() {
  swapClass(blockEverything, "d-block", "d-none");
  finder.style.height = 0;
}

let debounceTimeout;
const formHandler = async (e) => {
  clearTimeout(debounceTimeout);
  const userInput = e.target.value.toLowerCase();
  if (userInput.length === 0) {
    return (searchResults.innerHTML = "");
  } else if (userInput.length < 3) {
    searchResults.innerHTML = "<span>.........</span>";
    searchResults.innerHTML = `${repeat("&nbsp;", 5)}${await getTranslation(
      "input-3-characters"
    )}`;
    return;
  }
  debounceTimeout = setTimeout(async () => {
    searchResults.innerHTML = `${repeat("&nbsp;", 5)}......`;
    const searched = await searchAssets(userInput, searchType);
    let filtered;
    if (searchType == "name") {
      filtered = searched
        .filter((prefab) => prefab.PrefabID.toLowerCase().includes(userInput))
        .sort();
    } else {
      filtered = searched
        .filter((prefab) => prefab.GUID.toLowerCase().includes(userInput))
        .sort();
    }

    filteredSorted = filtered.sort((a, b) => {
      const nameA = (a.PrefabID.split(":")[1] || "").toLowerCase();
      const nameB = (b.PrefabID.split(":")[1] || "").toLowerCase();

      const startsWithA = nameA.startsWith(userInput);
      const startsWithB = nameB.startsWith(userInput);

      if (startsWithA && !startsWithB) return -1;
      if (!startsWithA && startsWithB) return 1;

      return nameA.localeCompare(nameB);
    });

    let resultDivs = [];

    for (const item of filteredSorted) {
      const resultDiv = document.createElement("div");
      const resultDivImg = document.createElement("div");
      const resultDivText = document.createElement("div");
      const resultDivHeader = document.createElement("div");
      const resultDivDesc = document.createElement("div");
      const resultDivTags = document.createElement("div");
      resultDiv.classList.add("search-item");
      resultDivImg.classList.add("search-item-image");
      resultDivText.classList.add("search-item-text");
      resultDivHeader.classList.add("search-item-header");
      resultDivDesc.classList.add("search-item-desc");
      resultDivTags.classList.add("search-item-tags");

      prefabSplit = item.PrefabID.split(":");
      itemType = prefabSplit[0] ?? "";
      itemName = prefabSplit[1] ?? "";
      var icon = iconDecider(itemName, item.UI_Icon, item.PrefabID);
      resultDivImg.innerHTML = `<img src="${icon}" loading="lazy"/>`;

      [langTitle, _] = await getTitleAndDescription(item);
      resultDivHeader.innerHTML = langTitle ?? "";

      resultDivDesc.innerHTML = `${itemType}<br/>${itemName}`;

      let tags = [];
      if (item.ContentPrereq) {
        tags.push(item.ContentPrereq);
      }
      if (item.AssetPackItem) {
        tags.push(item.AssetPackItem);
      }

      for (const tag of tags) {
        html = await createTags(tag);
        resultDivTags.appendChild(html);
      }

      resultDiv.appendChild(resultDivImg);
      resultDivText.appendChild(resultDivHeader);
      resultDivText.appendChild(resultDivDesc);
      resultDivText.appendChild(resultDivTags);
      resultDiv.appendChild(resultDivText);
      resultDiv.addEventListener("click", async () => {
        isAssetDetailsOnRight = true;
        processAssetData(item.PrefabID, "type2");
        blockEverything.style.width = "50%";
      });
      resultDivs.push(resultDiv);
    }
    searchResults.innerHTML = "";
    resultDivs.forEach((div) => {
      searchResults.appendChild(div);
    });
  }, 1000);
};

if (search) {
  const checkInterval = setInterval(checkAndTrigger, 3000);
  function checkAndTrigger() {
    if (!db) {
      search.addEventListener("input", formHandler);
    } else {
      clearInterval(checkInterval);
    }
  }
}

function handleButtons(button) {
  document.querySelectorAll(".selection-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
  searchType = button.textContent.toLowerCase();
  const searchInput = document.querySelector("#search");
  if (searchInput.value) {
    const syntheticEvent = { target: searchInput };
    formHandler(syntheticEvent);
  }
}

async function createTags(PrefabID) {
  tagIcon = await getPrefabUIIcon(PrefabID);
  tagID = PrefabID.split(":")[1];
  [tagName, _] = await getTitleAndDescriptionFromPrefab(PrefabID);
  const img = document.createElement("img");
  img.classList.add("search-item-tags-icon");
  img.src = iconDecider(tagID, tagIcon, PrefabID);
  img.loading = "lazy";
  img.title = tagName;
  img.alt = PrefabID;

  const ttSpan = document.createElement("span");
  ttSpan.classList.add("tooltiptext");
  ttSpan.innerText = tagName;

  const imgCont = document.createElement("div");
  imgCont.classList.add("tooltip");
  imgCont.appendChild(img);
  imgCont.appendChild(ttSpan);

  return imgCont;
}

window.openFinder = openFinder;
window.handleButtons = handleButtons;
