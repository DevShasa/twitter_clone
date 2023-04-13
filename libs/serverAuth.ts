import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


const serverAuth = async(req:NextApiRequest, res:NextApiResponse) =>{
    const session = await getServerSession(req, res, authOptions)

    // grab the user from session
    if(!session?.user?.email){
        throw new Error('No user in session, not signed in, error from serverAuth.ts')
    }

    // confirm the user is inside the db
    const currentUser = await prisma.user.findUnique({
        where:{
            email:session.user.email,
        }
    });

    if(!currentUser){
        throw new Error("No such user, not signed in error from serverAuth.ts");
    }

    // return the user 
    return {currentUser}
}

export default serverAuth