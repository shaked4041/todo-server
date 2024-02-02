const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select : false
    },
    permission : {
        type:String,
        enum :["user","admin"],
        default : "user",
    },
    // ***** Option for save *****
    // orders : [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "order",
    // }],
    tasks: [{
        type: mongoose.SchemaTypes.ObjectId,
         ref: "task"
    }],
})



// userSchema.methods.isValidPassword = async function(password) {
//     try {
//       // Use bcrypt to compare the provided password with the hashed password
//       return await bcrypt.compare(password, this.password);
//     } catch (error) {
//       console.error('Error comparing passwords:', error);
//       return false; // Return false in case of error
//     }
//   };

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;