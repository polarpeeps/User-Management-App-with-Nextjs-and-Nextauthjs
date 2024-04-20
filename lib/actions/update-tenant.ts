"use server";
import { revalidatePath } from "next/cache";
import connectDB from "../mongodb";
import { redirect } from "next/navigation";
import TenantModel from "../models/tenants.model";
import { useToast } from "@/components/ui/use-toast";

type FormDataEntries = {
    name: string;
    industry:string;
    description:string;
  };
export const updateTenant = async (id:string,formData: FormData): Promise<void> => {
  const entries = Object.fromEntries(formData) as unknown as FormDataEntries;
  const {  name, description,industry } = entries;
  await connectDB();
  const updateFields: Partial<FormDataEntries>  = {
    name,
    description,
    industry
  };
  Object.keys(updateFields).forEach(
    (key) => (updateFields[key as keyof FormDataEntries] === "" || updateFields[key as keyof FormDataEntries] === undefined) && delete updateFields[key as keyof FormDataEntries]
  );
  try {
    await TenantModel.findByIdAndUpdate(id, updateFields, { new: true });
    // console.log("kaam hogya")

  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};