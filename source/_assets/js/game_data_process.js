const pluralize = require("pluralize");

function processAssetPanelUIData(name, data, assetDetailsPaneBodyRightBoxes) {
  const detailsArray = Object.entries(data);

  let hasBuildingData = false;
  let buildingData = {};

  let hasTags = false;
  let tags = [];
  let resources = {};

  detailsArray.forEach(([key, value]) => {
    if (value != "null" && value != null) {
      if (key == "BuildingPrefab") {
        hasBuildingData = true;

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [access, lot_x, lot_y] = value.split(",");
        buildingData.access = enumBuildingAccessType(access);
        buildingData.lot_x = lot_x;
        buildingData.lot_y = lot_y;
      } else if (key == "CityServiceBuilding") {
        hasTags = true;
        tags.push("City Service Building");
        resources.Consumable = JSON.parse(value);
      } else if (key == "Hospital") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Hospital";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          ambulance,
          helicopter,
          patient,
          treatmentBonus,
          rangeLow,
          rangeHigh,
          treatDisease,
          treatInjuries,
        ] = value.split(",");
        let ambulanceText,
          helicopterText,
          patientText,
          treatmentBonusText,
          rangeText,
          treatText;
        if (ambulance != 0) {
          ambulanceText = `${ambulance} ${pluralize("Ambulance", ambulance)}`;
        }
        if (helicopter != 0) {
          helicopterText = `${helicopter} ${pluralize(
            "Helicopter",
            helicopter
          )}`;
        }
        if (patient != 0) {
          patientText = `${patient} Patient Capacity`;
        }
        if (treatmentBonus != 0) {
          treatmentBonusText = `Treatment Bonus: ${treatmentBonus}`;
        }
        if (rangeLow && rangeHigh) {
          rangeText = `Treatment Range ${rangeXY(rangeLow, rangeHigh)}`;
        }

        if (treatDisease == "true" && treatInjuries == "true") {
          treatText = "Treats diseases and injuries";
        } else if (treatDisease == "false" && treatInjuries == "true") {
          treatText = "Treats injuries";
        } else if (treatDisease == "true" && treatInjuries == "false") {
          treatText = "Treats diseases";
        }

        body.innerHTML = sanitizeArray([
          ambulanceText,
          helicopterText,
          patientText,
          treatmentBonusText,
          rangeText,
          treatText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "InitialResources") {
        resources.Initial = JSON.parse(value);
      } else if (key == "ObsoleteIdentifiers") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Obsolete Identifiers:";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        const regexX = /\[(.+?),(.+?)\]/g; // [ ... , ... ]
        const matches = value.matchAll(regexX);

        function processObsolete(name, prefab) {
          return prefab + ":" + name;
        }

        obsoArray = [];
        for (const match of matches) {
          obsoArray.push(processObsolete(match[1], match[2]));
        }
        body.innerHTML += sanitizeArray(obsoArray);
        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "PlaceableObject") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Placeable Object";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [money, xp] = value.split(",");
        let moneyText, xpText;
        if (money != 0) {
          moneyText = `Cost: ₵${money}`;
        }
        if (xp != 0) {
          xpText = `Reward: ${xp} XP`;
        }

        body.innerHTML = sanitizeArray([moneyText, xpText]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "PoliceStation") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "PoliceStation";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [patrol, helicopter, jail, purpose] = value.split(",");
        let patrolText, helicopterText, jailText, purposeText;
        if (patrol != 0) {
          patrolText = `${patrol} ${pluralize("Police Car", patrol)}`;
        }
        if (helicopter != 0) {
          helicopterText = `${helicopter} ${pluralize(
            "Helicopter",
            helicopter
          )}`;
        }
        if (jail != 0) {
          jailText = `${jail} Jail Capacity`;
        }
        if (purpose != 0) {
          purposeText = `Purpose: ${getPolicePurposes(purpose)}`;
        }

        body.innerHTML = sanitizeArray([
          patrolText,
          helicopterText,
          jailText,
          purposeText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "Pollution") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Pollution";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [ground, air, noise, scale] = value.split(",");
        let groundText, airText, noiseText, scaleText;
        if (ground != 0) {
          groundText = `Ground Pollution: ${ground}`;
        }
        if (air != 0) {
          airText = `Air Pollution: ${air}`;
        }
        if (noise != 0) {
          noiseText = `Noise Pollution: ${noise}`;
        }
        if (scale == "true") {
          scaleText = `Scales with Usage`;
        }

        body.innerHTML = sanitizeArray([
          groundText,
          airText,
          noiseText,
          scaleText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "Prison") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Prison";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [van, prisoner, wellbeing, health] = value.split(",");
        let vanText, prisonerText, wellbeingText, healthText;
        if (van != 0) {
          vanText = `${van} ${pluralize("Van", van)}`;
        }
        if (prisoner != 0) {
          prisonerText = `${prisoner} Prisoner Capacity`;
        }
        if (wellbeing != 0) {
          wellbeingText = `${wellbeing} Wellbeing Bonus`;
        }
        if (health != 0) {
          healthText = `${health} Health Bonus`;
        }

        body.innerHTML = sanitizeArray([
          vanText,
          prisonerText,
          wellbeingText,
          healthText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ResourceConsumer") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Resource Consumer";

        body.innerHTML = "";

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ServiceConsumption") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Service Consumption";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [upkeep, electricity, water, garbage, telecom] = value.split(",");
        let upkeepText, electricityText, waterText, garbageText, telecomText;
        if (upkeep != 0) {
          upkeepText = `Upkeep: ₵${upkeep}`;
        }
        if (electricity != 0) {
          electricityText = `Electricity Consumption: ${electricity}`;
        }
        if (water != 0) {
          waterText = `Water Consumption: ${water}`;
        }
        if (garbage != 0) {
          garbageText = `Garbage Accumulation: ${garbage}`;
        }
        if (telecom != 0) {
          telecomText = `Telecom Need: ${telecom}`;
        }

        body.innerHTML = sanitizeArray([
          upkeepText,
          electricityText,
          waterText,
          garbageText,
          telecomText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ServiceCoverage") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Service Coverage";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [range, capacity, magnitude] = value.split(",");
        let rangeText, capacityText, magnitudeText;
        if (range != 0) {
          rangeText = `Range: ₵${range}`;
        }
        if (capacity != 0) {
          capacityText = `Capacity: ${capacity}`;
        }
        if (magnitude != 0) {
          magnitudeText = `Magnitude: ${magnitude}`;
        }

        body.innerHTML = sanitizeArray([
          rangeText,
          capacityText,
          magnitudeText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ServiceFeeCollector") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Service Fee Collector";

        body.innerHTML = "";

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ServiceObject") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Service Object";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        body.innerHTML = evaluateGuid(value);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "ShorelineObject") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Shoreline Object";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [offset, dryland] = value.split(",");
        let offsetText, drylandText;
        if (offset != 0) {
          offsetText = `Shore Offset: ${offset}`;
        }
        if (dryland == "true") {
          drylandText = `Can be placed in dry land`;
        }

        body.innerHTML = sanitizeArray([offsetText, drylandText]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "SignatureBuilding") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Signature Building";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [zone, xp, unlock_image] = value.split(",");
        let zoneText, xpText;
        if (zone != 0) {
          zoneText = `Zone: ${evaluateGuid(zone)}`;
        }
        if (xp != 0) {
          xpText = `Reward: ${xp} XP`;
        }

        body.innerHTML = sanitizeArray([zoneText, xpText]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "StorageLimit") {
        resources.Storage = JSON.parse(value);
      } else if (key == "ThemeObject") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Theme Object";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        body.innerHTML = evaluateGuid(value);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "Unlockable") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Unlock Requirements";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");

        const regex = /\[\[(.*?)\]\],\[\[(.*?)\]\],(true|false)/;
        const match = value.match(regex);

        const all = match[1].split(",");
        const any = match[2].split(",");
        const dep = match[3] === "true";

        let allText, anyText, depText;
        if (all.length > 0 && all.toString() != "") {
          const sanitized = all.map((item) => evaluateGuid(item));
          allText = `All of ${sanitized.join(", ")}`;
        }
        if (any.length > 0 && any.toString() != "") {
          const sanitized = any.map((item) => evaluateGuid(item));
          anyText = `Any of ${sanitized.join(", ")}`;
        }
        if (dep === true) {
          depText = `Dependencies Ignorable`;
        }

        body.innerHTML = sanitizeArray([allText, anyText, depText]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "WaterPumpingStation") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Water Pumping Station";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [capacity, purification, type] = value.split(",");
        let capacityText, purificationText, typeText;
        if (capacity != 0) {
          capacityText = `Pumping Capacity: ${capacity}`;
        }
        if (purification != 0) {
          purificationText = `Purification Capacity: ${purification}`;
        }
        typeText = `Allowed Type: ${enumAllowedWaterTypes(type)}`;

        body.innerHTML = sanitizeArray([
          capacityText,
          purificationText,
          typeText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "Workplace") {
        const div = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        div.dataset.name = getSl(key);
        div.classList.add("asset-details-pane-body-bottom-box");
        header.classList.add("asset-details-pane-body-bottom-box-header");
        body.classList.add("asset-details-pane-body-bottom-box-body");
        header.innerHTML = "Workplace";

        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [workplaces, complexity, eveningProb, nightProb] = value.split(",");
        let workplacesText, complexityText, eveningProbText, nightProbText;
        if (workplaces != 0) {
          workplacesText = `Workplaces: ${workplaces}`;
        }
        if (complexity != 0) {
          complexityText = `Complexity: ${enumWorkplaceComplexity(complexity)}`;
        }
        if (eveningProb != 0) {
          eveningProbText = `Evening Shift Probability: ${floatToPercent(
            eveningProb
          )}`;
        }
        if (nightProb != 0) {
          nightProbText = `Night Shift Probability: ${floatToPercent(
            nightProb
          )}`;
        }

        body.innerHTML = sanitizeArray([
          workplacesText,
          complexityText,
          eveningProbText,
          nightProbText,
        ]);

        div.appendChild(header);
        div.appendChild(body);
        assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (
        key != "Lang_Title" &&
        key != "Lang_Description" &&
        key != "UIObject"
      ) {
        const div = document.createElement("div");
        div.innerHTML = `${key}: ${value}`;
        temp.appendChild(div);
      }
    }
  });
  if (hasBuildingData) {
    const div = document.createElement("div");
    if (buildingData.lot_x && buildingData.lot_y) {
      div.innerHTML += `Width: ${buildingData.lot_x}`;
      div.innerHTML += `<br/>Depth: ${buildingData.lot_y}`;
    }
    if (buildingData.access) {
      div.innerHTML += `<br/>Access: ${buildingData.access}`;
    }
    assetDetailsPaneBodyRightBoxes.appendChild(div);
  }
  if (hasTags) {
    const div = document.createElement("div");
    tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "asset-tag";
      tagElement.textContent = tag;
      div.appendChild(tagElement);
    });
    assetDetailsPaneBodyRightBoxes.appendChild(div);
  }

  if (resources) {
    let serviceUsageArray = [];
    let hasResourceUsage = false;

    if (
      resources.Initial &&
      resources.Initial.length > 0 &&
      resources.Initial[0].length > 0
    ) {
      hasResourceUsage = true;
      resources.Initial.forEach((subData) => {
        serviceUsageArray.push([subData[0], subData[1], "Initial"]);
      });
    }

    if (
      resources.Consumable &&
      resources.Consumable.length > 0 &&
      resources.Consumable[0].length > 0
    ) {
      hasResourceUsage = true;
      resources.Consumable.forEach((subData) => {
        let resType = "Non-scalable Consumable";
        if (subData[2] == true) {
          resType = "Scalable Consumable";
        }
        serviceUsageArray.push([subData[0], subData[1], resType]);
      });
    }

    if (resources.Storage && resources.Storage.length > 0) {
      hasResourceUsage = true;
      resources.Storage.forEach((subData) => {
        serviceUsageArray.push(["Any", subData, "Storage Limit"]);
      });
    }

    if (hasResourceUsage) {
      const div = document.createElement("div");
      const span = document.createElement("span");
      span.innerHTML = "Resource Usage:<br/>";
      div.appendChild(span);
      div.appendChild(createResourceUseTable(serviceUsageArray));
      assetDetailsPaneBodyRightBoxes.appendChild(div);
    }
  }
  // const divs = Array.from(assetDetailsPaneBodyRightBoxes.children);
  // divs.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
  // divs.forEach((div) => assetDetailsPaneBodyRightBoxes.appendChild(div));
}

function processResource(subData) {
  scale = "";
  if (subData[2] == true) {
    scale = "<br/>(Scales with Usage)";
  }
  return `${subData[1]} ${pluralize(
    enumResourceInEditor(subData[0]),
    subData[1]
  )} ${scale}`;
}

function createResourceUseTable(resourceData) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("resource-use-table");
  resourceData.forEach((resource) => {
    // const div = document.createElement("div");
    const divIcon = document.createElement("div");
    const divRes = document.createElement("div");
    const divAmount = document.createElement("div");
    const divType = document.createElement("div");

    if (resource[0] === "Any") {
      divRes.innerHTML = "Anything";
    } else {
      divRes.innerHTML = enumResourceInEditor(resource[0]);
    }

    if (resource[0] === "Any" || resource[2] === "Initial") {
      divIcon.classList.add("storage");
      divRes.classList.add("storage");
      divAmount.classList.add("storage");
      divType.classList.add("storage");
    }
    divAmount.innerHTML = resource[1];
    divType.innerHTML = resource[2];

    mainDiv.appendChild(divIcon);
    mainDiv.appendChild(divRes);
    mainDiv.appendChild(divAmount);
    mainDiv.appendChild(divType);
    // mainDiv.appendChild(div);
  });
  return mainDiv;
}

function floatToPercent(value) {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) {
    return value;
  }
  const percentage = (floatValue * 100).toString();
  return percentage.includes(".")
    ? percentage.replace(/\.?0+$/, "") + "%"
    : percentage + "%";
}

function rangeXY(x, y, units = null, preUnit = false) {
  if (units == null) {
    return `${x}% to ${y}%`;
  }
  if ((preUnit = true)) {
    return `${units}${x} to ${units}${y}`;
  }
  return `${x}${units} to ${y}${units}`;
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
    "Front only",
    "Left Corner only",
    "Right Corner only",
    "Left And Right Corners only",
    "Left And Back Corners only",
    "Right And Back Corners only",
    "Front And Back only",
    "Everywhere",
  ];
  return data[id];
}

function enumAllowedWaterTypes(id) {
  data = ["None", "Groundwater", "Surface Water"];
  return data[id];
}

function enumWorkplaceComplexity(id) {
  data = ["Manual", "Simple", "Complex", "Hitech"];
  return data[id];
}

function getPolicePurposes(value) {
  const PolicePurpose = {
    Patrol: 1,
    Emergency: 2,
    Intelligence: 4,
  };

  return Object.keys(PolicePurpose).filter((key) => value & PolicePurpose[key]);
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

function sanitizeGUID(text) {
  return text
    .replaceAll("$fstrref:UnityGUID:", "")
    .replaceAll("$fstrref:CID:", "");
}

function evaluateGuid(guid) {
  guidText = sanitizeGUID(guid);
  return guidText;
}

function getSl(key) {
  return key;
}

window.processAssetPanelUIData = processAssetPanelUIData;
