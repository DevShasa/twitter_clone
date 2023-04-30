import axios from "axios"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId:string)=>{
    const {data:currentUser, mutate:mutateCurrentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(userId)

    const loginModal = useLoginModal();

    const isFollowing = useMemo(()=>{
        // return true if current user is following the user whose id we passed as arg
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    },[currentUser, userId])

    const toggleFollow = useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            if(isFollowing){
                // current user is following the id of the user we passed in
                await axios.delete('/api/follow', {params:{userId}})
                toast.success("Successfuy unfollowed")
            }else{
                toast.success("Successfuy followed user")
                await axios.post('/api/follow', {userId})
            }

            mutateCurrentUser()
            mutateFetchedUser()
            
        }catch(error){
            console.log(error)
            toast.error("Error performing follow action")
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal])


    return {isFollowing, toggleFollow}
}

export default useFollow;