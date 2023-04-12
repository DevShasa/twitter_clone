import React from 'react'
import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'

type Props = {}

const Sidebar = (props: Props) => {
    const items = [
        {
            label:'Home',
            href:"/",
            icon: BsHouseFill
        },
        {
            label:'Notifications',
            href:"/notifications",
            icon: BsHouseFill
        },
        {
            label:'Profile',
            href:"/users/123",
            icon: FaUser
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
                            />
                        )
                    })}
                    <SidebarItem 
                        icon={BiLogOut}
                        label="Logout"
                        click={()=>console.log()}
                    />
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar