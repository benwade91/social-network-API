const router = require('express').Router();

// REQUIRE ROUTE CONTROLLER METHODS
const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thought-controller');


// GET thoughts at /thoughts
router
  .route('/')
  .get(getAllThoughts);

  //POST new thought
router
  .route('/:userId')
  .post(createThought);

// GET one and PUT at /thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought);

//DELETE thought
router
  .route('/:userId/:thoughtId')
  .delete(deleteThought);

// POST reactions
router
  .route('/:thoughtId/reactions')
  .post(newReaction)

//DELETE reaction
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;