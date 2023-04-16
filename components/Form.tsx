import {useCallback, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useEditModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePosts from '@/hooks/usePosts'
import usePost from '@/hooks/usePost'
import Avatar from './Avatar'
import Button from './Button'
import PostId from '@/pages/api/posts/[postId]'

type Props = {
    placeholder:string,
    isComment?:boolean,
    postId?:string,
}

const Form = ({placeholder, isComment, postId}: Props) => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const { data:currentUser } = useCurrentUser();
    const { mutate:mutatePosts } = usePosts();
    const { mutate:mutatePost } = usePost(postId as string)

    const [ body, setBody ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const onSubmit = useCallback(async()=>{
        try {
            setIsLoading(true)
            const url = isComment ? `/api/comments?postId${postId}` : `/api/posts`;

            await axios.post(url, { body })

            toast.success("Success created")
            setBody('')
            mutatePost()
            mutatePosts()

        } catch (error) {
            toast.error("Something went wrong")
            console.log("FORM ERROR ---->", error)
        }finally{
            setIsLoading(false)
        }
    },[body, mutatePosts, isComment, postId, mutatePost])

    return (
        <div>Form</div>
    )
}

export default Form