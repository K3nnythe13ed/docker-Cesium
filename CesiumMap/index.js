
Cesium.BingMapsApi.defaultKey = bing;
var viewer = new Cesium.Viewer('cesiumContainer')


var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//assets.agi.com/stk-terrain/world',
  requestWaterMask: true
});
viewer.terrainProvider = terrainProvider;



var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

$(function () {
  AllLocations(splitLocation)
  AllVessels(pushASingleVesselFromEStoHash)
  
})

function splitLocation(hit)
{
  newMarkerOnMap(hit)
  addToList(hit, "locationlist", true);
}
