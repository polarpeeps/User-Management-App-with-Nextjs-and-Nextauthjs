import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
// export async function GET(req:Request, res: NextResponse){
//   try {
//     await connectDB().catch(err=>NextResponse.json(err));
//     console.log(req.query)
//     const id= req.query;
//     const user=await User.findOne({_id:id})
//     return NextResponse.json({
//       success:true,
//       user,
//     })
      
//   } catch (error:any) {
//     console.log(error.message)
//     return NextResponse.json({
//       success:false,
//       error:error
//     },{status:500})
//   }
// }
// File: app/api/auth/user/[id]/route.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// // import connectDB from '@/lib/connectDB'; // Adjust the import path as necessary
// // import User from '@/models/user'; // Adjust the import path as necessary

// // Adjust the function signature to match Next.js API route conventions
// export async function GET(req: Request, res: NextApiResponse) {
//   try {
//     await connectDB().catch(err => res.status(500).json(err));

//     const { id } = req.json(); // Next.js automatically populates `req.query` with URL parameters
//     const user = await User.findOne({ _id: id });

//     if (user) {
//       return NextResponse.json({
//         success: true,
//         user,
//       },{status:200});
//     } else {
//       return NextResponse.json({
//         success: false,
//         error: "User not found"
//       },{status:404});
//     }
//   } catch (error: any) {
//     console.log("error fetching user data", error.message);
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     },{status:404});
//   }
// }
export async function GET(req: NextApiRequest,res:NextResponse) {
  try {
    await connectDB();

    console.log(req); // Check what's actually in `req.query`

    const id = req.query.id; // Access 'id' without destructuring
    if (!id) {
      return NextResponse.json({ success: false, error: "No ID provided" },{status:404});
    }

    const user = await User.findOne({ _id: id });
    // Continue with your logic...
  } catch (error: any) {
    console.log("error fetching user data", error.message);
    return NextResponse.json({
      success: false,
      error: error.message
    },{status:404});
  }
}
