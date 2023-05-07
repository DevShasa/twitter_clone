import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";
import { withMethods } from "@/middleware/withMethod";

async function handler(req:NextApiRequest, res:NextApiResponse){
    console.log("POST IDELETE", req.body)
    console.log("REQUEST METHOD", req.method)
    try {
        const { postId } = req.body;
        const { currentUser } = await serverAuth(req, res)

        if(!postId || typeof postId !== "string"){
            // make sure the postId passed in the body is good
            throw new Error("Invalid postId")
        }

        const post = await prisma.post.findUnique({
            // find the post 
            where:{
                id: postId
            }
        })

        if(!post){
            throw new Error("Could not find post")
        }

        // post has been found, extract the array of userId's that have liked it
        let updatedLikedIds = [...(post.likedIds || [])]

        if(req.method === "POST"){
            updatedLikedIds.push(currentUser.id) // we havent yet pushed to db
            
            //Create notification
            try {
                if(post?.userId){
                    // get the user id field from the post
                    await prisma.notification.create({
                        data:{
                            body:"Someone like your tweet!",
                            userId: post.userId
                        }
                    });

                    // After entry in notification table successfully created
                    await prisma.user.update({
                        where:{
                            id: post.userId
                        }, 
                        data:{
                            hasNotification: true
                        }
                    })
                }
            } catch (error) {
                console.log("ERROR CREATING NOTIFICATION", error)
            }
            // End of notification

        }

        if(req.method ==="PATCH"){
            // remove the id of current user from the post's likedid's 
            updatedLikedIds = updatedLikedIds.filter(lId => lId !== currentUser?.id)
        }

        // after changes made to the likes update post
        const updatePost = await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                likedIds:updatedLikedIds
            }
        })

        return res.status(200).json(updatePost)

    } catch (error) {
        console.log("ERROR FROM api/like",error)
        return res.status(400).end()
    }
}

export default withMethods(["POST", "DELETE", "PATCH"], handler)