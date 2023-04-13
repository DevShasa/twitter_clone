import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method !== "POST" && req.method !== "DELETE"){
        // method is neither post nor delete
        return res.status(405).end();
    }

    try {
        const { userId } = req.body

        if(!userId || typeof userId !== "string"){
            throw new Error('Invalid ID')
        }

        const { currentUser } = await serverAuth(req, res)

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });

        if(!user){
            throw new Error("Could not find user in the db, invalid ID")
        }

        let updatedFollowings = [...(user.followingIds || [])]

        // up to this point we have the the user fetched from request body...
        // ... user object fetched from db and the current user in session
        
        if(req.method === "POST"){
            // if the request passed in was POST meaning currentuser has followed user
            updatedFollowings.push(userId)

            // notification part start
            try{
                await prisma.notification.create({
                    data:{
                        body: "Someone followed you",
                        userId
                    }
                })

                await prisma.user.update({
                    where:{
                        id:userId
                    },
                    data:{
                        hasNotification: true 
                    }
                })
            }catch(error){
                console.log("NOTIFICATION ERROR", error)
            }
        }


        if(req.method === "DELETE"){
            updatedFollowings = updatedFollowings.filter(followingId => followingId !== userId)
        }

        const updatedUser = await prisma.user.update({
            where:{id: currentUser.id},
            data:{followingIds:updatedFollowings}
        })

        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
    }
}