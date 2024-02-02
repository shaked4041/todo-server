//require mogoose
const mongoose = require('mongoose')
const MONGO_URL='mongodb+srv://shaked4041:4041shaked@cluster0.4rxch4c.mongodb.net/toDoProject'
function connect() {
    try {
        mongoose.connect(MONGO_URL)
            .then(() => { console.log("DB - Connection Success"); })
    } catch (err) {
        console.log("MongoDB error:", err);
    }
}

module.exports = { connect }