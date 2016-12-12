function loadVesselFromUrl() {
    
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(shipCollection, {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.YELLOW,
        strokeWidth: 3,
        markerSymbol: '?'
    })
    );


}


var shipCollection = {
    "type": "FeatureCollection",
    "features": []
}
function AllVessels(callback) {
    var allTitles = [];

    // first we do a search, and specify a scroll timeout
    client.search({
        index: 'logstash-*',
        type: 'vessel',
        size: '1000',
        scroll: '30s',
        body: {
            "sort": { "@timestamp": { "order": "asc" } },
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "TYPE": {
                                    "gte": 70,
                                    "lte": 70
                                }
                            }
                        }
                    ]
                }
            }
        }

    }, function getMoreUntilDone(error, response) {
        // collect the title from each response
        response.hits.hits.forEach(function (hit) {
            allTitles.push(hit._id)
            callback(hit)
        });
        if (response.hits.total > allTitles.length) {
            // ask elasticsearch for the next set of hits from this search
            client.scroll({
                scrollId: response._scroll_id,
                scroll: '30s'
            }, getMoreUntilDone);
        } else {
            loadVesselFromUrl()
        }
    });
}


function searchShipCollectionForMMSI(mmsi) {
    var update = undefined;
    for (var i = 0; i < shipCollection.features.length; i++) {
        if (shipCollection.features[i].properties.id == mmsi) {
            update = i;
        }
    }
    return update
}
function pushASingleVesselFromEStoHash(hit) {
    var update = searchShipCollectionForMMSI(hit._source.MMSI);
    if (update == undefined) {
        var ship = {

            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": []
            },
            "properties":
            {
                "id": hit._source.MMSI,
                "time": []
            }

        }

        shipCollection.features.push(ship)
        update = shipCollection.features.length - 1
    }

    shipCollection.features[update].geometry.coordinates.push([hit._source.LOCATION.lon,
    hit._source.LOCATION.lat])
    shipCollection.features[update].properties.time.push(hit._source["@timestamp"])

}

function CZMLData() {
    shipCollection.forEach(function (hit) {
        var czmlDataSource = new Cesium.CzmlDataSource();

        czmlDataSource.process(hit);
        viewer.dataSources.add(czmlDataSource);
    });

}