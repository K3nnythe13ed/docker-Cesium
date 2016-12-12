function AllLocations(callbackfunction)
{
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

    response.hits.hits.forEach(function (hit) {
     callbackfunction(hit)
    })
  })
}