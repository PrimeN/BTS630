const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var roleSchema = new Schema({
    RoleName: {
        type: String,
        required: true,
        unique: true,
    },
    RoleDescription: String
});



// make this schema available to the Node application
module.exports = roleSchema;