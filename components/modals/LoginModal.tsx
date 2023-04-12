import React, { useCallback, useState } from 'react'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '../Input'
import Modal from '../Modal'

type Props = {}

const LoginModal = (props: Props) => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try {
            setIsloading(true)

            // todo add login


            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally{
            setIsloading(false)
        }
    },[loginModal])

    const onToggle = useCallback(()=>{
        if(isLoading) return

        loginModal.onClose()
        registerModal.onOpen()
        
    },[isLoading, registerModal, loginModal])

    const bodyContent =  (
        <div className='flex flex-col gap-4'>
            <Input 
                placeHolder='Email'
                change={(event)=>setEmail(event.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeHolder='Password'
                change={(event)=>setPassword(event.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )


    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>First time using twitter 
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                    "    
                > 
                    {" "}Create an account
                </span>
            </p>
        </div>
    )
    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel='Sign in'
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal