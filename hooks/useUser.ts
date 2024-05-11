// fetch individual user 
import useSWR from 'swr'

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) =>{
    const { 
            data, 
            error, 
            isLoading, 
            mutate // whenever this is called any subscriber to useuser(userid) gets an update
        } = useSWR(userId ? `/api/users/${userId}` : null, fetcher)

    return { data, error, isLoading, mutate }
};

export default useUser