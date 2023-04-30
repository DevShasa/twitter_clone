import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth"


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST' && req.method !== 'DELETE'){
        return res.status(405).end()
    }

    
    try{
        const { currentUser } = await serverAuth(req, res) // get the currently logged in user

        const userId = req.method ==="POST"
                            ? req.body.userId
                            : req.query.userId

        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID")
        }

        const user = await prisma.user.findUnique({
            // find the user whose Id is in userId
            where:{
                id:userId
            }
        })

        if(!user){
            throw new Error("Could not fetch the user, api/follow.ts")
        }

        // extract updated followings
        let updatedFollowingIds = [...(currentUser?.followingIds || [])]

        if(req.method ==="POST"){
            updatedFollowingIds.push(userId)

            // notification part
        }

        if(req.method ==="DELETE"){
            updatedFollowingIds = updatedFollowingIds.filter(id => id !== userId)
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                followingIds:updatedFollowingIds
            }
        })

        return res.status(200).json(updatedUser)

    }catch(error){
        console.log("ERROR FOLLOWING USER from api/following --->",error)
        return res.status(400).end()
    }
}