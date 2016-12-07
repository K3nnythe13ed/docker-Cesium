var viewer = new Cesium.Viewer('cesiumContainer')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});
var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//assets.agi.com/stk-terrain/world',
  requestWaterMask: true
});
viewer.terrainProvider = terrainProvider;
