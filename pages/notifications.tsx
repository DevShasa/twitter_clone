import Header from "@/components/Header"
import NotifcationsFeed from "@/components/NotifcationsFeed"
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"



const Notifications = () => {
    return (
        <>
            <Header showBackArrow label="Notifications"/>
            <NotifcationsFeed />
        </>
    )
}

export default Notifications


export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context)

    if(!session){
        return {
            redirect:{
                destination:'/',
                permanent: false,
            }
        }
    }

    return{
        props :{session}
    }
}

