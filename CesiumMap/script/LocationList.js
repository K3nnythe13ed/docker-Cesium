function addToList(hit) {
    var locationlist = document.getElementById("locationlist");
    var li = document.createElement("LI");
    var a = document.createElement('a');
    var linkText = document.createTextNode("" + hit._source.properties.AccountName);
    a.appendChild(linkText);
    a.title = "my title text";
    a.href = "#";
    a.onclick = function () {
       /* viewer.flyTo(Pin.).then(function (result) {
            if (result) {
                viewer.selectedEntity = wyoming;
            }
        });*/
        viewer.zoomTo(viewer.entities.getById(hit._source.properties.LocID));
        return false;
    };
    li.appendChild(a);
    locationlist.appendChild(li)
}


