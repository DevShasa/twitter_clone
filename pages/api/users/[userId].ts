// Get a specific user
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== "GET"){
        return res.status(405).end();
    }

    try {
        const { userId } = req.query;
        if(!userId || typeof userId !== 'string'){
            // there is no userid and its type is not equal to string
            throw new Error("Invalid ID")
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        const followerCount = await prisma.user.count({
        // go through all the user tables and count where
        // ... the the followingId's has userId
            where:{
                followingIds:{
                    has:userId
                }
            }
        })

        return res.status(200).json({...existingUser, followerCount})

    } catch (error) {
        console.log("Error fetching user with id, from api/users/[userId]")
        return res.status(400).end()
    }
}
