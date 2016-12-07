$(function(){


  client.search({
    index: 'logstash-*',
    type: 'warehouse',
    size: '1000',
    body: {
      "sort": {
        "properties.LocID":
        { "order": "desc" }
      }
    }

  }, function run(error, response) {

    demoLocations = {
      "type": "FeatureCollection",
      "features": [
      ]
    };




    response.hits.hits.forEach(function (hit) {
      giveback(hit, demoLocations)
    })

    CreateMapLayerMarker()
  })
})