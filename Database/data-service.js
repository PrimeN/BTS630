const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



//Load the schemas
const roleSchema = require("./models/role.js");
const userSchema = require("./models/user");
const classSchema = require("./models/class.js");



module.exports = function () {

    //Variables to be defined on new connection
    let Class;
    let User;
    let Role;


    return {
        connect: function () {

            //Connects to the database
            return new Promise((resolve, reject) => {

                let db = mongoose.createConnection("mongodb://Admin:Admin1@ds059205.mlab.com:59205/volunteer_system", {
                    useNewUrlParser: true
                });

                //Gets rid of the deprecation warning (), may need to be removed in future iteration
                mongoose.set('useCreateIndex', true);

                //Checks if an error was encountered when connecting to the database
                db.on('error', (err) => {
                    reject(err);
                });

                //Connected to the database
                db.once("open", () => {

                    //Defines the schemas in the database on connection to the server(AWS)
                    Role = db.model("Role", roleSchema);
                    User = db.model("User", userSchema);
                    Class = db.model("Class", classSchema);

                    //promise returns a success so the next task can be called
                    resolve();
                });
            });
        },

        //General Queries for database access
        login: function (userData) {
            return new Promise((resolve, reject) => {
                User.find({
                        Email: userData.Email
                    })
                    .limit(1)
                    .exec()
                    .then((data) => {
                        if (data[0].length == 0) { //Check for empty array
                            reject("Unable to find user:" + userData.user);
                        } else {
                            bcrypt.compare(userData.Password, data[0].Password).then((res) => {

                                // res === true if it matches and res === false if it does not match
                                if (res === true) {
                                    resolve(data[0]);
                                } else if (res === false) {
                                    reject("Incorrect Password for user: " + userData.Email);
                                }
                            })
                        }

                    }).catch((error) => {
                        reject("Unable to find user: " + userData.user);
                    });
            });
        },


        //USER COLLECTION COMMANDS
        //Create a new user
        createUser: function (user) {
            return new Promise((resolve, reject) => {

                //Create a new User from the userData
                let newUser = new User(user);

                //Makes the user variable (Ensures not all variables under userData are used)
                bcrypt.genSalt(10, function (err, salt) { // Generate a "salt" using 10 rounds
                    bcrypt.hash(user.Password, salt, function (err, hash) { // encrypt the password
                        //Check for hash
                        if (err) {
                            reject("There was an error encrypting the password");
                        } else {
                            //Set the password as hash
                            newUser.Password = hash;

                            newUser.save().then((data) => {
                                resolve(data._id);
                            }).catch((error) => {
                                if (error.code == 11000) {
                                    reject("User Name already taken");
                                } else {
                                    reject("There was an error creating the user: " + error);
                                }
                            });
                        }
                    });
                });
            });
        },
        getAllUsers: function () {

            return new Promise((resolve, reject) => {
                User.find()
                    .populate("Role")
                    .exec()
                    .then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    })
            });

        },
        getUserById: function (userId) {

            return new Promise((resolve, reject) => {
                User.find({
                        _id: userId
                    })
                    .populate("Role")
                    .limit(1)
                    .exec()
                    .then((users) => {
                        resolve(users);
                    }).catch((err) => {
                        reject(err);
                    });

            })

        },
        updateUserById: function (userId, userData) {

            return new Promise((resolve, reject) => {
                //check if data is actually sent to be updated
                if (Object.keys(userData).length > 0) {
                    // replace the current user with data from userData
                    User.updateOne({
                            _id: userId
                        }, {
                            $set: userData
                        }, {
                            multi: false
                        })
                        .exec()
                        .then(() => {
                            resolve(userId);
                        }).catch((err) => {
                            reject(err);
                        })
                } else {
                    resolve();
                }
            });

        },

        isAdmin: function (id) {
            return new Promise((resolve, reject) => {
                //Get User and compare to see if user is admin
                this.getUserById(id).then((data) => {
                    //Compare role names
                    if (data[0].Role.RoleName.toLowerCase() == ("admin").toLowerCase()) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch((err) => {
                    reject(err);
                })
            });
        },



        //ROLE COLLECTION COMMANDS
        createRole: function (role) {

            return new Promise((resolve, reject) => {
                var newRole = new Role(role);

                //Save the user created to the database
                newRole.save((err, roleAdded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(roleAdded._id);
                    }
                });
            });

        },
        getAllRoles: function () {
            return new Promise((resolve, reject) => {
                Role.find()
                    .exec()
                    .then((roles) => {
                        resolve(roles);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        getRoleById: function (roleId) {
            return new Promise((resolve, reject) => {
                Role.find({
                        _id: roleId
                    })
                    .exec()
                    .then((role) => {
                        resolve(role);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        updateRoleById: function (roleId, roleData) {
            return new Promise((resolve, reject) => {
                //check if data is actually sent to be updated
                if (Object.keys(roleData).length > 0) {
                    // replace the current user with data from userData
                    User.updateOne({
                            _id: roleId
                        }, {
                            $set: roleData
                        }, {
                            multi: false
                        })
                        .exec()
                        .then(() => {
                            resolve(roleId);
                        }).catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });

        },
        deleteRoleById: function (roleId) {
            return new Promise((resolve, reject) => {
                Role.remove({
                        _id: roleId
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },

        //CLASS COLLECTION COMMANDS
        createClass: function (nClass) {
            return new Promise((resolve, reject) => {
                var newClass = new Class(nClass);

                //Save the user created to the database
                newClass.save((err, classAdded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(classAdded._id);
                    }
                });
            });

        },
        getAllPreviousClass: function () {
            return new Promise((resolve, reject) => {
                Class.find()
                    .populate("User")
                    .exec()
                    .then((classes) => {
                        resolve(classes);
                    }).catch((err) => {
                        reject(err);
                    });
            });

        },
        getClassById: function (classId) {
            return new Promise((resolve, reject) => {
                Class.find({
                        _id: classId
                    })
                    .exec()
                    .then((classData) => {
                        resolve(classData);
                    }).catch((err) => {
                        reject(err);
                    });
            });

        },
        getClassForUser: function (userId) {
            console.warn(userId);
            return new Promise((resolve, reject) => {

                Class.find({
                        $or: [
                            {"Volunteers": userId},
                            {"ClassLead": userId}
                        ]
                    }).where('ClassEnd').gte(new Date())
                    .populate("User")
                    .exec()
                    .then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    })
            });
        },
        updateClassById: function (classId, classData) {
            return new Promise((resolve, reject) => {
                //check if data is actually sent to be updated
                if (Object.keys(classData).length > 0) {
                    // replace the current user with data from userData
                    Class.updateOne({
                            _id: classId
                        }, {
                            $set: classData
                        }, {
                            multi: false
                        })
                        .exec()
                        .then(() => {
                            resolve(classId);
                        }).catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        deleteClassById: function (classId) {
            return new Promise((resolve, reject) => {
                Class.deleteOne({
                        _id: classId
                    })
                    .then(() => {
                        resolve("Class deleted");
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }


    }


}