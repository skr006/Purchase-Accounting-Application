
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/,'Please fill a valid email address']
    },
    password:{
        type: String,
        required: [true,'User Password is required'],
        minlength: 6,
        select: false,
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

userSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
};

const User = mongoose.model('User',userSchema);
export default User;
