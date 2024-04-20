import mongoose from "mongoose";
import User from "../models/user.model"; 
import { IUser } from "../models/user.model"; 
import connectDB from "../mongodb";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import TenantModel from "../models/tenants.model";
export const fetchUsers = async (q:any, page:any) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  try {
    await connectDB();
    const count = await User.find({ name: { $regex: regex },role:"user"  }).count();
    const users = await User.find({ name: { $regex: regex },role:"user" })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
export const fetchTenants = async (q:any, page:any) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  try {
    await connectDB();
    const count = await TenantModel.find({ name: { $regex: regex } }).count();
    const tens = await TenantModel.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, tens };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
export interface addUserParams {
    name: string,
    email: string,
    password: string,
    tenant:JSON
  }
export async function addUser ({
  name,
  email,
  password,
  tenant
  
}: addUserParams) {
  connectDB()
  try {
    const user = await User.findOne({email})
  
    if (user) {
      throw new Error("User already exists.")
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      tenant
    })
  
    // console.log({newUser})
    await newUser.save()
  
    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}