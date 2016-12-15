function addToList(hit, element, del) {
    console.log(hit)
    console.log(element)
    console.log(del)
    var locationlist = document.getElementById(element);
    var li = document.createElement("LI");
    li.style.width = "350px"



    var a = document.createElement('a');

    var linkText = document.createTextNode("" + hit._source.properties.AccountName);
    a.appendChild(linkText);
    a.title = "Location: "+hit._source.properties.AccountName;
    a.href = "#";
    a.onclick = function () {
        viewer.flyTo(viewer.entities.getById(hit._source.properties.LocID),
            {
                orientation: {
                    heading: Cesium.Math.toRadians(175.0),
                    pitch: Cesium.Math.toRadians(-35.0),
                    roll: 0.0
                }
            }
        )
        return false;
    };
    li.appendChild(a);


    var att = document.createAttribute("id");
    att.value = "li " + hit._source.properties.LocID;
    li.setAttributeNode(att);
    if (del) {
        var btn = document.createElement("BUTTON");        // Create a <button> element
        var t = document.createTextNode("Delete");       // Create a text node
        btn.appendChild(t);

        btn.onclick = function () {
            deleteLocation(hit._source.properties.LocID)
        }                  


        li.appendChild(btn);

        li.lastChild.style.position = "absolute";
        li.lastChild.style.left = "300px";
    }
    locationlist.appendChild(li)

}

function removeFromList(id) {
    var li = document.getElementById("li " + id);
    li.parentNode.removeChild(li);

}


