import { cp } from "fs"
import CommentItem from "./CommentItem"

type Props = {
    comments?: Record<string, any>[]
}

const CommentFeed = ({comments=[]}: Props) => {
    return (
        <>
            {comments.map((comment:Record<string, any>)=>(
                <CommentItem key={comment.id} data={comment}/>
            ))}
        </>
    )
}

export default CommentFeed