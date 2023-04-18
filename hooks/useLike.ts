import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

interface IuseLike{
    postId: string,
    userId?:string
}

const useLike = (args:IuseLike) =>{
    const { postId, userId } = args
    
    const { data:currentUser } = useCurrentUser()
    const { data:fetchedPost, mutate:mutateFetchedPost} = usePost(postId) // refresh a specific post
    const { mutate:mutateFetchedPosts } = usePosts(userId) // refresh all user's posts

    const loginModal = useLoginModal();

    const hasLiked = useMemo(()=>{
        // Find if a currentuser has liked a specific post
        const list = fetchedPost?.likedIds || []
        return list.includes(currentUser?.id)
    },[fetchedPost, currentUser])

    const toggleLike = useCallback(async ()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        try {
            if (hasLiked){
                console.log("DELETE ACTION POSTID", postId)
                //await axios.patch('/api/like', { data: { postId} });

            await fetch( '/api/like', {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({postId:postId})
                })
                toast.success("Success")

            }else{
                await axios.post(`/api/like`, {postId})
                toast.success("Success")
            }

            mutateFetchedPost()
            mutateFetchedPosts()
            
        } catch (error) {
            console.log("Error perfoming like operation", error)
            toast.error("Something went wrong")
        }
    },[currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal])

    return { hasLiked, toggleLike }
}

export default useLike;