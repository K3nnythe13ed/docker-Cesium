var viewer = new Cesium.Viewer('cesiumContainer');
        var client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
            });