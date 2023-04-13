import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import useCurrentUser from "@/hooks/useCurrentUser"
import useLoginModal from '@/hooks/useLoginModal'

type Props = {
    label:string,
    href?:string,
    icon: IconType
    click?: () => void
    auth?: boolean // indicates a protected route
}

const SidebarItem = (props: Props) => {
    const { label, href, icon:Icon, click, auth } = props

    const { data:currentuser } = useCurrentUser()

    const router = useRouter()
    const loginModal = useLoginModal()

    const handleClick = useCallback(()=>{
        if(click){
            return click()
        }

        if(auth && !currentuser){
            // auth is present and there is no currentuser in the session
            // open the login modal
            loginModal.onOpen()
        } else if(href){
            router.push(href)
        }
        
    },[router, href, click, auth, currentuser, loginModal])

    return (
        <div className='flex flex-row items-center' onClick={handleClick}>
            {/* mobile first div */}
            <div
                className='
                    relative
                    rounded-full
                    h-14
                    w-14
                    flex
                    items-center
                    justify-center
                    p-4
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                    lg:hidden
                '
            >
                <Icon size={28} color='white'/>
            </div>

            {/* desktop first div */}
            <div
                className="
                    relative
                    hidden
                    lg:flex
                    items-center
                    gap-4
                    p-4
                    rounded-full
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                "
            >
                <Icon size={28} color='white'/>
                <p
                    className='hidden lg:block text-white text-xl'
                >
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SidebarItem