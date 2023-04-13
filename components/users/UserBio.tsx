import { useMemo } from 'react'
import { BiCalendar } from "react-icons/bi"
import { format } from "date-fns"
import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from "@/hooks/useUser";



type Props = {
    userId:string
}

const UserBio = (props: Props) => {

    const { userId } = props
    const { data:currentUser } = useCurrentUser() // user who is logged into the session
    const { data:fetchedUser } = useUser(userId) // fetch a specific user

    const createdAt = useMemo(()=>{
        if(!fetchedUser?.createdAt) return null
        return format(new Date(fetchedUser.createdAt), 'MMM yyyy')
    },[fetchedUser?.createdAt])

    return (
        <div>UserBio</div>
    )
}

export default UserBio