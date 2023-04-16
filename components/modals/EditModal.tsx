import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import Modal from '../Modal'
import Input from '../Input'
import ImageUpload from '../ImageUpload'

type Props = {}

const EditModal = (props: Props) => {

    const { data:currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [ profileImage, setProfileImage ] = useState("")
    const [ coverImage, setCoverImage ] = useState("")
    const [ name, setName ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{
        // preload the data
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    },[currentUser?.profileImage,currentUser?.coverImage,currentUser?.name,currentUser?.username,currentUser?.bio ])


    const onSubmit = useCallback(async()=>{
        try {
            setLoading(true)
            await axios.patch("/api/edit", { name, username, profileImage, coverImage, bio })
            // refetch the data
            mutateFetchedUser();
            toast.success("Updated");
            editModal.onClose()
        } catch (error) {
            toast.error("Could not update user")
            console.log("ERROR UPDATING USER from editmodal.tsx", error)
        }finally{
            setLoading(false)
        }
    },[editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={loading}
                change={(image)=>setProfileImage(image)}
                label="Upload profile image"
            />
            <ImageUpload 
                value={coverImage}
                disabled={loading}
                change={(image)=>setCoverImage(image)}
                label="Upload cover image"
            />
            <Input 
                placeHolder="name"
                change={(event:React.ChangeEvent<HTMLInputElement>)=>setName(event.target.value)}
                value={name}
                disabled={loading}
            />
            <Input 
                placeHolder="Username"
                change={(e)=>setUsername(e.target.value)}
                value={username}
                disabled={loading}
            />
            <Input 
                placeHolder="Bio"
                change={(e)=>setBio(e.target.value)}
                value={bio}
                disabled={loading}
            />
        </div>
    )

    return (
        <Modal 
            disabled={loading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal