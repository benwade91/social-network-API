const {
    User,
    Thought
} = require('../models');

const UserController = {

    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: 'username'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    getUserById({
        params
    }, res) {
        User.findOne({
                _id: params.userId
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No User found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    createUser({
        body
    }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },


    updateUser({
        params,
        body
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, body, {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No User found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({
        params
    }, res) {
        User.findOneAndDelete({
                _id: params.userId
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No User found with this id!'
                    });
                    return;
                }
                if (dbUserData.thoughts) {
                    return Thought.deleteMany({
                        _id: {
                            $in: [dbUserData.thoughts]
                        }
                    }).then(res.json(dbUserData));
                } else {
                    res.json(dbUserData);
                }

            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({
        params
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, {
                $push: {
                    friends: params.friendId
                }
            }, {
                new: true
            })
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                return User.findOneAndUpdate({
                        _id: params.friendId
                    }, {
                        $push: {
                            friends: params.userId
                        }
                    }, {
                        new: true
                    })
                    .then(res.json(friendData))
            })
            .catch(err => res.json(err))
    },

    deleteFriend({
        params
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, {
                $pull: {
                    friends: params.friendId
                }
            }, {
                new: true
            })
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                return User.findOneAndUpdate({
                        _id: params.friendId
                    }, {
                        $pull: {
                            friends: params.userId
                        }
                    }, {
                        new: true
                    })
                    .then(res.json(friendData))
            })
            .catch(err => res.json(err))
    }
}

module.exports = UserController;