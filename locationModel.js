const mongoose = require('mongoose');
// Setup schema
const LocationSchema = mongoose.Schema({
    locationName: {
        type: String,
        required: true 
    },
    geoLocation: {
        type: [Number],
        required: true
    },

    locationData: [
        {
            summary: {
                type: String,
                required: true
            
            },
            description: {
                type: String,
                required: true 
            },
            imageUrl: {
                type: String, 
                required: true
            }, 
            create_date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


// Export Location model
const Location = module.exports = mongoose.model('location', LocationSchema); //name of model , schema 

//module.exports.get = function (callback, limit) {
//    Location.find(callback).limit(limit);
//}
