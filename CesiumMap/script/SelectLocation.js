function SelectAreaLocation(c, addToList) {
    deleteDashboardWarehouseChild()

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
    })

}

function deleteDashboardWarehouseChild() {
    var root = document.getElementById('warehouse');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
}