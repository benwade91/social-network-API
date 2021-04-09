const {
    Thought,
    User
} = require('../models');

const ThoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.thoughtId
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    createThought({
        params,
        body
    }, res) {
        console.log(body.thoughtText);
        Thought.create(body)
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    _id: params.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true,
                    runValidators: true
                });
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'that didnt work'
                    });
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },


    updateThought({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, body, {
                new: true,
                runValidators: true
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({
        params
    }, res) {
        Thought.findOneAndDelete({
                _id: params.thoughtId
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    });
                    return;
                }
                return User.findOneAndUpdate({
                    _id: params.userId
                }, {
                    $pull: {
                        thoughts: {_id: params.thoughtId}
                    }
                }, {
                    new: true
                })
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!'
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    newReaction({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true
            })
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    });
                    return;
                }
                res.json(friendData);
            })
            .catch(err => res.json(err))
    },

    deleteReaction({
        params
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $pull: {
                    reactions: {_id: params.reactionId}
                }
            }, {
                new: true
            })
            .then(dbThoughtData => {
                if (!dbFriendData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    }
}

module.exports = ThoughtController;