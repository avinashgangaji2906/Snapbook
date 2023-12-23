import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type GridPostsProps = {
    posts: Models.Document[],
    showUser?: boolean,
    showStats?: boolean
}

const GridPostList = ({ posts, showUser = false, showStats = true }: GridPostsProps) => {

    const { user } = useUserContext();


    return (
        <ul className="grid-container">
            {posts.map((post) => (
                <li key={post.$id}
                    className="relative min-w-80 h-80">
                    <Link to={`/posts/${post.$id}`}
                        className="grid-post_link" >
                        <img
                            src={post.imageUrl}
                            alt="post"
                            className="h-full w-full object-cover" />

                    </Link>
                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex flex-1 justify-start items-center gap-2 ">
                                <img
                                    src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                    alt="profile"
                                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                                />
                                <p className="line-clamp-1 base-medium lg:body-bolder text-light-2">{post?.creator.name}</p>
                            </div>
                        )}
                        {showStats && (
                            <PostStats post={post} userId={user.id} />
                        )}
                    </div>
                </li>
            ))
            }
        </ul>
    )
}

export default GridPostList