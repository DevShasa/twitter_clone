import React, { useCallback } from 'react';
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa"
import useLoginModal from '@/hooks/useLoginModal';

type Props = {}

const SidebarTweetButton = (props: Props) => {

    const router = useRouter();
    const loginModal = useLoginModal()

    const onClick = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])

    return (
        // <div onClick={()=> router.push("/")}>
        <div onClick={onClick}>
            {/* mobile version */}
            <div
                className='
                    mt-6
                    lg:hidden
                    rounded-full
                    h-14
                    w-14
                    p-4
                    flex
                    items-center
                    justify-center
                    bg-sky-500
                    hover:bg-opacity-80
                    transition
                    cursor-pointer
                '
            >
                <FaFeather size={24} color="white"/>
            </div>

            {/* Desktop version */}
            <div
                className='
                    mt-6
                    hidden
                    lg:block
                    rounded-full
                    px-4
                    py-4
                    bg-sky-500
                    hover:bg-opacity-80
                    transition
                    cursor-pointer
                '
            >
                <p className="
                    hidden
                    lg:block
                    text-center
                    font-semibold
                    text-white
                    text-[20px]
                ">
                    Tweet
                </p>
            </div>
        </div>
    )
}

export default SidebarTweetButton