import usePosts from "@/hooks/usePosts"
import PostItem from "./PostItem"

type Props = {
    userId?: string;
}

const PostFeed = (props: Props) => {

    const { userId } = props
    const { data:posts = [] } = usePosts(userId)

    console.log("ALL OF THE POSTS",posts)

    return (
        <>
            {posts.map((post: Record<string, any>)=>(
                <PostItem userId={userId} key={post.id} data={post}/>
            ))}
        </>
    )
}

export default PostFeed