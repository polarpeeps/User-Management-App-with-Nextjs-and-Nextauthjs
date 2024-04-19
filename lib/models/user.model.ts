import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  tenant: [{
    tenantName: {
      type: String,
      required: true,
    },
    role: {
      type: String,  
      default:"user"
    },
  }],
  password: {
    type: String
  },
  image: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  provider: {
    type: String,
    default: "credentials"
  }
}, { timestamps: true })
interface Tenant {
  tenantName: string;
  role: string;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  tenants: Tenant[];
  password?: string;
  image?: string;
  role: string;
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User