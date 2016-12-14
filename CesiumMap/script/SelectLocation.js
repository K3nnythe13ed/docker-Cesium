function SelectAreaLocation(c, addToList) {



    client.search({
        index: 'logstash-constant',
        type: 'warehouse',
        body: {
            "size": 1000,
            "query": {
                "bool": {
                    "must": [
                        {
                            "geo_shape": {
                                "geometry": {
                                    "shape": {
                                        "type": "envelope",
                                        "coordinates": [
                                            [c[0][0], c[0][1]], [c[1][0], c[1][1]]
                                        ]
                                    },
                                    "relation": "within"
                                }
                            }
                        }
                    ]

                }
            },
            "aggs": {
                "1": {
                    "sum": {
                        "field": "exposure"
                    }
                }
            }
        }
    }, function getMoreUntilDone(error, response) {

        response.hits.hits.forEach(function (hit) {
            addToList(hit, 'warehouse', false)
        })
        InsertWarehouseValue(response)
    })

}
function InsertWarehouseValue(result) {
    var node = document.createTextNode('Location Exp_TIV: ' + formatThousand(result.aggregations[1].value));
    


    var li = document.createElement("LI");
    var att = document.createAttribute("id");
    att.value = "WarehouseValue"

    li.setAttributeNode(att);
    li.appendChild(node);
    var root = document.getElementById('dashboard');

    root.insertBefore(li, root.childNodes[0])

}
function deleteDashboardWarehouseChild() {
    var root = document.getElementById('warehouse');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    var ro = document.getElementById('dashboard');

    if (document.getElementById('WarehouseValue')) { root.removeChild(document.getElementById('WarehouseValue')); }
}

function formatThousand(nStr) {
    if (nStr != "undefined") {

        var sep = '.';
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + sep + '$2');
        }

        return x1 + x2 + " €";
    }
    else {
        return "empty";
    }
}