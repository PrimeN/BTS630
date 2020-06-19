const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create the Schema for users table
//timestamps will create a createdAT field and an updatedAt field so we don't need Date created on
var userSchema = new Schema({
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    FirstName: String,
    LastName: String,
    AddressStreet: String,
    AddressProvince: String,
    AddressCity: String,
    AddressZip: String,
    PhoneNum: String,
    Extension: Number,
    DayAvailable: [{
        type: Number
    }], //Weekends & Weekdays (0, 1, 2, 3, 4, 5, 6)
    TimeAvailableStart: [{
        type: String
    }], //Fixed time, so they can select from the given time
    TimeAvailableEnd: [{
        type: String
    }], //Parallel array with DayAvailable/Start
    TotalHoursVolunteered: {
        type: Number,
        default: 0
    },
    Role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        default: "5be7997a65189b06b01ebd08"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// make this schema available to the Node application
module.exports = userSchema;