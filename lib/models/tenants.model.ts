import mongoose from "mongoose";
const tenantSchema= new mongoose.Schema({

  // "_id": mongoose.Types.ObjectId,
  "name": String,
  "description": String,
  
  // "admins": [mongoose.Types.ObjectId],
  "industry":String, // References User._id; these users are admins of the tenant
  "createdAt": Date,
  "updatedAt": Date

      
})
const TenantModel=mongoose.models.TenantModel || mongoose.model("TenantModel", tenantSchema);
export default TenantModel;