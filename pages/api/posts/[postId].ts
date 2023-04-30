import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
import { withMethods } from "@/middleware/withMethod";

async function handler(req:NextApiRequest, res:NextApiResponse){


    try{
        const { postId } = req.query
        if(!postId || typeof postId !== 'string'){
            throw new Error('Invalid post id, api/posts/[postid]')
        }

        const post = await prisma.post.findUnique({
            where:{
                id:postId
            },
            include:{
                user:true,
                comments:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                }
            }
        })

        return res.status(200).json(post)
    }catch(error){
        console.log("Error fetching individual post posts/[postid]")
        return res.status(400).end()
    }
}

export default withMethods(["GET"], handler)