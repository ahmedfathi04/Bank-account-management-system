import mongoose,{Schema} from "mongoose";

const usermodel = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    balance:{
        type: Number,
        default: 0
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

},{
    timestamps: true
})
export default mongoose.model('user',usermodel)