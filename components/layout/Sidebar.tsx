import React from 'react'
import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import useCurrentUser from '@/hooks/useCurrentUser'

import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import { signOut } from 'next-auth/react'


type Props = {}

const Sidebar = (props: Props) => {

    const {data: currentUser} = useCurrentUser()

    const items = [
        {
            label:'Home',
            href:"/",
            icon: BsHouseFill
        },
        {
            label:'Notifications',
            href:"/notifications",
            icon: BsHouseFill,
            auth: true
        },
        {
            label:'Profile',
            href:`/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        }
    ]
    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {items.map((item)=>{
                        return (
                            <SidebarItem 
                                key={item.href} 
                                href={item.href} 
                                label={item.label} 
                                icon={item.icon}
                                auth={item.auth}
                            />
                        )
                    })}
                    {currentUser && (
                        <SidebarItem 
                            icon={BiLogOut}
                            label="Logout"
                            click={()=>signOut()}
                        />
                    )}

                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar