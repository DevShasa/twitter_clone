import {useCallback, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePosts from '@/hooks/usePosts'
import usePost from '@/hooks/usePost'
import Avatar from './Avatar'
import Button from './Button'

type Props = {
    placeholder:string,
    isComment?:boolean,
    postId?:string,
}

const Form = ({placeholder, isComment, postId}: Props) => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const { data:currentUser } = useCurrentUser();
    const { data:allPosts, mutate:mutatePosts } = usePosts(); // fetching all the posts
    const { mutate:mutatePost } = usePost(postId as string)

    const [ body, setBody ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    //console.log("ALL OF THE POSTS",  allPosts)

    const onSubmit = useCallback(async()=>{
        try {
            setIsLoading(true)
            const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;

            await axios.post(url, { body })

            toast.success("Success created")
            setBody('')
            mutatePost()
            mutatePosts() // refresh catch

        } catch (error) {
            toast.error("Something went wrong")
            console.log("FORM ERROR ---->", error)
        }finally{
            setIsLoading(false)
        }
    },[body, mutatePosts, isComment, postId, mutatePost])

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser 
                ?(
                    // user logged in, display the textbox
                    <div className='flex flex-row gap-4'>
                        <div className='mt-4'>
                            <Avatar userId={currentUser?.id}/>
                        </div>
                        <div className='w-full'>
                            <textarea
                                disabled={isLoading}
                                onChange={(event)=>setBody(event.target.value)}
                                value={body}
                                className='
                                    disabled:opacity:80
                                    resize-none
                                    peer
                                    mt-3
                                    w-full
                                    bg-black
                                    ring-0
                                    outline-none
                                    text-[20px]
                                    placeholder-neutral-500
                                    text-white
                                    focus:outline-neutral-600 outline-1 outline-offset-1 rounded p-4
                                '
                                placeholder={placeholder}
                            >
                            </textarea>
                            {/* <hr className='opacity-0 peer-focus:opacity-100 h-[2px] w-full border-neutral-800 transition'/> */}
                            <div className="mt-4 flex flex-row justify-end">
                                <Button disabled={isLoading || !body} click={onSubmit} label='Tweet'/>
                            </div>
                        </div>
                    </div>
                )
                :(
                    // user not logged in prompt them to login or register
                    <div className='py-8'>
                        <h1 className='text-white text-2xl text-center mb-4 font-bold'>
                            Welcome to twitter
                        </h1>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <Button label="Login" click={loginModal.onOpen}/>
                            <Button label="Register" click={registerModal.onOpen}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Form