import { NextApiRequest, NextApiResponse } from "next"
import serverAuth from "@/libs/serverAuth"
import { withMethods } from "@/middleware/withMethod"
import prisma from "@/libs/prismadb"

async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        if(req.method === "POST"){
            const {currentUser} = await serverAuth(req, res)
            const { body } = req.body

            const post = await prisma.post.create({
                data:{
                    body,
                    userId:currentUser?.id
                }
            })

            return res.status(200).json(post)
        }

        if(req.method === "GET"){
            const { userId } = req.query
            let posts

            if(userId && typeof userId ==="string"){
                posts = await prisma.post.findMany({
                    where:{
                        userId
                    },
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }else{
                // when there is no user passed in the query
                posts = await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }

            return res.status(200).json(posts)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}

export default withMethods(["GET", "POST"],handler)