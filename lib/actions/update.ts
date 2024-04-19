"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectDB from "../mongodb";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

type Tenant = {
  tenantName: string;
  role: string;
};

type FormDataEntries = {
  name: string;
  email: string;
  password: string;
  tenants: string; 
};

export const updateUser = async (id:string,formData: FormData): Promise<void> => {
  const entries = Object.fromEntries(formData) as unknown as FormDataEntries;
  const {  name, email, password, tenants } = entries;
  let tenantObjects: Tenant[];
  try {
    tenantObjects = JSON.parse(tenants);
  } catch (error) {
    console.error("Error parsing tenant information:", error);
    throw new Error("Invalid tenant information format!");
  }
  await connectDB();
  const updateFields: Partial<FormDataEntries> & { tenant?: Tenant[] } = {
    name,
    email,
    ...(password && { password: await bcrypt.hash(password, 10) }),
    tenant: tenantObjects,
  };
  Object.keys(updateFields).forEach(
    (key) => (updateFields[key as keyof FormDataEntries] === "" || updateFields[key as keyof FormDataEntries] === undefined) && delete updateFields[key as keyof FormDataEntries]
  );
  try {
    await User.findByIdAndUpdate(id, updateFields, { new: true });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user!");
  }
  await revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUserOrgandName = async (id:string,formData: FormData): Promise<void> => {
  const entries = Object.fromEntries(formData) as unknown as FormDataEntries;
  const {  name, email, tenants } = entries;
  let tenantObjects: Tenant[];
  try {
    tenantObjects = JSON.parse(tenants);
  } catch (error) {
    console.error("Error parsing tenant information:", error);
    throw new Error("Invalid tenant information format!");
  }
  await connectDB();
  const updateFields: Partial<FormDataEntries> & { tenant?: Tenant[] } = {
    name,
    email,
    tenant: tenantObjects,
  };
  Object.keys(updateFields).forEach(
    (key) => (updateFields[key as keyof FormDataEntries] === "" || updateFields[key as keyof FormDataEntries] === undefined) && delete updateFields[key as keyof FormDataEntries]
  );
  try {
    await User.findByIdAndUpdate(id, updateFields, { new: true });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user!");
  }
  await revalidatePath("/profile");
  redirect("/profile");
};


export const getUserById = async (userId: string): Promise<typeof User | null> => {
  try {
    await connectDB();
    const user = await User.findById(userId).select("tenant email password name role -_id");
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Error fetching user from database.');
  }
};
