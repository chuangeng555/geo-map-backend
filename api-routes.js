// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Test test 123!',
    });
});


// Import contact controller
const locationController = require('./locationController');
// Contact routes


router.route('/locations')
    .get(locationController.get)
    .post(locationController.post);

router.route('/locations/:_id')
    .get(locationController.getById)
    .patch(locationController.addOnLocationDataById)
    //.patch(locationController.update)
    .put(locationController.update)
    .delete(locationController.delete);

router.route('/locations/deleteInnerIds/:_id')//use parent id 
    .patch(locationController.deleteInnerIds)

router.route('/locations/geo/:_geodata')
    .get(locationController.getByGeo)



module.exports = router;
