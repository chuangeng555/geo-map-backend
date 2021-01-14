// Import contact model
Location = require('./locationModel');

// Handle index actions
exports.get = function (req, res) {

    Location.find((err, locations) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Location retrieved successfully",
            data: locations
        });
    });
};

// Handle view contact info
exports.getById = function (req, res) {
    Location.findById(req.params._id, function (err, location) {
        if (err)
            res.send(err);
        res.json({
            message: 'Location details: ',
            data: location
        });
    });
};


exports.getByGeo = function (req, res) {
    let result = req.params._geodata.split(",").map((e) => parseFloat(e));
    console.log(result)

    Location.find({geoLocation: result
    }, function (err, location) {
        if (err)
            res.send(err);
        res.json({
            message: 'Location details: ',
            data: location
        });
    });
};




// Handle create location actions
exports.post = function (req, res) {
    var location = new Location();
    location.locationName = req.body.locationName;
    location.geoLocation = req.body.geoLocation;
    location.locationData = req.body.locationData
    location.locationData.create_date = Date.now()

// save the location and check for errors
    location.save((err) => {
         if (err)
             res.json(err);
        res.json({
            message: 'New Location created!',
            data: location
        });
    });
};


// Append by id 
exports.addOnLocationDataById = (req, res) => {

    Location.findById( {_id: req.params._id}, (err, location)  => {
        if(err)
            res.send(err);

            location.locationData.push(req.body)

            location.save((err) => {
                //if (err)
                //    res.json(err);

                res.json({
                    message: 'New Location data created',
                    data: location
                });
            });

    });
}



// Handle delete location
exports.delete = function (req, res) {
    Location.remove({
        _id: req.params._id
    }, function (err, locations) {
        if (err)
            res.send(err);
    res.json({
            status: "success",
            message: 'Location deleted'
        });
    });
};

//Handle update location function 


exports.update = (req, res) => {
    Location.findById( {_id: req.params._id}, (err, location) => {
            if (err)
                res.send(err);
            location.locationName = req.body.locationName ? req.body.locationName : location.locationName;
            location.locationData = req.body.locationData ? req.body.locationData : location.locationData;
            location.geoLocation = req.body.geoLocation ? req.body.geoLocation : location.geoLocation;
            location.locationData.create_date = Date.now();


    // save the updated location and check for errors
            location.save((err) => {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Contact Info updated',
                    data: location
                });
            });
        });
    };
