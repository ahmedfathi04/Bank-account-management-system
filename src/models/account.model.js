import mongoose,{Schema} from "mongoose";

const accountmodel = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    balance:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})
export default mongoose.model('account',accountmodel)