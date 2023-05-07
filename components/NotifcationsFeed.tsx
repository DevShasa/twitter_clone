import { BsTwitter } from "react-icons/bs"
import useNotifications from "@/hooks/useNotification"
import useCurrentUser from "@/hooks/useCurrentUser"
import { useEffect } from "react"

const NotifcationsFeed = () => {

    const { data:currentUser, mutate:mutateCurrentUser } = useCurrentUser()
    const { data:fetchedUserNotifications } = useNotifications(currentUser?.id)

    // everytime a notification is requested the user field is updated to...
    // set the notification flag to false, wo we need to make sure the user data..
    // in catche is up to date
    useEffect(()=>{
        mutateCurrentUser();
    },[mutateCurrentUser])


    if(fetchedUserNotifications?.length === 0){
        return(
            <div className="text-neutral-600 text-center p-6 text-xl">
                No notifications
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {fetchedUserNotifications?.map((notification:Record<string, any>)=>(
                <div 
                    key={notification.id}
                    className="
                        flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800
                    "
                >
                    <BsTwitter color="white" size={32}/>
                    <p className="text-white">
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default NotifcationsFeed