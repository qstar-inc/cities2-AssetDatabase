function processAssetPanelUIData(name, data, assetDetailsPaneBodyRightBoxes) {
  const detailsArray = Object.entries(data);
  detailsArray.forEach(([key, value]) => {
    if (value != "null" && value != null) {
      if (key == "BuildingPrefab") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = key;
        div.classList.add("asset-details-pane-body-right-box");

        header.innerHTML = "Building Data";
        data = JSON.parse(value);
        if (data) {
          body.innerHTML = `Access Type: ${enumBuildingAccessType(
            data[0]
          )}<br/>Lot Size: ${data[1]}x${data[2]}`;
        }
        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "CityServiceBuilding") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = key;
        div.classList.add("asset-details-pane-body-right-box");

        header.innerHTML = "City Service Building";
        data = JSON.parse(value);
        if (data.length > 0 && data[0].length > 0) {
          data.forEach((subData) => {
            scale = "";
            if (subData[2] == true) {
              scale = " (Scales with Usage)";
            }
            body.innerHTML += `${subData[1]} ${enumResourceInEditor(
              subData[0]
            )} ${scale}<br/>`;
          });
        }
        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ObsoleteIdentifiers") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = key;
        div.classList.add("asset-details-pane-body-right-box");
        header.innerHTML = "Obsolete Identifiers:";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        const regexX = /\[(.+?),(.+?)\]/g; // [ ... , ... ]
        const matches = value.matchAll(regexX);
        obsoArray = [];
        for (const match of matches) {
          console.log(match);
          obsoArray.push(processObsolete(match[2], match[1]));
        }
        body.innerHTML += sanitizeArray(obsoArray);
        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "PlaceableObject") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = key;
        div.classList.add("asset-details-pane-body-right-box");
        header.innerHTML = "Placeable Object";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [money, xp] = value.split(",");
        if (money == 0) {
          cost = "";
        } else {
          cost = `Cost: ₵${money} `;
        }
        if (xp == 0) {
          reward = "";
        } else {
          reward = `Reward: ${xp} XP`;
        }

        body.innerHTML = sanitizeArray([cost, reward]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key != "Lang_Title" && key != "Lang_Description") {
        const div = document.createElement("div");
        div.innerHTML = `${key}: ${value}`;
        temp.appendChild(div);
      }
    }
  });
  const divs = Array.from(assetDetailsPaneBodyRightBoxes.children);
  divs.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
  divs.forEach((div) => assetDetailsPaneBodyRightBoxes.appendChild(div));
}

function enumResourceInEditor(id) {
  data = [
    "NoResource",
    "Money",
    "Grain",
    "ConvenienceFood",
    "Food",
    "Vegetables",
    "Meals",
    "Wood",
    "Timber",
    "Paper",
    "Furniture",
    "Vehicles",
    "Lodging",
    "UnsortedMail",
    "LocalMail",
    "OutgoingMail",
    "Oil",
    "Petrochemicals",
    "Ore",
    "Plastics",
    "Metals",
    "Electronics",
    "Software",
    "Coal",
    "Stone",
    "Livestock",
    "Cotton",
    "Steel",
    "Minerals",
    "Concrete",
    "Machinery",
    "Chemicals",
    "Pharmaceuticals",
    "Beverages",
    "Textiles",
    "Telecom",
    "Financial",
    "Media",
    "Entertainment",
    "Recreation",
    "Garbage",
    "Count",
  ];
  return data[id];
}

function enumBuildingAccessType(id) {
  data = [
    "Front",
    "LeftCorner",
    "RightCorner",
    "LeftAndRightCorner",
    "LeftAndBackCorner",
    "RightAndBackCorner",
    "FrontAndBack",
    "All",
  ];
  return data[id];
}
function processObsolete(prefab, name) {
  return prefab + ":" + name;
}

function removePrefix(str, prefix) {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}

function removeSuffix(str, suffix) {
  if (str.endsWith(suffix)) {
    return str.slice(0, -suffix.length);
  }
  return str;
}

function sanitizeArray(array, separator = "<br/>") {
  return array
    .filter((item) => item !== undefined && item !== "")
    .join(separator);
}

window.processAssetPanelUIData = processAssetPanelUIData;
