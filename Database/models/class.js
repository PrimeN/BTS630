const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var classSchema = new Schema({
    ClassTitle: String,
    ClassDescription: String,
    ClassColor: String,
    ClassStart: Date,
    ClassEnd: Date,
    Volunteers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    ClassLead: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// make this schema available to the Node application
module.exports = classSchema;