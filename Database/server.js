const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
var dataService = require("./data-service");
var data = dataService();

const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");




// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

//This should be put in a very well protected place
jwtOptions.secretOrKey = '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName & req.user.role values 
        // that matches the request payload data
        next(null, {
            _id: jwt_payload._id,
            Email: jwt_payload.Email,
            Role: jwt_payload.Role
        });
    } else {
        next(null, false);
    }
});


// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());


app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello, you won't get anymore public information than this!");
});

app.post("/register", (req, res) => {
    data.createUser(req.body)
        .then((msg) => {
            res.json({
                msg
            });
        }).catch((msg) => {
            res.status(422).json({
                "message": msg
            });
        });
});


app.post("/login", (req, res) => {
    data.login(req.body)
        .then((user) => {

            var payload = {
                _id: user._id,
                Email: user.Email,
                Role: user.Role
            };

            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            res.json({
                "message": "login successful",
                "token": token
            });
        }).catch((msg) => {
            res.status(422).json({
                "message": msg
            });
        });

});

/*app.post("/logout", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    req.logout();
});*/


app.get("/users", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.getAllUsers().then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).end();
        })
});


app.get("/user/:userId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.getUserById(req.params.userId).then((data) => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).end();
        })
});


app.put("/user/:userId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    data.updateUserById(req.params.userId, req.body).then((data) => {
            res.json({
                "message": "user " + data + " updated successfully"
            });
        })
        .catch((err) => {
            res.status(500).end();
        })
});




app.get("/role/:roleId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.getRoleById(req.params.roleId).then((data) => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).end();
        })
});



app.get("/user/isAdmin/:userId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.isAdmin(req.params.userId).then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).end();
        })
});


//Get all classes
app.get("/classes", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.getAllPreviousClass().then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).end();
        })
});


//Create class
app.post("/createClass", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.createClass(req.body)
        .then((msg) => {
            res.json(msg);
        }).catch((msg) => {
            res.status(422).json({
                "message": msg
            });
        });
});


//Get specific class
app.get("/class/:classId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    data.getClassById(req.params.classId).then((data) => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).end();
        })
});


//For regular users
app.get("/classes/:userId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    data.getClassForUser(req.params.userId).then((data) => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(500).end();
            }
        })
        .catch((err) => {
            res.status(500).end();
        })
});


//Update a class by ID
app.put("/class/:classId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    data.updateClassById(req.params.classId, req.body).then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).end();
        })
});


//Delete a class by ID
app.delete("/class/:classId", passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    data.deleteClassById(req.params.classId).then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).end();
        })
});




//After connecting to database, start server
data.connect().then(() => {
    app.listen(HTTP_PORT);
}).catch((err) => {
    console.log("App cannot start");
    console.log("Error: " + err);
    process.exit();
});