var pinBuilder = new Cesium.PinBuilder();
function newMarkerOnMap(hit) {
    var url = Cesium.buildModuleUrl('/../../../../image/office-building.png');
    var Pin = Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.BLUE, 100), function (canvas) {
        return viewer.entities.add({
            name: hit._source.properties.AccountName,
            position: Cesium.Cartesian3.fromDegrees(hit._source.geometry.coordinates[0], hit._source.geometry.coordinates[1]),
            billboard: {
                image: canvas.toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            description: '\
<p>\
  Location'+hit._source.properties.AccountName +' \
</p>\
<p>\
 Location ID: '+hit._source.properties.LocID +'\
 </p>\
 <p>\
 Exposure: '+hit._source.properties.Exp_TIV +'\
</p>\
<p>\
 Coordinates: '+hit._source.geometry.coordinates[0] +', '+hit._source.geometry.coordinates[1]+'\
 </p>\
 <p>\
 Risk Score: '+hit._source.properties.MR_RISK_SCORE +'\
 </p>'

        });
    });

}