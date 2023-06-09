import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/libs/prismadb";

export default async function handler (req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    // fetch all users
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        console.log("Error fetching all users from api/users/index.ts")
        return res.status(400).end();
    }
}