const pluralize = require("pluralize");

const guidList = [
  // { "c3724de73723f5b4ab589dd1fa756861": { name: "Landmark DLC", category: "DLC" } },
  // { "fd4f0cd1f9d0ecb4eb6617a5dfa0cdf6": { name: "Commercial Bar", category: "Company" } },
  // { "5c720b3dca56ad24a8575622fc1f3288": { name: "Commercial Food Store", category: "Company" } },
  // { "f18970a35e902c14982fb42e04534ad1": { name: "Commercial Hotel", category: "Company" } },
  // { "b018f3987d5d8284db0ecc1f153beae6": { name: "Commercial Liquor Store", category: "Company" } },
  // { "1b916563a0c8b0f40be97d75e3c8857b": { name: "Commercial Restaurant", category: "Company" } },
  // { "5c1f656a5ea20284197a71e4997b4187": { name: "Parks and Recreation", category: "Service" } },
  // { "846c60044f7ead04d9b11f0d749ea5f2": { name: "European", category: "Theme"} },
  // { "6f24f89d231e81043b538ce3fb2b54ae": { name: "North American", category: "Theme"} },
]; 

let tags = [];
let notifications = [];

let adprb;
let doneArray = [];

async function processAssetPanelUIData(d, containers) {
  adprb = containers[0];
  let tagContainer = containers[1];
  let notifContainer = containers[2];

  const detailsArray = Object.entries(d);

  tags = [];
  notifications = [];
  doneArray = [];

  const tempRight = document.getElementById("temp-right");
  tempRight.innerHTML = "";


  detailsArray.forEach(([key, value]) => {
    if (1 != 1) {
    } else if (key == "AdministrationBuilding") {
      tags.push({ name: "Administration Building", type: "Class" });
      doneArray.push(key);
    } else if (key == "FirewatchTower") {
      tags.push({ name: "Firewatch Tower", type: "Class" });
      doneArray.push(key);
    } else if (key == "ResearchFacility") {
      tags.push({ name: "Research Facility", type: "Class" });
      doneArray.push(key);
    } else if (key == "ServiceFeeCollector") {
      tags.push({ name: "Service Fee Collector", type: "Class" });
      doneArray.push(key);
    } else if (key == "Transformer") {
      tags.push({ name: "Transformer", type: "Class" });
      doneArray.push(key);
    } else if (key == "Unique") {
      tags.push({ name: "Unique Object", type: "Class" });
      doneArray.push(key);
    } else if (key == "WelfareOffice") {
      tags.push({ name: "Welfare Office", type: "Class" });
      doneArray.push(key);
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

  if (d.PrefabID.startsWith("ZonePrefab:")) {
    const bldgs = await getZoneBuildings(d.PrefabID);
    if (bldgs.length > 0) {
      await processBldg(bldgs);
    }
  }

  if (d.PrefabID.startsWith("BuildingPrefab:")) {
    const bldgs = await getBuildingUpgrades(d.PrefabID);
    if (bldgs.length > 0) {
      await processUpgrades(bldgs);
    }
  }

  data_Buildings = {
    Building_Width: d.Building_Width,
    Building_Depth: d.Building_Depth,
    Building_Access: d.Building_Access,
    PlaceableObject_Construction: d.PlaceableObject_Construction,
    PlaceableObject_XP: d.PlaceableObject_XP,
    BuildingProp_ResiProp: d.BuildingProp_ResiProp,
    BuildingProp_SpaceMultiplier: d.BuildingProp_SpaceMultiplier,
    PlaceholderBuilding_Type: d.PlaceholderBuilding_Type,
    PlaceholderBuilding_Zone: d.PlaceholderBuilding_Zone,
    SpawnableBuilding_Zone: d.SpawnableBuilding_Zone,
    SpawnableBuilding_Level: d.SpawnableBuilding_Level,
    SignatureBuilding_Zone: d.SignatureBuilding_Zone,
    SignatureBuilding_XP: d.SignatureBuilding_XP,
    SignatureBuilding_UnlockImage: d.SignatureBuilding_UnlockImage,
    BuildingExtension_External: d.BuildingExtension_External,
    BuildingExtension_Pos: d.BuildingExtension_Pos,
    BuildingExtension_Lot: d.BuildingExtension_Lot,
    BuildingExtension_Height: d.BuildingExtension_Height,
    ServiceUpgrade_Buildings: d.ServiceUpgrade_Buildings,
    ServiceUpgrade_Cost: d.ServiceUpgrade_Cost,
    ServiceUpgrade_XP: d.ServiceUpgrade_XP,
    ServiceUpgrade_MaxOffset: d.ServiceUpgrade_MaxOffset,
    ServiceUpgrade_MaxDistance: d.ServiceUpgrade_MaxDistance,
  }
  await processData(data_Buildings, "Building Data");
  
  data_Network = {
    PlaceableNet_Elevation: d.PlaceableNet_Elevation,
    PlaceableNet_AllowParallel: d.PlaceableNet_AllowParallel,
    PlaceableNet_Underground: d.PlaceableNet_Underground,
    PlaceableNet_XP: d.PlaceableNet_XP,
    Road_MaxSlopeSteepness: d.Road_MaxSlopeSteepness,
    Road_AggregateType: d.Road_AggregateType,
    Road_InvertMode: d.Road_InvertMode,
    Road_RoadType: d.Road_RoadType,
    Road_SpeedLimit: d.Road_SpeedLimit,
    Road_ZoneBlock: d.Road_ZoneBlock,
    Road_TrafficLights: d.Road_TrafficLights,
    Road_HighwayRules: d.Road_HighwayRules,
    Bridge_SegmentLength: d.Bridge_SegmentLength,
    Bridge_Hanging: d.Bridge_Hanging,
    Bridge_WaterFlow: d.Bridge_WaterFlow,
    Bridge_FixedSegments: d.Bridge_FixedSegments,
    Track_MaxSlopeSteepness: d.Track_MaxSlopeSteepness,
    Track_AggregateType: d.Track_AggregateType,
    Track_InvertMode: d.Track_InvertMode,
    Track_TrackType: d.Track_TrackType,
    Track_SpeedLimit: d.Track_SpeedLimit,
    Waterway_MaxSlopeSteepness: d.Waterway_MaxSlopeSteepness,
    Waterway_AggregateType: d.Waterway_AggregateType,
    Waterway_InvertMode: d.Waterway_InvertMode,
    Waterway_SpeedLimit: d.Waterway_SpeedLimit,
    NetUpgrade_SetState: d.NetUpgrade_SetState,
    NetUpgrade_UnsetState: d.NetUpgrade_UnsetState,
    NetUpgrade_Standalone: d.NetUpgrade_Standalone,
    NetUpgrade_Underground: d.NetUpgrade_Underground,
  }
  await processData(data_Network, "Network Data");

  if (d.Zone_Office) {
    d.Zone_AreaType = "Office";
  }
  doneArray.push("Zone_Office");
  data_Zones = {
    Zone_AreaType: d.Zone_AreaType,
    Zone_Color: d.Zone_Color,
    Zone_Edge: d.Zone_Edge,
    Zone_ScaleResi: d.Zone_ScaleResi,
    Zone_ResiProperties: d.Zone_ResiProperties,
    Zone_SpaceMultiplier: d.Zone_SpaceMultiplier,
  }
  await processData(data_Zones, "Zone Data");

  data_Areas = {
    District_Color: d.District_Color,
    District_EdgeColor: d.District_EdgeColor,
    District_SelectionColor: d.District_SelectionColor,
    District_SelectionEdgeColor: d.District_SelectionEdgeColor,
    District_NameColor: d.District_NameColor,
    District_SelectedNameColor: d.District_SelectedNameColor,
    Lot_Color: d.Lot_Color,
    Lot_EdgeColor: d.Lot_EdgeColor,
    Lot_SelectionColor: d.Lot_SelectionColor,
    Lot_SelectionEdgeColor: d.Lot_SelectionEdgeColor,
    Lot_MaxRadius: d.Lot_MaxRadius,
    Lot_RangeColor: d.Lot_RangeColor,
    Surface_Color: d.Surface_Color,
    Surface_EdgeColor: d.Surface_EdgeColor,
    Surface_SelectionColor: d.Surface_SelectionColor,
    Surface_SelectionEdgeColor: d.Surface_SelectionEdgeColor,
    EnclosedArea_BorderLaneType: d.EnclosedArea_BorderLaneType,
    EnclosedArea_CounterClockWise: d.EnclosedArea_CounterClockWise,
    NavigationArea_Connection: d.NavigationArea_Connection,
    NavigationArea_Secondary: d.NavigationArea_Secondary,
    NavigationArea_Track: d.NavigationArea_Track,
    NavigationArea_Road: d.NavigationArea_Road,
    StorageArea_Resources: d.StorageArea_Resources,
    StorageArea_Cap: d.StorageArea_Cap,
    TerrainArea_Height: d.TerrainArea_Height,
    TerrainArea_Width: d.TerrainArea_Width,
    TerrainArea_NoiseScale: d.TerrainArea_NoiseScale,
    TerrainArea_NoiseFactor: d.TerrainArea_NoiseFactor,
    SpawnableArea_Placeholders: d.SpawnableArea_Placeholders,
    SpawnableArea_Probability: d.SpawnableArea_Probability,
  }
  await processData(data_Areas, "Area Data");

  data_Stamps = {
    AssetStamp_Width: d.AssetStamp_Width,
    AssetStamp_Depth: d.AssetStamp_Depth,
    AssetStamp_Cost: d.AssetStamp_Cost,
    AssetStamp_Upkeep: d.AssetStamp_Upkeep,
  }
  await processData(data_Stamps, "Stamp Data");

  data_Objects = {
    SpawnableObject_Placeholders: d.SpawnableObject_Placeholders,
    SpawnableObject_Probability: d.SpawnableObject_Probability,
    SpawnableObject_RandomizationGroup: d.SpawnableObject_RandomizationGroup,
    PlaceholderObject_RandGroupIndex: d.PlaceholderObject_RandGroupIndex,
    SubObject_DefaultProbability: d.SubObject_DefaultProbability,
    SubObject_RotationSymmetry: d.SubObject_RotationSymmetry,
    AttachedObject_Type: d.AttachedObject_Type,
    AttachedObject_Offset: d.AttachedObject_Offset,
    QuantityObject_Resources: d.QuantityObject_Resources,
    QuantityObject_Map: d.QuantityObject_Map,
    TreeObject_Wood: d.TreeObject_Wood,
    PlantObject_PotCoverage: d.PlantObject_PotCoverage,
    PlantObject_TreeReplace: d.PlantObject_TreeReplace,
    StandingObject_LegSize: d.StandingObject_LegSize,
    StandingObject_Circular: d.StandingObject_Circular,
    Floating_Offset: d.Floating_Offset,
    Floating_FixedBottom: d.Floating_FixedBottom,
    Floating_AllowDryLand: d.Floating_AllowDryLand,
    ShorelineObject_Offset: d.ShorelineObject_Offset,
    ShorelineObject_AllowDry: d.ShorelineObject_AllowDry,
    Underwater_AllowDryland: d.Underwater_AllowDryland,
    Weather_RequireSnow: d.Weather_RequireSnow,
    Weather_ForbidSnow: d.Weather_ForbidSnow,
    NetObject_SetComp: d.NetObject_SetComp,
    NetObject_RequireRoad: d.NetObject_RequireRoad,
    NetObject_RoadPassThrough: d.NetObject_RoadPassThrough,
    NetObject_TrackPassThrough: d.NetObject_TrackPassThrough,
    CompanyObj_Select: d.CompanyObj_Select,
    CompanyObj_Companies: d.CompanyObj_Companies,
    RenterObject_ReqEmpty: d.RenterObject_ReqEmpty,
    RenterObject_ReqRenter: d.RenterObject_ReqRenter,
    RenterObject_ReqWealth: d.RenterObject_ReqWealth,
    RenterObject_ReqDogs: d.RenterObject_ReqDogs,
    RenterObject_ReqHomeless: d.RenterObject_ReqHomeless,
    RenterObject_ReqChildren: d.RenterObject_ReqChildren,
    RenterObject_ReqTeens: d.RenterObject_ReqTeens,
  }
  await processData(data_Objects, "Object Data");

  data_Milestone = {
    ManualUnlockable: d.ManualUnlockable,
    Milestone_Index: d.Milestone_Index,
    Milestone_Reward: d.Milestone_Reward,
    Milestone_DevTree: d.Milestone_DevTree,
    Milestone_MapTiles: d.Milestone_MapTiles,
    Milestone_LoanLimit: d.Milestone_LoanLimit,
    Milestone_XP: d.Milestone_XP,
    Milestone_Major: d.Milestone_Major,
    Milestone_Image: d.Milestone_Image,
    Milestone_BgColor: d.Milestone_BgColor,
    Milestone_AccentColor: d.Milestone_AccentColor,
    Milestone_TextColor: d.Milestone_TextColor,
  }
  await processData(data_Milestone, "Milestone Data");

  data_Resource = {
    InitResources: d.InitResources,
    CityServiceUpkeep: d.CityServiceUpkeep,
    BuildingProp_Sold: d.BuildingProp_Sold,
    BuildingProp_Manufactured: d.BuildingProp_Manufactured,
    BuildingProp_Stored: d.BuildingProp_Stored,
    Zone_Sold: d.Zone_Sold,
    Zone_Manufactured: d.Zone_Manufactured,
    Zone_Stored: d.Zone_Stored,
    ResourceProducer: d.ResourceProducer,
    StorageLimit: d.StorageLimit,
    Resource_NoNotif: d.Resource_NoNotif
  }
  await processData(data_Resource, "Resource Data");

  data_ServiceConsumption = {
    ServiceConsumption_Upkeep: d.ServiceConsumption_Upkeep,
    ServiceConsumption_Power: d.ServiceConsumption_Power,
    ServiceConsumption_Water: d.ServiceConsumption_Water,
    ServiceConsumption_Garbage: d.ServiceConsumption_Garbage,
    ServiceConsumption_Telecom: d.ServiceConsumption_Telecom,
    Destructible_FireHazard: d.Destructible_FireHazard,
    Destructible_Integrity: d.Destructible_Integrity,
    Zone_Upkeep: d.Zone_Upkeep,
    Zone_Power: d.Zone_Power,
    Zone_Water: d.Zone_Water,
    Zone_Garbage: d.Zone_Garbage,
    Zone_Telecom: d.Zone_Telecom,
    Zone_FireHazard: d.Zone_FireHazard,
    CrimeRate: d.CrimeRate,
    Mail_ReqCollect: d.Mail_ReqCollect,
    Mail_SendingRate: d.Mail_SendingRate,
    Mail_ReceivingRate: d.Mail_ReceivingRate,
  }
  await processData(data_ServiceConsumption, "Service Consumption Data");

  data_ServiceProvider = {
    ServiceObject: d.ServiceObject,
    ServiceCoverage_Range: d.ServiceCoverage_Range,
    ServiceCoverage_Cap: d.ServiceCoverage_Cap,
    ServiceCoverage_Magnitude: d.ServiceCoverage_Magnitude,
    ParkingFacility_Comfort: d.ParkingFacility_Comfort,
    ParkingFacility_GarageCap: d.ParkingFacility_GarageCap,
    MaintenanceDepot_Type: d.MaintenanceDepot_Type,
    MaintenanceDepot_VehicleCap: d.MaintenanceDepot_VehicleCap,
    MaintenanceDepot_VehicleEfficiency: d.MaintenanceDepot_VehicleEfficiency,
    PowerPlant_Prod: d.PowerPlant_Prod,
    WindPowered_MaxWind: d.WindPowered_MaxWind,
    WindPowered_Prod: d.WindPowered_Prod,
    GroundWaterPowered_Prod: d.GroundWaterPowered_Prod,
    GroundWaterPowered_MaxGround: d.GroundWaterPowered_MaxGround,
    GarbagePowered_Prod: d.GarbagePowered_Prod,
    GarbagePowered_Cap: d.GarbagePowered_Cap,
    SolarPowered_Prod: d.SolarPowered_Prod,
    Battery_Output: d.Battery_Output,
    Battery_Cap: d.Battery_Cap,
    Electricity_Voltage: d.Electricity_Voltage,
    Electricity_Direction: d.Electricity_Direction,
    Electricity_Cap: d.Electricity_Cap,
    WaterPump_Cap: d.WaterPump_Cap,
    WaterPump_Purify: d.WaterPump_Purify,
    WaterPump_Allowed: d.WaterPump_Allowed,
    SewageOutlet_Cap: d.SewageOutlet_Cap,
    SewageOutlet_Purification: d.SewageOutlet_Purification,
    SewageOutlet_AllowSubmerged: d.SewageOutlet_AllowSubmerged,
    WaterPipe_Fresh: d.WaterPipe_Fresh,
    WaterPipe_Sewage: d.WaterPipe_Sewage,
    WaterPipe_Storm: d.WaterPipe_Storm,
    Hospital_AmbuCap: d.Hospital_AmbuCap,
    Hospital_HeliCap: d.Hospital_HeliCap,
    Hospital_PatientCap: d.Hospital_PatientCap,
    Hospital_TreatmentBonus: d.Hospital_TreatmentBonus,
    Hospital_HealthRange: d.Hospital_HealthRange,
    Hospital_TreatDiseases: d.Hospital_TreatDiseases,
    Hospital_TreatInjuries: d.Hospital_TreatInjuries,
    Deathcare_Hearse: d.Deathcare_Hearse,
    Deathcare_Storage: d.Deathcare_Storage,
    Deathcare_ProcessingRate: d.Deathcare_ProcessingRate,
    Deathcare_LongTerm: d.Deathcare_LongTerm,
    GarbageFacility_GarbageCap: d.GarbageFacility_GarbageCap,
    GarbageFacility_VehicleCap: d.GarbageFacility_VehicleCap,
    GarbageFacility_TransportCap: d.GarbageFacility_TransportCap,
    GarbageFacility_Speed: d.GarbageFacility_Speed,
    GarbageFacility_Industrial: d.GarbageFacility_Industrial,
    GarbageFacility_LongTerm: d.GarbageFacility_LongTerm,
    School_Cap: d.School_Cap,
    School_Level: d.School_Level,
    School_GradModifier: d.School_GradModifier,
    School_Wellbeing: d.School_Wellbeing,
    School_Health: d.School_Health,
    FireStation_EngineCap: d.FireStation_EngineCap,
    FireStation_HeliCap: d.FireStation_HeliCap,
    FireStation_ResponseCap: d.FireStation_ResponseCap,
    FireStation_VehicleEff: d.FireStation_VehicleEff,
    Shelter_Cap: d.Shelter_Cap,
    Shelter_Vehicle: d.Shelter_Vehicle,
    DisasterFacility: d.DisasterFacility,
    EarlyDisasterWarningSystem: d.EarlyDisasterWarningSystem,
    PoliceStation_CarCap: d.PoliceStation_CarCap,
    PoliceStation_HeliCap: d.PoliceStation_HeliCap,
    PoliceStation_JailCap: d.PoliceStation_JailCap,
    PoliceStation_Purpose: d.PoliceStation_Purpose,
    Prison_VanCap: d.Prison_VanCap,
    Prison_JailCap: d.Prison_JailCap,
    Prison_Wellbeing: d.Prison_Wellbeing,
    Prison_Health: d.Prison_Health,
    TransportDepot_Type: d.TransportDepot_Type,
    TransportDepot_Energy: d.TransportDepot_Energy,
    TransportDepot_Cap: d.TransportDepot_Cap,
    TransportDepot_ProdTime: d.TransportDepot_ProdTime,
    TransportDepot_MaintenanceTime: d.TransportDepot_MaintenanceTime,
    TransportDepot_DispatchCenter: d.TransportDepot_DispatchCenter,
    TransportStation_CarFuel: d.TransportStation_CarFuel,
    TransportStation_TrainFuel: d.TransportStation_TrainFuel,
    TransportStation_WaterFuel: d.TransportStation_WaterFuel,
    TransportStation_AirFuel: d.TransportStation_AirFuel,
    TransportStation_Comfort: d.TransportStation_Comfort,
    TransportStop_Type: d.TransportStop_Type,
    TransportStop_AccessConnection: d.TransportStop_AccessConnection,
    TransportStop_RouteConnection: d.TransportStop_RouteConnection,
    TransportStop_AccessTrack: d.TransportStop_AccessTrack,
    TransportStop_RouteTrack: d.TransportStop_RouteTrack,
    TransportStop_AccessRoad: d.TransportStop_AccessRoad,
    TransportStop_RouteRoad: d.TransportStop_RouteRoad,
    TransportStop_EnterDistance: d.TransportStop_EnterDistance,
    TransportStop_ExitDistance: d.TransportStop_ExitDistance,
    TransportStop_AccessDistance: d.TransportStop_AccessDistance,
    TransportStop_BoardingTime: d.TransportStop_BoardingTime,
    TransportStop_Comfort: d.TransportStop_Comfort,
    TransportStop_Loading: d.TransportStop_Loading,
    TransportStop_Passenger: d.TransportStop_Passenger,
    TransportStop_Cargo: d.TransportStop_Cargo,
    CargoStation_Resources: d.CargoStation_Resources,
    CargoStation_CarFuel: d.CargoStation_CarFuel,
    CargoStation_TrainFuel: d.CargoStation_TrainFuel,
    CargoStation_WaterFuel: d.CargoStation_WaterFuel,
    CargoStation_AirFuel: d.CargoStation_AirFuel,
    CargoStation_LoadingFactor: d.CargoStation_LoadingFactor,
    CargoStation_TransportInterval: d.CargoStation_TransportInterval,
    Attractiveness: d.Attractiveness,
    Leisure_Efficiency: d.Leisure_Efficiency,
    Leisure_Resources: d.Leisure_Resources,
    Leisure_Type: d.Leisure_Type,
    Park_MaintenancePool: d.Park_MaintenancePool,
    Park_AllowHomeless: d.Park_AllowHomeless,
    MailBox_Cap: d.MailBox_Cap,
    MailBox_Comfort: d.MailBox_Comfort,
    PostFacility_VanCap: d.PostFacility_VanCap,
    PostFacility_TruckCap: d.PostFacility_TruckCap,
    PostFacility_StorageCap: d.PostFacility_StorageCap,
    PostFacility_BoxCap: d.PostFacility_BoxCap,
    PostFacility_SortingRate: d.PostFacility_SortingRate,
    TelecomFacility_Range: d.TelecomFacility_Range,
    TelecomFacility_NetworkCap: d.TelecomFacility_NetworkCap,
    TelecomFacility_PenetrateTerrain: d.TelecomFacility_PenetrateTerrain,
    LocalEffects: d.LocalEffects,
    CityEffects: d.CityEffects,
  }
  await processData(data_ServiceProvider, "Service Provider Data");

  data_Workplace = {
    Work_Places: d.Work_Places,
    Work_Min: d.Work_Min,
    Work_Complexity: d.Work_Complexity,
    Work_EveningProb: d.Work_EveningProb,
    Work_NightProb: d.Work_NightProb,
  }
  await processData(data_Workplace, "Workplace Data");

  data_Activity = {
    // ActivityLocation_Locations: d.ActivityLocation_Locations,
    ActivityLocation_AnimatedProp: d.ActivityLocation_AnimatedProp,
    ActivityLocation_InvertWhen: d.ActivityLocation_InvertWhen,
    ActivityLocation_RequireAuthorization: d.ActivityLocation_RequireAuthorization,
  }
  doneArray.push("ActivityLocation_Locations");
  await processData(data_Activity, "Activity Data");

  data_Pollution = {
    Pollution_Ground: d.Pollution_Ground,
    Pollution_Air: d.Pollution_Air,
    Pollution_Noise: d.Pollution_Noise,
    Pollution_Scale: d.Pollution_Scale,
    Zone_GroundPollution: d.Zone_GroundPollution,
    Zone_AirPollution: d.Zone_AirPollution,
    Zone_NoisePollution: d.Zone_NoisePollution,
    NetPollution_Noise: d.NetPollution_Noise,
    NetPollution_Air: d.NetPollution_Air
  }
  await processData(data_Pollution, "Pollution Data");

  data_Requirement = {
    ContentPrereq: d.ContentPrereq,
    ThemeObject: d.ThemeObject,
    Unlock_All: d.Unlock_All,
    Unlock_Any: d.Unlock_Any,
    UnlockOnBuild: d.UnlockOnBuild,
    Unlock_IgnoreDep: d.Unlock_IgnoreDep,
    Electricity_RequireAll: d.Electricity_RequireAll,
    Electricity_RequireAny: d.Electricity_RequireAny,
    Electricity_RequireNone: d.Electricity_RequireNone,
  }
  await processData(data_Requirement, "Requirement Data");

  data_Other = {
    PrefabID: d.PrefabID,
    GUID: d.GUID,
    Source: d.Source,
    AssetPackItem: d.AssetPackItem,
    UI_Priority: d.UI_Priority,
    UI_Group: d.UI_Group,
    UI_Icon: d.UI_Icon,
    UI_Menu: d.UI_Menu,
  }
  await processData(data_Other, "Other Data");

  data_AudioVisual = {
    GroupAmbience: d.GroupAmbience
  }
  await processData(data_AudioVisual, "AudioVisual Data");
  await processReferences(d.PrefabID, "References");
  detailsArray.forEach(([key, value]) => {
    if (!doneArray.includes(key)) {
      const div = document.createElement("div");
      div.innerHTML = `${key}: ${value}`;
      tempRight.appendChild(div);
    }
  });
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
  var value;
  if (typeof valueText == "object") {
    value = valueText;
  } else {
    value = document.createElement("span");
    value.classList.add("value-above-subtext");
    value.innerHTML = sanitizeValueText(valueText);
    if (unit != "") {
      value.innerHTML += "<br/><small>" + unit + "</small>";
    }
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

async function processData(data, header) {
  const linkableType = [
    "AssetPackItem",
    "ContentPrereq",
    "Road_AggregateType",
    "Road_ZoneBlock",
    "ServiceObject",
    "ServiceUpgrade_Buildings",
    "SignatureBuilding_Zone",
    "SpawnableBuilding_Zone",
    "SpawnableObject_Placeholders",
    "ThemeObject",
    "UI_Group",
    "UI_Menu",
    "Unlock_All",
    "UnlockOnBuild",
  ];

  const noLinkPrefab = [
  ]
  
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  for (const [key, value] of Object.entries(data)) {
    doneArray.push(key);
    if (value != undefined && value != "") {
      const div = document.createElement("div");
      const divX = document.createElement("div");
      let useDivX = false;
      if (linkableType.includes(key)) {
        if (value.includes(",")) {
          const regex = /(\w+):([\w ]+)[,]*/g;
          let match;
          while ((match = regex.exec(value)) !== null) {
            const [_, prefabType, data] = match;
            const button = document.createElement("button");
            const prefab = `${prefabType}:${data}`
            button.innerText = prefab;
              button.classList.add("data-link-button");
            if (!noLinkPrefab.includes(prefabType)) {
              button.addEventListener("click", () => processAssetData(prefab));
              button.classList.add("link");
            }
            divX.appendChild(button);
            divX.classList.add("div-with-subtext-flex");
          }
          useDivX = true;
        } else {
          if (!noLinkPrefab.some(type => value.startsWith(type))) {
            div.addEventListener("click", function () {
              processAssetData(value);
            });
            div.classList.add('link')
          }
        };
      }
      div.classList.add("parent-div-with-subtext");
      makeSubTextDiv("", reprocessKeyName(key), div);
      if (useDivX) {
        div.appendChild(divX);
      } else {
        if (typeof value === 'string' && value.startsWith("RGBA")) {
          makeSubTextDiv("", makeColor(value), div);;
        } else {
          let valueText = (String)(value);
          valueText = valueText.replace(/,(\S)/g, ', $1');
          makeSubTextDiv("", valueText, div);
          if (key == "GUID") {
            div.classList.add("guid-text");
          }
        }
      }
      mainDiv.appendChild(div);
    }
  };
  if (mainDiv.childElementCount > 0) {
    makeDataDiv(header, mainDiv);
  }
}

async function processReferences(d, header) {
  try {
    let matchingIds = await searchInIndexedDB(d);
    matchingIds = matchingIds.filter(id => id !== d);
    if (matchingIds.length > 0) {
      const mainDiv = document.createElement("div");
      mainDiv.classList.add("data-box");
      await Promise.all(
        matchingIds.map(async id => {
          const div = document.createElement("div");
          div.classList.add("parent-div-with-subtext");
          div.style.display = "flex";
          [bldgName, _] = await getTitleAndDescriptionFromPrefab(id);
          div.addEventListener("click", function () {
            processAssetData(id);
          });
          div.classList.add('link');
          makeSubTextDiv("", bldgName, div);
          mainDiv.appendChild(div);
        })
      );
      if (mainDiv.childElementCount > 0) {
        makeDataDiv(header, mainDiv);
      }
    }
  }
  catch (err) {
    console.error('Error:', err);
  };
}

async function processBldg(bldgs) {
  const header = `Spawnable Buildings (${bldgs.length})`;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  mainDiv.style.display = "flex";
  mainDiv.style.flexWrap = "wrap";
  mainDiv.style.flexDirection = "row";
  mainDiv.style.backgroundColor = "#113442d1";
  const levelSelector = document.createElement("div");
  levelSelector.classList.add("level-selector"); 
  const levels = [1, 2, 3, 4, 5];

  levels.forEach(level => {
    const button = document.createElement("button");
    const buildingCount = bldgs.filter(bldg => bldg.SpawnableBuilding_Level === level).length;
    button.innerText = `Level ${level} (${buildingCount})`;
    button.classList.add("level-btn");
    button.disabled = buildingCount === 0;
    button.addEventListener("click", () => filterBuildingsByLevel(level));
    levelSelector.appendChild(button);
  });
  mainDiv.appendChild(levelSelector);

  function filterBuildingsByLevel(level) {
    const buttons = levelSelector.querySelectorAll("button");
    buttons.forEach(button => button.classList.remove("active"));

    Array.from(buttons).forEach(button => {
      if (button.innerText === String(`Level ${level}`)) {
        button.classList.add("active");
      }
    });
    
    const buildings = bldgs.filter(bldg => bldg.SpawnableBuilding_Level === level);
    updateBuildingDisplay(buildings);
  }

  const bldgDiv = document.createElement("div");
  bldgDiv.classList.add("bldg-div");

  function updateBuildingDisplay(filteredBldgs) {
    const existingDivs = mainDiv.querySelectorAll(".asset-icon-box:not(.level-btn-container)");
    existingDivs.forEach(div => div.remove());

    filteredBldgs.forEach(bldg => {
      const div = document.createElement("div");
      div.classList.add("asset-icon-box");
      const textDiv = document.createElement("div");
      textDiv.classList.add("text-overlay");
      const prefabName = bldg.PrefabID.replaceAll("BuildingPrefab:", "")
      textDiv.innerText = prefabName.replaceAll("_", " ");
      const imgDiv = document.createElement("img");
      imgDiv.src = iconDecider(bldg.PrefabID.split(":")[1], bldg.UI_Icon);
      imgDiv.alt = prefabName;
      imgDiv.width = "10vh";
      div.appendChild(textDiv);
      div.appendChild(imgDiv);
      div.addEventListener("click", function () {
        processAssetData(bldg.PrefabID);
      });
      bldgDiv.appendChild(div);
    });
  }
  mainDiv.appendChild(bldgDiv);
  filterBuildingsByLevel(1);
  if (mainDiv.childElementCount > 0) {
    makeDataDiv(header, mainDiv);
  }
}

async function processUpgrades(bldgs) {
  const header = `Upgrades (${bldgs.length})`;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  bldgs.sort((a, b) => a.GUID - b.GUID);
  await Promise.all(
    bldgs.map(async bldg => {
      const div = document.createElement("div");
      div.classList.add("parent-div-with-subtext");
      div.style.display = "flex";
      [bldgName, _] = await getTitleAndDescriptionFromPrefab(bldg.PrefabID);
      div.addEventListener("click", function () {
        processAssetData(bldg.PrefabID);
      });
      div.classList.add('link');
      makeSubTextDiv("", bldgName, div);
      mainDiv.appendChild(div);
    })
  );
  if (mainDiv.childElementCount > 0) {
    makeDataDiv(header, mainDiv);
  }
}

function reprocessKeyName(key) {
  return key.replaceAll("_", " ");
}

function createResourceUseTable(resourceData, version = 1) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  mainDiv.id = "resource-use-table";
  resourceData.forEach(async (resource) => {
    // const div = document.createElement("div");
    const divIcon = document.createElement("div");
    const divRes = document.createElement("div");
    const divAmount = document.createElement("div");
    const divType = document.createElement("div");

    if (resource[0] === "Any") {
      divRes.innerHTML = "Anything";
      divIcon.innerHTML = `<img class="resource-icon" src="${imageBasePath}/cities2/Media/Game/Icons/ZoneIndustrialWarehouses.svg"></img>`;
    } else {
      divRes.innerHTML = await getLangData(`Resources.TITLE[${resource[0]}]`);
      divIcon.innerHTML = `<img class="resource-icon" src="${imageBasePath}/cities2/Media/Game/Resources/${resource[0]}.svg"></img>`;
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

async function createResourceAllowTable(resourceData) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("data-box");
  mainDiv.id = "resource-allow-table";
  for (const resource of resourceData) {
    const prefab = enumResourceInEditor(resource);
    const name = await getTitleResource(prefab);
    var icon = `<img class="resource-icon" src="${imageBasePath}/cities2/Media/Game/Resources/${prefab}.svg"></img>`;

    const resourceDiv = document.createElement("div");
    resourceDiv.classList.add("resource-inline-div");
    resourceDiv.innerHTML = `<div class="resource-inline-icon">${icon}<div class="resource-inline-text">${name}</div></div>`;

    mainDiv.appendChild(resourceDiv);
  };
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

function enumLeisureType(id) {
  d = [
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
  return d[id];
}

function enumAllowedWaterTypes(id) {
  d = ["None", "Groundwater", "Surface Water"];
  return d[id];
}

function enumWorkplaceComplexity(id) {
  d = ["Manual", "Simple", "Complex", "Hitech"];
  return d[id];
}

function enumSchoolType(id) {
  d = [
    "Elementary",
    "High School",
    "College",
    "University",
  ];
  return d[id];
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
  if (valueText.startsWith("[") && valueText.endsWith("]")) {
    valueText = removePrefix(valueText, "[");
    valueText = removeSuffix(valueText, "]");
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
        type: result[key]['category']
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

async function distributeDivsToColumnsByHeight() {
  return new Promise(async (resolve, reject) => {
    try {
      const container = document.querySelector('.asset-details-pane-body-bottom-boxes');
      if (!container) throw new Error("Container not found");

      const columns = [document.createElement('div'), document.createElement('div')];

      columns.forEach(col => {
        col.classList.add('column');
        container.appendChild(col);
      });

      void container.offsetHeight;

      const divs = Array.from(container.children).filter(div => !div.classList.contains('column'));

      let totalHeights = 0;
      function calcTotalHeight(divs) {
        divs.forEach(div => {
          totalHeights += div.clientHeight;
        });
      }

      async function waitForHeight(divs) {
        while (totalHeights === 0) {
          calcTotalHeight(divs);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      await waitForHeight(divs);

      let halfHeight = totalHeights / 2;
      let newHeight = 0;
      divs.forEach(div => {
        let shorterColumn;
        if (newHeight < halfHeight) {
          shorterColumn = columns[0];
        } else {
          shorterColumn = columns[1];
        }
        newHeight += div.clientHeight;
        shorterColumn.appendChild(div);
        div.style.opacity = 1;
      });
      columns[0].style.opacity = 1;
      columns[1].style.opacity = 1;

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function makeColor(rgba) {
  const match = rgba.match(/RGBA\(([\d.]+), ([\d.]+), ([\d.]+), ([\d.]+)\)/i);
  const [_, r, g, b, a] = match.map(Number);
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);
  const cssRgba = `rgba(${red}, ${green}, ${blue}, ${a})`;
  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = cssRgba;
  return colorBox;
}

window.processAssetPanelUIData = processAssetPanelUIData;
window.distributeDivsToColumnsByHeight = distributeDivsToColumnsByHeight;