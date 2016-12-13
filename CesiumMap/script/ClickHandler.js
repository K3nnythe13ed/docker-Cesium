var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
var coordinates;
function viewerEventListener() {
    coordinates = [];
    cartographic = [];
    var scene = viewer.scene;
    var ellipsoid = scene.globe.ellipsoid;
    handler.setInputAction(function (movement) {
        var mousePosition = new Cesium.Cartesian2(movement.position.x, movement.position.y);

        var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);

        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        if (coordinates.length < 2) {
            coordinates.push([parseFloat(longitudeString), parseFloat(latitudeString)]);

        }
        if (coordinates.length == 2) {
            drawRectangle(coordinates)
        }


    }, Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.ALT);
}
function viewerEventRemoveListener() {
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.ALT)

}
function drawRectangle() {

    viewer.entities.removeById('rectangleAreaSelect')
    var westLon
    var eastLon
    var northLat
    var southLat
    if (coordinates[0][0] < coordinates[1][0]) {
        westLon = coordinates[0][0]
        eastLon = coordinates[1][0]
    }
    else {
        westLon = coordinates[1][0]
        eastLon = coordinates[0][0]
    }
    if (coordinates[0][1] < coordinates[1][1]) {
        southLat = coordinates[0][1]
        northLat = coordinates[1][1]
    }
    else {
        southLat = coordinates[1][1]
        northLat = coordinates[0][1]
    }


    var selectedArea = viewer.entities.add({
        id: 'rectangleAreaSelect',
        name: 'areaSelect',
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(westLon, southLat, eastLon, northLat),
            material: Cesium.Color.GREEN.withAlpha(0.5),
            outline: true,
            height: 500,
            outlineColor: Cesium.Color.GREEN
        }
    });
    coordinates = [];
}
