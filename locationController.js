const { ObjectId } = require('mongodb');

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
    Location.findOne({_id: req.params._id} , function (err, location) {
        // console.log(req.params._id)
        // console.log(location)
        //if (err)
        //    res.send(err);
        res.json({
            message: 'Location details: ',
            data: location
        });
    });
};


exports.getByGeo = function (req, res) {
    let result = req.params._geodata.split(",").map((e) => parseFloat(e));
    // console.log(result)

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
    location.imageUrl = req.body.imageUrl 
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
exports.delete = async function (req, res) {
    try {
        const location = await Location.findByIdAndDelete(req.params._id);
        if (!location) response.status(404).send("No item found");
        res.status(200).send();
      } catch (error) {
        res.status(500).send(error);
      }
};


// Append by id 
exports.deleteInnerIds = (req, res) => {

    Location.findOne( {_id: req.params._id}, (err, location)  => {
        if(err)
            res.send(err);
            //console.log(location.locationData)
            //console.log(req.body.list)
            let filtered = location.locationData.filter((f) => {
                return !req.body.list.includes(f._id.toString())
            })
            location.locationData = filtered
            //console.log(test.length)

            location.save((err) => {
                //if (err)
                //    res.json(err);
                res.json({
                    message: 'Remove locations',
                    dataRemove: req.body.list
                });
            });
    });
}


//Handle update location function 


exports.update = (req, res) => {
    Location.findById( {_id: req.params._id}, (err, location) => {
            if (err)
                res.send(err);
            location.locationName = req.body.locationName ? req.body.locationName : location.locationName;
            location.locationData = req.body.locationData ? req.body.locationData : location.locationData;
            location.geoLocation = req.body.geoLocation ? req.body.geoLocation : location.geoLocation;
            location.imageUrl = req.body.imageUrl ? req.body.geoLocation : location.geoLocation; 
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
