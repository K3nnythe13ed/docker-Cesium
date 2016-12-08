function addToList(hit) {
    var locationlist = document.getElementById("locationlist");
    var li = document.createElement("LI");
    li.style.width ="350px"
    


    var a = document.createElement('a');

    var linkText = document.createTextNode("" + hit._source.properties.AccountName);
    a.appendChild(linkText);
    a.title = "my title text";
    a.href = "#";
    a.onclick = function () {
        viewer.flyTo(viewer.entities.getById(hit._source.properties.LocID)).then(function (result) {
            if (result) {
                viewer.selectedEntity = wyoming;
            }
        });
        return false;
    };
    li.appendChild(a);

    
    var att = document.createAttribute("id");
    att.value = "li " + hit._source.properties.LocID;
    li.setAttributeNode(att);

    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Delete");       // Create a text node
    btn.appendChild(t);
    
    btn.onclick = function () {
        deleteLocation(hit._source.properties.LocID)
    }                  // Append the text to <button>
    
    
    li.appendChild(btn);
    
    li.lastChild.style.position = "absolute";
    li.lastChild.style.left ="300px";
    console.log(li)
    locationlist.appendChild(li)
}

function removeFromList(id) {
    var li = document.getElementById("li " + id);
    li.parentNode.removeChild(li);

}


