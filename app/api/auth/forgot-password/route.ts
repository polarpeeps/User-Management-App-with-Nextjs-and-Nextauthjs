import ForgotPasswordToken from "@/lib/models/ForgotPasswordToken";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {Resend} from 'resend';

const resend= new Resend(process.env.RESEND_API_KEY);
export async function POST(req:Request){
  try {
    await connectDB().catch(err=>NextResponse.json(err));

    const {email}=await req.json();
    const user=await User.findOne({email:email})

    if(!user){
      return NextResponse.json({
        success:false,
        error:"User with this email does not exist"
      },{status:404})
    }

    const resetToken= `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g,'');

    const tokenRes=await ForgotPasswordToken.create({
      userId:user._id,
      token:resetToken,
      resetAt:null
    })
    console.log("firsend reset mailst")

    const resetPasswordLink=`${process.env.NEXTAUTH_URL}/reset-password/${tokenRes.token}`
    console.log(resetPasswordLink);
    console.log(email)
    resend.emails.send({
      from: 'user-manage <onboarding@resend.dev>',
      to: `${email}`,
      subject: 'Reset Password Link',
      html: `<p>Click here to reset your password - ${resetPasswordLink}</p>`
    });

    return NextResponse.json({
      success:true,
      message:"Please follow instructions to reset password. If email is not received checck spam folder"
    })
    
  } catch (error:any) {
    console.log("error reset mailst")
    return NextResponse.json({
      success:false,
      error:error
    },{status:500})
  }
}
