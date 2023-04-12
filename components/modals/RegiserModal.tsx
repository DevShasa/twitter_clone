import React, { useCallback, useState } from 'react'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import Input from '../Input'
import Modal from '../Modal'

type Props = {}

const RegisterModal = (props: Props) => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [ email, setEmail ] = useState("")
    const [ name, setName ] = useState("")
    const [ userName, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try {
            setIsloading(true)

            // todo register and login

            registerModal.onClose()
        } catch (error) {
            console.log(error)
        } finally{
            setIsloading(false)
        }
    },[registerModal])

    const onToggle = useCallback(()=>{
        if(isLoading) return

        registerModal.onClose()
        loginModal.onOpen()
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
                placeHolder='Name'
                change={(event)=>setName(event.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeHolder='Username'
                change={(event)=>setUsername(event.target.value)}
                value={userName}
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
            <p>Already have an account? 
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                    "    
                > 
                    {" "}Sign in
                </span>
            </p>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel='Register'
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal