const pluralize = require("pluralize");

const guidList = [
  { "c3724de73723f5b4ab589dd1fa756861": { name: "Landmark DLC", category: "DLC" } },
  { "fd4f0cd1f9d0ecb4eb6617a5dfa0cdf6": { name: "Commercial Bar", category: "Company" } },
  { "5c720b3dca56ad24a8575622fc1f3288": { name: "Commercial Food Store", category: "Company" } },
  { "f18970a35e902c14982fb42e04534ad1": { name: "Commercial Hotel", category: "Company" } },
  { "b018f3987d5d8284db0ecc1f153beae6": { name: "Commercial Liquor Store", category: "Company" } },
  { "1b916563a0c8b0f40be97d75e3c8857b": { name: "Commercial Restaurant", category: "Company" } },
  { "5c1f656a5ea20284197a71e4997b4187": { name: "Parks and Recreation", category: "Service" } }
]; 

let tags = [];
let notifications = [];
let resources = {};
resources.Production = [];
let production = {};

let comp_attraction = {};
let comp_battery = {};
let comp_companyObject = {};
let comp_destructible = {};
let comp_floating = {};
let comp_garbage = {};
let comp_hospital = {};
let comp_leisureProvider = {};
let comp_park = {};
let comp_placableObject = {};
let comp_police = {};
let comp_pollution = {};
let comp_post = {};
let comp_prison = {};
let comp_school = {};
let comp_serviceConsumption = {};
let comp_serviceCoverage = {};
let comp_shoreline = {};
let comp_telecom = {};
let comp_waterPump = {};
let comp_workplace = {};
let prefab_building = {};

let adprb;

function processAssetPanelUIData(name, data, containers) {
  adprb = containers[0];
  let tagContainer = containers[1];
  let notifContainer = containers[2];
  let temp = containers[3];

  const detailsArray = Object.entries(data);

  tags = [];
  notifications = [];
  resources = {};
  resources.Production = [];
  production = {};

  comp_attraction = {};
  comp_battery = {};
  comp_companyObject = {};
  comp_destructible = {};
  comp_floating = {};
  comp_garbage = {};
  comp_hospital = {};
  comp_leisureProvider = {};
  comp_park = {};
  comp_placableObject = {};
  comp_police = {};
  comp_pollution = {};
  comp_post = {};
  comp_prison = {};
  comp_school = {};
  comp_serviceConsumption = {};
  comp_serviceCoverage = {};
  comp_shoreline = {};
  comp_telecom = {};
  comp_waterPump = {};
  comp_workplace = {};
  prefab_building = {};

  const tempRight = document.getElementById("temp-right");
  tempRight.innerHTML = "";

  detailsArray.forEach(([key, value]) => {
    if (value != "null" && value != null) {
      if (key == "BuildingPrefab") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [access, lot_x, lot_y] = value.split(",");
        prefab_building.access = enumBuildingAccessType(access);
        prefab_building.lot_x = lot_x;
        prefab_building.lot_y = lot_y;
      } else if (key == "AdministrationBuilding") {
        tags.push({ name: "Administration Building", type: "Class"});
      } else if (key == "Attraction") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_attraction.attractiveness] = value.split(",");
      } else if (key == "Battery") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_battery.output, comp_battery.capacity] = value.split(",");
      } else if (key == "CityServiceBuilding") {
        tags.push({ name: "City Service Building", type: "Class"});
        resources.Consumable = JSON.parse(value);
      } else if (key == "CompanyObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        select = value.split(",")[0];
        companies = removePrefix(value, select + ",");
        comp_companyObject.companies = companies.split(",");
      } else if (key == "ContentPrerequisite") {
        tags.push(...getGUID(value));
      } else if (key == "DestructibleObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_destructible.fireHazard, comp_destructible.integrity] = value.split(",");
      } else if (key == "FirewatchTower") {
        tags.push({ name: "Firewatch Tower", type: "Class"});
      } else if (key == "FloatingObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_floating.offset, comp_floating.fixed, comp_floating.dryland ] = value.split(",");
      } else if (key == "GarbageFacility") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_garbage.capacity,
          comp_garbage.van,
          comp_garbage.transport,
          comp_garbage.speed,
          comp_garbage.industrial,
          comp_garbage.longterm
        ] = value.split(",");
      } else if (key == "GarbagePowered") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [production.garbageUnit, production.garbageCapacity] = value.split(",");
      } else if (key == "GroundWaterPowered") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [production.groundWaterProduction, production.groundWaterCapacity] = value.split(",");
      } else if (key == "Hospital") {
        tags.push({ name: "Hospital", type: "Class"});
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_hospital.ambulance,
          comp_hospital.helicopter,
          comp_hospital.patient,
          comp_hospital.treatmentBonus,
          comp_hospital.rangeLow,
          comp_hospital.rangeHigh,
          comp_hospital.treatDisease,
          comp_hospital.treatInjuries,
        ] = value.split(",");
      } else if (key == "InitialResources") {
        resources.Initial = JSON.parse(value);
      } else if (key == "LeisureProvider") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_leisureProvider.efficiency, comp_leisureProvider.resource, comp_leisureProvider.type] = value.split(",");
      } else if (key == "ObsoleteIdentifiers") {
        // const div = document.createElement("div");
        // const header = document.createElement("div");
        // const body = document.createElement("div");
        // div.dataset.name = getSl(key);
        // div.classList.add("asset-details-pane-body-bottom-box");
        // header.classList.add("asset-details-pane-body-bottom-box-header");
        // body.classList.add("asset-details-pane-body-bottom-box-body");
        // header.innerHTML = "Obsolete Identifiers:";
        // value = removePrefix(value, "[");
        // value = removeSuffix(value, "]");
        // const regexX = /\[(.+?),(.+?)\]/g; // [ ... , ... ]
        // const matches = value.matchAll(regexX);
        // function processObsolete(name, prefab) {
        //   return prefab + ":" + name;
        // }
        // obsoArray = [];
        // for (const match of matches) {
        //   obsoArray.push(processObsolete(match[1], match[2]));
        // }
        // body.innerHTML += sanitizeArray(obsoArray);
        // div.appendChild(header);
        // div.appendChild(body);
        // assetDetailsPaneBodyRightBoxes.appendChild(div);
      } else if (key == "Park") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_park.maintenance, comp_park.homeless] = value.split(",");
      } else if (key == "PlaceableObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_placableObject.cost, comp_placableObject.xp] = value.split(",");
      } else if (key == "PoliceStation") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_police.patrol,
          comp_police.helicopter,
          comp_police.jail,
          comp_police.purpose
        ] = value.split(",");
      } else if (key == "Pollution") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_pollution.ground,
          comp_pollution.air,
          comp_pollution.noise,
          comp_pollution.scale,
        ] = value.split(",");
      } else if (key == "PostFacility") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_post.van, comp_post.truck, comp_post.storage, comp_post.box, comp_post.sort] = value.split(",");
      } else if (key == "PowerPlant") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [production.power] = value.split(",");
      } else if (key == "Prison") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_prison.van, comp_prison.prisoner, comp_prison.wellbeing, comp_prison.health] = value.split(",");
      } else if (key == "ResearchFacility") {
        tags.push({ name: "Research Facility", type: "Class"});
      } else if (key == "ResourceConsumer") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        notifications.push(...getGUID(value));
      } else if (key == "ResourceProducer") {
        resources.Production = JSON.parse(value);
      } else if (key == "School") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_school.capacity,
          comp_school.level,
          comp_school.gradModifier,
          comp_school.wellbeing,
          comp_school.health,
        ] = value.split(",");
      } else if (key == "ServiceConsumption") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_serviceConsumption.upkeep,
          comp_serviceConsumption.electricity,
          comp_serviceConsumption.water,
          comp_serviceConsumption.garbage,
          comp_serviceConsumption.telecom,
        ] = value.split(",");
      } else if (key == "ServiceCoverage") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_serviceCoverage.range,
          comp_serviceCoverage.capacity,
          comp_serviceCoverage.magnitude,
        ] = value.split(",");
      } else if (key == "ServiceFeeCollector") {
        tags.push({ name: "Service Fee Collector", type: "Class"});
      } else if (key == "ServiceObject") {
        tags.push(...getGUID(value));
      } else if (key == "ShorelineObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_shoreline.offset, comp_shoreline.dryland ] = value.split(",");
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
          zoneText = `Zone: ${getGUID(zone)}`;
        }
        if (xp != 0) {
          xpText = `Reward: ${xp} XP`;
        }

        body.innerHTML = sanitizeArray([zoneText, xpText]);

        div.appendChild(header);
        div.appendChild(body);
        adprb.appendChild(div);
      } else if (key == "SolarPowered") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [production.solarProduction] = value.split(",");
      } else if (key == "StorageLimit") {
        resources.Storage = JSON.parse(value);
      } else if (key == "TelecomFacility") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_telecom.range,
          comp_telecom.capacity,
          comp_telecom.satellite,
        ] = value.split(",");
      } else if (key == "ThemeObject") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        tags.push(...getGUID(value));
      } else if (key == "Transformer") {
        tags.push({ name: "Transformer", type: "Class"});
      } else if (key == "UniqueObject") {
        tags.push({ name: "Unique Object", type: "Class"});
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
          const sanitized = all.map((item) => getGUID(item));
          allText = `All of ${sanitized.join(", ")}`;
        }
        if (any.length > 0 && any.toString() != "") {
          const sanitized = any.map((item) => getGUID(item));
          anyText = `Any of ${sanitized.join(", ")}`;
        }
        if (dep === true) {
          depText = `Dependencies Ignorable`;
        }

        body.innerHTML = sanitizeArray([allText, anyText, depText]);

        div.appendChild(header);
        div.appendChild(body);
        tempRight.appendChild(div);
      } else if (key == "WaterPumpingStation") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [comp_waterPump.capacity, comp_waterPump.purification, comp_waterPump.type] = value.split(",");
      } else if (key == "WelfareOffice") {
        tags.push({ name: "Welfare Office", type: "Class"});
      } else if (key == "WindPowered") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [production.windSpeed, production.windProduction] = value.split(",");
      } else if (key == "Workplace") {
        value = removePrefix(value, "[");
        value = removeSuffix(value, "]");
        [
          comp_workplace.workplaces,
          comp_workplace.complexity,
          comp_workplace.eveningProb,
          comp_workplace.nightProb,
        ] = value.split(",");
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

  if (!isEmptyArray(tags)) {
    tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "asset-tag";
      tagElement.textContent = `${tag['type']}: ${tag.name}`;
      tagContainer.appendChild(tagElement);
    });
  }

  if (!isEmptyArray(notifications)) {
    notifications.forEach((notification) => {
      const notifElement = document.createElement("span");
      notifElement.className = "asset-tag";
      notifElement.textContent = notification;
      notifContainer.appendChild(notifElement);
    });
  }

  if (!isEmptyObject(prefab_building)) {
    makeDataDiv("Building Data", processBuildingPrefab());
  }

  if (!isEmptyObject(resources)) {
    let serviceUsageArray = [];
    if (!isEmptyArray(resources.Initial)) {
      resources.Initial.forEach((subData) => {
        serviceUsageArray.push([subData[0], subData[1], "Initial"]);
      });
    }
    if (resources.Consumable != undefined) {
      if (!isEmptyArray(resources.Consumable[0])) {
        resources.Consumable.forEach((subData) => {
          let resType = "Non-scalable Consumable";
          if (subData[2] == true) {
            resType = "Scalable Consumable";
          }
          serviceUsageArray.push([subData[0], subData[1], resType]);
        });
      }
    }

    if (!isEmptyArray(resources.Storage)) {
      resources.Storage.forEach((subData) => {
        serviceUsageArray.push(["Any", subData, "Storage Limit"]);
      });
    }

    if (!isEmptyArray(serviceUsageArray)) {
      makeDataDiv("Resource Usage", createResourceUseTable(serviceUsageArray));
    }

    if (!isEmptyObject(resources.Production)) {
      makeDataDiv("Resource Production", createResourceUseTable(resources.Production,2));
    }
  }

  if (!isEmptyObject(production)) {
    makeDataDiv("Production", processProduction());
  }

  if (!isEmptyObject(comp_attraction)) {
    makeDataDiv("Attraction", processAttractionComp());
  }

  if (!isEmptyObject(comp_battery)) {
    makeDataDiv("Battery", processBatteryComp());
  }

  if (!isEmptyObject(comp_companyObject)) {
    makeDataDiv("Company Object", processCompanyObjectComp());
  }

  if (!isEmptyObject(comp_destructible)) {
    makeDataDiv("Destructible Object", processDestructibleObjectComp());
  }

  if (!isEmptyObject(comp_floating)) {
    makeDataDiv("Floating Object", processFloatingObjectComp());
  }

  if (!isEmptyObject(comp_garbage)) {
    makeDataDiv("Garbage Facility", processGarbageComp());
  }

  if (!isEmptyObject(comp_hospital)) {
    makeDataDiv("Hospital", processHospitalComp());
  }

  if (!isEmptyObject(comp_leisureProvider)) {
    makeDataDiv("Leisure Provider", processLeisureProviderComp());
  }

  if (!isEmptyObject(comp_park)) {
    makeDataDiv("Park", processParkComp());
  }

  if (!isEmptyObject(comp_placableObject)) {
    makeDataDiv("Placable Object", processPlacableObjectComp());
  }

  if (!isEmptyObject(comp_police)) {
    makeDataDiv("Police Station", processPoliceStationComp());
  }

  if (!isEmptyObject(comp_pollution)) {
    makeDataDiv("Pollution", processPollutionComp());
  }

  if (!isEmptyObject(comp_post)) {
    makeDataDiv("Post Facility", processPostComp());
  }

  if (!isEmptyObject(comp_prison)) {
    makeDataDiv("Prison", processPrisonComp());
  }

  if (!isEmptyObject(comp_school)) {
    makeDataDiv("School", processSchoolComp());
  }

  if (!isEmptyObject(comp_serviceCoverage)) {
    makeDataDiv("Service Coverage", processServiceCoverageComp());
  }

  if (!isEmptyObject(comp_serviceConsumption)) {
    makeDataDiv("Service Consumption", processServiceConsumptionComp());
  }

  if (!isEmptyObject(comp_shoreline)) {
    makeDataDiv("Shoreline Object", processShorelineObjectComp());
  }

  if (!isEmptyObject(comp_telecom)) {
    makeDataDiv("Telecom Facility", processTelecomComp());
  }

  if (!isEmptyObject(comp_waterPump)) {
    makeDataDiv("Water Pumping Station", processWaterPumpComp());
  }

  if (!isEmptyObject(comp_workplace)) {
    makeDataDiv("Workplace", processWorkplaceComp());
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
    parseInt(subData[1])
  )} ${scale}`;
}

function makeDataDiv(headerText, func) {
  const div = document.createElement("div");
  const header = document.createElement("div");
  header.classList.add("box-header");
  header.innerHTML = headerText;
  div.classList.add("asset-details-pane-body-bottom-box-new");
  div.appendChild(header);
  div.appendChild(func);
  adprb.appendChild(div);
}

function makeSubTextDiv(titleText, valueText, div, unit = "") {
  const value = document.createElement("span");
  value.classList.add("value-above-subtext");
  value.innerHTML = sanitizeValueText(valueText);
  if (unit != "") {
    value.innerHTML += "<br/><small>"+unit+"</small>";
  }
  const finalDiv = document.createElement("div");
  finalDiv.classList.add("div-with-subtext");
  finalDiv.appendChild(value);
  if (titleText != "") {
    const title = document.createElement("span");
    title.classList.add("subtext");
    title.innerHTML = titleText;
    finalDiv.appendChild(title);
  }
  div.appendChild(finalDiv);
}

function processBuildingPrefab() {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  if (prefab_building.lot_x && prefab_building.lot_y) {
    const lotDiv = document.createElement("div");
    lotDiv.classList.add("parent-div-with-subtext");

    makeSubTextDiv("Width", prefab_building.lot_x, lotDiv);
    makeSubTextDiv("Depth", prefab_building.lot_y, lotDiv);

    lotDiv.style.gridTemplateColumns = `repeat(2, 1fr)`;
    mainDiv.appendChild(lotDiv);
  }
  if (prefab_building.access) {
    const div = document.createElement("div");
    div.classList.add("parent-div-with-subtext");
    makeSubTextDiv("Access Direction", prefab_building.access, div);
    div.style.gridTemplateColumns = `repeat(1, 1fr)`;
    mainDiv.appendChild(div);
  }
  return mainDiv;
}

function processAttractionComp() {
  const attractiveness = comp_attraction.attractiveness;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (attractiveness != 0) {
    makeSubTextDiv("Attractiveness", attractiveness, div);
    count++;
  }
  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processBatteryComp() {
  const output = comp_battery.output;
  const capacity = comp_battery.capacity;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (output != 0) {
    makeSubTextDiv("Output", output, div);
    count++;
  }
  if (capacity != 0) {
    makeSubTextDiv("Capacity", capacity, div);
    count++;
  }
  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processCompanyObjectComp() {
  const companies = comp_companyObject.companies;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (companies != 0) {
    text = getGUID(companies.join(",")).join("<br/>");
    text = text.replaceAll("Commercial ", "");
    makeSubTextDiv("", text, div);
    count++;
  }
  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processDestructibleObjectComp() {
  const fireHazard = comp_destructible.fireHazard;
  const integrity = comp_destructible.integrity;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (fireHazard != 0) {
    makeSubTextDiv("Fire Hazard", fireHazard, div);
    count++;
  }
  
  if (integrity != 0) {
    makeSubTextDiv("Structural Integrity", integrity, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processFloatingObjectComp() {
  const offset = comp_floating.offset;
  const fixed = comp_floating.fixed;
  const dryland = comp_floating.dryland;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (offset != 0) {
    makeSubTextDiv("Floating Offset", offset, div);
    count++;
  }
  
  if (fixed == "true") {
    makeSubTextDiv("", "Fixed to Bottom", div);
    count++;
  }
  
  if (dryland == "true") {
    makeSubTextDiv("", "Dry Land Allowed", div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processGarbageComp() {
  const capacity = comp_garbage.capacity;
  const van = comp_garbage.van;
  const transport = comp_garbage.transport;
  const speed = comp_garbage.speed;
  const industrial = comp_garbage.industrial;
  const longterm = comp_garbage.longterm;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (capacity != 0) {
    makeSubTextDiv("Capacity", capacity/1000, div, "tonnes");
    count++;
  }
  
  if (van != 0) {
    makeSubTextDiv("Garbage "+ pluralize("Trucks", parseInt(van)), van, div);
    count++;
  }
  
  if (transport != 0) {
    makeSubTextDiv("Transport "+ pluralize("Trucks", parseInt(transport)), transport, div);
    count++;
  }
  
  if (speed != 0) {
    makeSubTextDiv("Processing Speed", speed/1000, div, "tonnes per month");
    count++;
  }
  
  if (industrial == "true") {
    makeSubTextDiv("", "Industrial Waste Only", div);
    count++;
  }
  
  if (longterm == "true") {
    makeSubTextDiv("", "Long Term Storage", div);
    count++;
  }
  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processHospitalComp() {
  const ambulance = comp_hospital.ambulance;
  const helicopter = comp_hospital.helicopter;
  const patient = comp_hospital.patient;
  const treatmentBonus = comp_hospital.treatmentBonus;
  const rangeLow = comp_hospital.rangeLow;
  const rangeHigh = comp_hospital.rangeHigh;
  const treatDisease = comp_hospital.treatDisease;
  const treatInjuries = comp_hospital.treatInjuries;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  if (ambulance != 0 || helicopter != 0 || patient != 0) {
    const div = document.createElement("div");
    div.classList.add("parent-div-with-subtext");
    let count = 0;
    if (ambulance != 0) {
      makeSubTextDiv(pluralize("Ambulance", parseInt(ambulance)), ambulance, div);
      count++;
    }

    if (helicopter != 0) {
      makeSubTextDiv(pluralize("Helicopter", parseInt(helicopter)), helicopter, div);
      count++;
    }

    if (patient != 0) {
      makeSubTextDiv(pluralize("Patients", parseInt(patient)), patient, div);
      count++;
    }

    div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    mainDiv.appendChild(div);
  }

  if (treatmentBonus != 0 || (rangeLow && rangeHigh)) {
    const div = document.createElement("div");
    div.classList.add("parent-div-with-subtext");
    let count = 0;

    if (treatmentBonus != 0) {
      makeSubTextDiv("Treatment Bonus", treatmentBonus, div);
      count++;
    }

    if (rangeLow && rangeHigh) {
      makeSubTextDiv("Treatment Range", rangeXY(rangeLow, rangeHigh), div);
      count++;
    }

    div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    mainDiv.appendChild(div);
  }

  const treatsDiv = document.createElement("div");
  treatsDiv.classList.add("parent-div-with-subtext");
  if (treatDisease == "true" && treatInjuries == "true") {
    const value = document.createElement("span");
    value.classList.add("value-above-subtext");
    value.innerHTML = "Treats diseases and injuries";
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("div-with-subtext");
    finalDiv.appendChild(value);
    treatsDiv.appendChild(finalDiv);
  } else if (treatDisease == "false" && treatInjuries == "true") {
    const value = document.createElement("span");
    value.classList.add("value-above-subtext");
    value.innerHTML = "Treats injuries only";
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("div-with-subtext");
    finalDiv.appendChild(value);
    treatsDiv.appendChild(finalDiv);
  } else if (treatDisease == "true" && treatInjuries == "false") {
    const value = document.createElement("span");
    value.classList.add("value-above-subtext");
    value.innerHTML = "Treats diseases only";
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("div-with-subtext");
    finalDiv.appendChild(value);
    treatsDiv.appendChild(finalDiv);
  }

  if (treatsDiv.children.length > 0) {
    treatsDiv.style.gridTemplateColumns = `repeat(1, 1fr)`;
    mainDiv.appendChild(treatsDiv);
  }

  return mainDiv;
}

function processLeisureProviderComp() {
  const efficiency = comp_leisureProvider.efficiency;
  const resource = comp_leisureProvider.resource;
  const type = comp_leisureProvider.type;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (efficiency != 0) {
    makeSubTextDiv("Efficiency", efficiency, div);
    count++;
  }

  if (resource != 0) {
    makeSubTextDiv("Resource", resource, div);
    count++;
  }

  if (type != 0) {
    makeSubTextDiv("Leisure Type", enumLeisureType(type), div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processParkComp() {
  const maintenance = comp_park.maintenance;
  const homeless = comp_park.homeless;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (maintenance != 0) {
    makeSubTextDiv("Maintenance Pool", maintenance, div);
    count++;
  }

  if (homeless == "true") {
    makeSubTextDiv("", "Homeless Shelter", div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processPlacableObjectComp() {
  const cost = comp_placableObject.cost;
  const xp = comp_placableObject.xp;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (cost != 0) {
    makeSubTextDiv("Cost", cost, div);
    count++;
  }

  if (xp != 0) {
    makeSubTextDiv("XP", xp, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processPoliceStationComp() {
  const patrol = comp_police.patrol;
  const helicopter = comp_police.helicopter;
  const jail = comp_police.jail;
  const purpose = comp_police.purpose;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (patrol != 0) {
    makeSubTextDiv(pluralize("Police Car",parseInt(patrol)), patrol, div);
    count++;
  }
  
  if (helicopter != 0) {
    makeSubTextDiv(pluralize("Helicopter",parseInt(helicopter)), helicopter, div);
    count++;
  }
  
  if (jail != 0) {
    makeSubTextDiv("Jail Capacity", jail, div);
    count++;
  }
  
  if (purpose!= 0) {
    makeSubTextDiv("Purpose", getPolicePurposes(purpose).join('\n \n'), div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processPollutionComp() {
  const ground = comp_pollution.ground;
  const air = comp_pollution.air;
  const noise = comp_pollution.noise;
  const scale = comp_pollution.scale;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  if (ground != 0 || air != 0 || noise != 0) {
    const div = document.createElement("div");
    div.classList.add("parent-div-with-subtext");
    let count = 0;
    if (ground != 0) {
      makeSubTextDiv("Ground", ground, div);
      count++;
    }

    if (air != 0) {
      makeSubTextDiv("Air", air, div);
      count++;
    }

    if (noise != 0) {
      makeSubTextDiv("Noise", noise, div);
      count++;
    }

    div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    mainDiv.appendChild(div);
  }

  if (scale == "true") {
    const scalesDiv = document.createElement("div");
    scalesDiv.classList.add("parent-div-with-subtext");
    const value = document.createElement("span");
    value.classList.add("value-above-subtext");
    value.innerHTML = "Scales with Usage";
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("div-with-subtext");
    finalDiv.appendChild(value);
    scalesDiv.appendChild(finalDiv);
    scalesDiv.style.gridTemplateColumns = `repeat(1, 1fr)`;
    mainDiv.appendChild(scalesDiv);
  }

  return mainDiv;
}

function processPrisonComp() {
  const van = comp_prison.van;
  const prisoner = comp_prison.prisoner;
  const wellbeing = comp_prison.wellbeing;
  const health = comp_prison.health;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (van != 0) {
    makeSubTextDiv(pluralize("Van",parseInt(van)), van, div);
    count++;
  }
  
  if (prisoner != 0) {
    makeSubTextDiv("Prisoner Capacity", prisoner, div);
    count++;
  }
  
  if (wellbeing != 0) {
    makeSubTextDiv("Wellbeing Bonus", wellbeing, div);
    count++;
  }
  
  if (health != 0) {
    makeSubTextDiv("Health Bonus", health, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processProduction() {
  const power = production.power;
  const garbageUnit = production.garbageUnit;
  const garbageCapacity = production.garbageCapacity;
  const groundWaterProduction = production.groundWaterProduction;
  const groundWaterCapacity = production.groundWaterCapacity;
  const solarProduction = production.solarProduction;
  const windSpeed = production.windSpeed;
  const windProduction = production.windProduction;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (power != 0) {
    makeSubTextDiv("Electricity", power, div);
    count++;
  }
  
  if (garbageUnit != 0 && garbageUnit != undefined) {
    makeSubTextDiv("Electricity per Garbage Unit", garbageUnit, div);
    count++;
  }
  
  if (garbageCapacity != 0 && garbageCapacity != undefined) {
    makeSubTextDiv("Garbage Capacity", garbageCapacity, div);
    count++;
  }
  
  if (groundWaterProduction != 0 && groundWaterProduction != undefined) {
    makeSubTextDiv("Electricity", groundWaterProduction, div);
    count++;
  }
  
  if (groundWaterCapacity != 0 && groundWaterCapacity != undefined) {
    makeSubTextDiv("Maximum Ground Water", groundWaterCapacity, div);
    count++;
  }
  
  if (windSpeed != 0 && windSpeed != undefined) {
    makeSubTextDiv("Wind Speed", windSpeed, div);
    count++;
  }
  
  if (windProduction != 0 && windProduction != undefined) {
    makeSubTextDiv("Electricity", windProduction, div);
    count++;
  }
  
  if (solarProduction != 0 && solarProduction != undefined) {
    makeSubTextDiv("Electricity", solarProduction, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processPostComp() {
  const van = comp_post.van;
  const truck = comp_post.truck;
  const storage = comp_post.storage;
  const box = comp_post.box;
  const sort = comp_post.sort;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (van != 0) {
    makeSubTextDiv("Post Van", van, div);
    count++;
  }

  if (truck != 0) {
    makeSubTextDiv("Post Truck", truck, div);
    count++;
  }

  if (storage != 0) {
    makeSubTextDiv("Mail Storage Capacity", storage, div);
    count++;
  }

  if (box != 0) {
    makeSubTextDiv("Mail Box Capacity", box, div);
    count++;
  }

  if (sort != 0) {
    makeSubTextDiv("Sorting Rate", sort, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processSchoolComp() {
  const capacity = comp_school.capacity;
  const level = comp_school.level;
  const gradModifier = comp_school.gradModifier;
  const wellbeing = comp_school.wellbeing;
  const health = comp_school.health;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (capacity != 0) {
    makeSubTextDiv("Capacity", capacity, div);
    count++;
  }

  if (level != 0) {
    makeSubTextDiv("School Type", enumSchoolType(level), div);
    count++;
  }

  if (gradModifier != 0) {
    makeSubTextDiv("Graduation Modifier", gradModifier, div);
    count++;
  }

  if (wellbeing != 0) {
    makeSubTextDiv("Student Wellbeing", wellbeing, div);
    count++;
  }

  if (health != 0) {
    makeSubTextDiv("Student Health", health, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processServiceCoverageComp() {
  const range = comp_serviceCoverage.range;
  const capacity = comp_serviceCoverage.capacity;
  const magnitude = comp_serviceCoverage.magnitude;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (range != 0) {
    makeSubTextDiv("Range", range, div);
    count++;
  }

  if (capacity != 0) {
    makeSubTextDiv("Capacity", capacity, div);
    count++;
  }

  if (magnitude != 0) {
    makeSubTextDiv("Magnitude", magnitude, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processServiceConsumptionComp() {
  const upkeep = comp_serviceConsumption.upkeep;
  const electricity = comp_serviceConsumption.electricity;
  const water = comp_serviceConsumption.water;
  const garbage = comp_serviceConsumption.garbage;
  const telecom = comp_serviceConsumption.telecom;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (upkeep != 0) {
    makeSubTextDiv("Upkeep", upkeep, div);
    count++;
  }

  if (electricity != 0) {
    makeSubTextDiv("Electricity", electricity, div);
    count++;
  }

  if (water != 0) {
    makeSubTextDiv("Water", water, div);
    count++;
  }

  if (garbage != 0) {
    makeSubTextDiv("Garbage", garbage, div);
    count++;
  }

  if (telecom != 0) {
    makeSubTextDiv("Telecom", telecom, div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processShorelineObjectComp() {
  const offset = comp_shoreline.offset;
  const dryland = comp_shoreline.dryland;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;
  if (offset != 0) {
    makeSubTextDiv("Shoreline Offset", offset, div);
    count++;
  }
  
  if (dryland == "true") {
    makeSubTextDiv("", "Dry Land Allowed", div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processTelecomComp() {
  const range = comp_telecom.range;
  const capacity = comp_telecom.capacity;
  const satellite = comp_telecom.satellite;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;

  if (range != 0) {
    makeSubTextDiv("Range", range, div);
    count++;
  }

  if (capacity != 0) {
    makeSubTextDiv("Network Capacity", capacity, div);
    count++;
  }

  if (satellite == "true") {
    makeSubTextDiv("", "Unobstructed by Terrain", div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processWaterPumpComp() {
  const capacity = comp_waterPump.capacity;
  const purification = comp_waterPump.purification;
  const type = comp_waterPump.type;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");
  let count = 0;

  if (capacity != 0) {
    makeSubTextDiv("Capacity", capacity, div);
    count++;
  }

  if (purification != 0) {
    makeSubTextDiv("Purification", purification, div);
    count++;
  }

  if (type != 0) {
    makeSubTextDiv("Type", enumAllowedWaterTypes(type), div);
    count++;
  }

  div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function processWorkplaceComp() {
  const workplaces = comp_workplace.workplaces;
  const complexity = comp_workplace.complexity;
  const eveningProb = comp_workplace.eveningProb;
  const nightProb = comp_workplace.nightProb;

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");

  if (workplaces != 0 || complexity != 0) {
    const div = document.createElement("div");
    div.classList.add("parent-div-with-subtext");
    let count = 0;

    if (workplaces != 0) {
      makeSubTextDiv("Workplaces", workplaces, div);
      count++;
    }

    if (complexity != 0) {
      makeSubTextDiv("Complexity", complexity, div);
      count++;
    }

    div.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    mainDiv.appendChild(div);
  }

  const div = document.createElement("div");
  div.classList.add("parent-div-with-subtext");

  makeSubTextDiv("Evening Shift Probability", floatToPercent(eveningProb), div);
  makeSubTextDiv("Night Shift Probability", floatToPercent(nightProb), div);

  div.style.gridTemplateColumns = `repeat(2, 1fr)`;
  mainDiv.appendChild(div);

  return mainDiv;
}

function createResourceUseTable(resourceData, version = 1) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  mainDiv.id = "resource-use-table";
  resourceData.forEach((resource) => {
    // const div = document.createElement("div");
    const divIcon = document.createElement("div");
    const divRes = document.createElement("div");
    const divAmount = document.createElement("div");
    const divType = document.createElement("div");

    if (resource[0] === "Any") {
      divRes.innerHTML = "Anything";
      divIcon.innerHTML = `<img class="resource-icon" src="${imageBasePath}/cities2/Media/Game/Icons/ZoneIndustrialWarehouses.svg"></img>`;
    } else {
      divRes.innerHTML = enumResourceInEditor(resource[0]);
      divIcon.innerHTML = `<img class="resource-icon" src="${imageBasePath}/cities2/Media/Game/Resources/${divRes.innerHTML}.svg"></img>`;
    }

    if (resource[0] === "Any") {
      divIcon.classList.add("storage");
      divRes.classList.add("storage");
      divAmount.classList.add("storage");
      divType.classList.add("storage");
    } else if (resource[2] === "Initial") {
      divIcon.classList.add("init");
      divRes.classList.add("init");
      divAmount.classList.add("init");
      divType.classList.add("init");
    }
    divAmount.innerHTML = resource[1];
    divType.innerHTML = resource[2];
    if (version == 2) {
      divIcon.classList.add("production");
      divRes.classList.add("production");
      divAmount.classList.add("production");
      divType.classList.add("production");
      divAmount.innerHTML += " <small>Rate</small>";
      divType.innerHTML += " <small>Cap</small>";
    }

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

function rangeXYslider(x, y, units = null, preUnit = false) {
  const rangeSlider = document.createElement("div");
  rangeSlider.classList.add("range-slider");

  const rangeBar = document.createElement("div");
  rangeBar.classList.add("range-bar");

  rangeBar.innerHTML = rangeXY(x, y, units, preUnit);

  const minValue = 0;
  const maxValue = 100;
  const startPercentage = ((x - minValue) / (maxValue - minValue)) * 100;
  const endPercentage = ((y - minValue) / (maxValue - minValue)) * 100;

  rangeBar.style.left = `${startPercentage}%`;
  rangeBar.style.width = `${endPercentage - startPercentage}%`;

  rangeSlider.appendChild(rangeBar);
  return rangeSlider;
}

function rangeXY(x, y, units = null, preUnit = false) {
  if (units == null) {
    return `${x}% to ${y}%`;
  }
  if (preUnit == true) {
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

function enumLeisureType(id) {
  data = [
    "Meals",
    "Entertainment",
    "Commercials",
    "City Indoors",
    "Travel",
    "City Park",
    "City Beach",
    "Attractions",
    "Relaxations",
    "Sightseeing",
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

function enumSchoolType(id) {
  data = [
    "Elementary",
    "High School",
    "College",
    "University",
  ];
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

function sanitizeValueText(valueText) {
  if ((typeof valueText === "number") || (typeof valueText === "string" && /^\d+$/.test(valueText))) {
    return Number(valueText).toLocaleString();
  }
  return valueText;
}

function sanitizeArray(array, separator = "<br/>") {
  return array
    .filter((item) => item !== undefined && item !== "")
    .join(separator);
}

function getGUID(text) {
  let removedText = Array.isArray(text) ? text.join(",") : text;
  removedText = text
    .replaceAll("[", "")
    .replaceAll("]","")
    .replaceAll("$fstrref:UnityGUID:", "")
    .replaceAll("$fstrref:CID:", "");
  
  splittedText = removedText.split(",");
  returnText = [];

  splittedText.forEach(key  => {
    const result = guidList.find(obj => obj.hasOwnProperty(key));
    if (result) {
      returnText.push({
        name: result[key]['name'],
        type: result[key]['type']
      });
    } else {
      returnText.push({
        name: key,
        type: "Unknown Type"
      });
    }
  })
  return returnText;
}

function getSl(key) {
  return key;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function isEmptyArray(array) {
  if (array === undefined) {
    return true;
  }
  return array.length === 0;
}

window.processAssetPanelUIData = processAssetPanelUIData;
