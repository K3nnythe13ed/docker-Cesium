function showModal() { $('#myModal').modal("show") }

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