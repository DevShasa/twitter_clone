// fetches data

import axios from 'axios'

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function fetcher(url:string){
    // returns a promise that will resolve into data when it is available
    return axios.get(url).then(res =>{
        return res.data
    })
}

export default fetcher