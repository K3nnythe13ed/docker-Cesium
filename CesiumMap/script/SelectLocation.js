function SelectAreaLocation(c)
{
     client.search({
        index: 'logstash-*',
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
      
        console.log(response.aggregations[1].value)
    })

}