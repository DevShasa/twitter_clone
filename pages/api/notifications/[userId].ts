import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { withMethods } from "@/middleware/withMethod";


async function handler(req: NextApiRequest, res:NextApiResponse){
    console.log("<<<<<REQUEST FOR NOTIFICATION>>>>")
    try {
        const { userId } = req.query
        if(!userId || typeof userId !== "string"){throw new Error("Id is invalid api/notification")}

        const notification = await prisma.notification.findMany({
            where:{userId},
            orderBy:{
                createdAt:"desc"
            }
        })
        // after fetching the notification then remove notification flag
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                hasNotification: false
            }
        })
        console.log("THE NOTIFICATION IS--->>>", notification)

        return res.status(200).json(notification)

    } catch (error) {
        console.log("Error fetching notifications---->", error)
        return res.status(400).end();
    }
}

export default withMethods(["GET"], handler)