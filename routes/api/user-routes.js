const router = require('express').Router();

// REQUIRE ROUTE CONTROLLER METHODS
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/User-controller');


// GET and POST routes for Users at /Users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// Set up GET one, PUT, and DELETE at /Users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// POST and DELETE friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;