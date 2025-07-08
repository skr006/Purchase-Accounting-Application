
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        firstName: { 
            type: String, 
            required: [true, 'User first name is required'], 
            minlength: 2,
            maxlength: 50,
            trim: true
        },  
        lastName: {
            type: String,
            required: [true, 'User last name is required'], 
            minlength: 1,
            maxlength: 50,
            trim: true
        } 
    },
    email:{
        type: String,
        required: [true,"User email is required"],
        trim: true,
        match: [/\S+@\S+\.\S+/,'Please fill a valid email address']
    },
    password:{
        type: String,
        required: [true,'User Password is required'],
        minlength: 6,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    }, 
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: { 
        street: { 
            type: String, 
            trim: true 
        },
        area:{
            type: String, 
            trim: true
        } ,
        city: { 
            type: String, 
            trim: true 
        }, 
        state: { 
            type: String, 
            trim: true 
        }, 
        country: { 
            type: String, 
            trim: true 
        }, 
        zipCode: { 
            type: String, 
            trim: true 
        } 
    }, 
    phoneNumber: { 
        type: String, 
        trim: true 
    }
},{timestamps: true});
const User = mongoose.model('User',userSchema);
export default User;