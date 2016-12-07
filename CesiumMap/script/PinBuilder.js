var pinBuilder = new Cesium.PinBuilder();

var url = Cesium.buildModuleUrl('Assets/Textures/maki/grocery.png');
var groceryPin = Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48), function (canvas) {
    return viewer.entities.add({
        name: 'Grocery store',
        position: Cesium.Cartesian3.fromDegrees(-75.1705217, 39.921786),
        billboard: {
            image: canvas.toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        }
    });
});