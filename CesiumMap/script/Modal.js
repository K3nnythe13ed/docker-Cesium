function showModal() {

    var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    screenSpaceEventHandler.setInputAction(function parseLatLon(position) {
        var mousePosition = new Cesium.Cartesian2(position.position.x, position.position.y);

        var cartesian = viewer.camera.pickEllipsoid(mousePosition, viewer.scene.globe.ellipsoid);

        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        var $modal = $('#myModal')
        $loclat = $modal.find('#loclat');
        $loclon = $modal.find('#loclon');

        $loclat.val(parseFloat(latitudeString));
        $loclon.val(parseFloat(longitudeString));


        $('#myModal').modal("show")
         screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.ALT)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.ALT);
}

$('#locationform').formValidation({
    framework: 'bootstrap',
    excluded: ':disabled',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        lname: {
            validators: {
                notEmpty: {
                    message: 'The Location Name is required'
                }
            }
        },
        lid: {
            validators: {
                notEmpty: {
                    message: 'The Location ID is required'
                },
                digits: {
                    message: 'The Location ID does allow digits only',

                },
                callback: {
                    message: 'The ID is invalid',
                    callback: function (value, validator, $field) {
                        var test = true;
                        if (viewer.entities.getById(value) != undefined) {
                            test = false;
                        }

                        return {
                            valid: test,       // or true
                            message: 'Location ID already exists. To update an existing Location use the edit function.'
                        }

                    }

                }

            }
        },
        lexp: {
            validators: {
                notEmpty: {
                    message: 'The Location Exposure is required'
                },
                digits: {
                    message: 'The value is not a valid number. Required: f.e. 40000000',

                },
                stringLength: {
                    min: 3
                }
            }
        },
        lrisc: {
            validators: {
                notEmpty: {
                    message: 'The Location Risk is required'
                },
                stringLength: {
                    max: 1,
                    message: 'Please enter a valid Nathan Risk Score'
                }
            }
        },
        loe: {
            validators: {
                notEmpty: {
                    message: 'The Location OE is required'
                }
            }
        },
        llat: {
            validators: {
                notEmpty: {
                    message: 'The Latitude is required'
                },
                between: {
                    min: -90,
                    max: 90,
                    message: 'The latitude must be between -90.0 and 90.0'
                }
            }
        },
        llon: {
            validators: {
                notEmpty: {
                    message: 'The Longitude is required'
                },
                between: {
                    min: -180,
                    max: 180,
                    message: 'The longitude must be between -180.0 and 180.0'
                }
            }
        }

    }
});
$(function () {

    $('#saveloc').click(function () {

        //validate locationform
        $('#locationform').data('formValidation').validate();
        //isValid returns true if validate was successful
        if ($('#locationform').data('formValidation').isValid()) {
            var locname = document.getElementById("locname").value;
            var locid = document.getElementById("locid").value;
            var locexp = document.getElementById("locexp").value;
            var locrisk = document.getElementById("locrisc").value;
            var loclat = parseFloat(document.getElementById("loclat").value);
            var loclon = parseFloat(document.getElementById("loclon").value);
            var locoe = document.getElementById("locoe").value;
            //call functon to create a new Location
            createANewLocation(locname, locid, locexp, locrisk, loclat.toPrecision(12), loclon.toPrecision(12), locoe)
            $('#myModal').modal('hide');
           

        }
    });
});
// remove all input values from Modal after Modal has been hidden
$('#myModal').on('hidden.bs.modal', function () {

    $(this).find('form')[0].reset();
    $('#locationform').formValidation('resetForm', true);
});

function createANewLocation(locname, locid, locexp, locrisk, loclat, loclon, locoe) {
    var today = new Date();
    client.index({
        index: 'logstash-constant',
        type: 'warehouse',
        id: locid,
        body: {
            "@timestamp": today,
            "exposure": locexp,
            "geometry": {
                "coordinates": [
                    loclon,
                    loclat
                ],
                "type": "Point"
            },
            "id": locid,
            "properties": {
                "AAL_PreCat_EQ": "",
                "AAL_PreCat_WS": "",
                "ML_AGCS_Share": "",
                "Entire": ", " + locoe + ",  0,  0,  0",
                "Exp_TIV": locexp,
                "OE": locoe,
                "MR_RISK_SCORE": locrisk,
                "LocID": locid,
                "AAL_PreCat_FL": "",
                "AddrMatch": "",
                "AccountName": locname
            }
        }



    }, function (err, results) {
        console.log(results)
        //refresh index. Required based on the asynchronous input of es client
        client.indices.refresh({
            index: 'logstash-constant'
        }, function (err, res) {
            client.get({
                index: 'logstash-constant',
                type: 'warehouse',
                id: locid
            }, function (err, response) {
                console.log(response)
                newMarkerOnMap(response)
                addToList(response)
            })

        })


    })
}

