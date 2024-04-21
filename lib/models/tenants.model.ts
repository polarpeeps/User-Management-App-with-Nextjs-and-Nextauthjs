import mongoose from "mongoose";
const tenantSchema= new mongoose.Schema({

  // "_id": mongoose.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {type:String},
  // "admins": [mongoose.Types.ObjectId],
  industry:{type:String},// References User._id; these users are admins of the tenant
  createdAt: {type:Date},
  updatedAt: {type:Date},
})
export interface ITenantModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  industry: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const TenantModel=mongoose.models.TenantModel || mongoose.model("TenantModel", tenantSchema);
export default TenantModel;