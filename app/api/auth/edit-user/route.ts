import ForgotPasswordToken from "@/lib/models/ForgotPasswordToken";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {Resend} from 'resend';

const resend= new Resend(process.env.RESEND_API_KEY);
// export const getUserById = async (userId: string): Promise<typeof User | null> => {
//     try {
//       await connectDB();
//       const user = await User.findById(userId).select("tenant email password name role -_id");
//       return user;
//     } catch (error:any) {
//       console.error('Failed to fetch user:', error.message);
//       throw new Error('Error fetching user from database.');
//     }
//   };
  
export async function GET(req:Request){
  try {
    await connectDB().catch(err=>NextResponse.json(err));

    const {id}=await req.json();
    const user=await User.findOne({_id:id})
    return NextResponse.json({
      success:true,
      user,
    })
    
  } catch (error:any) {
    console.log("error reset mailst")
    return NextResponse.json({
      success:false,
      error:error
    },{status:500})
  }
}
