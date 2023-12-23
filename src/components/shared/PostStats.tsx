import React, { useEffect, useState } from "react"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations"
import { checkIsLiked } from "@/lib/utils"
import { Models } from "appwrite"
import Loader from "./Loader"

type PostStatsProps = {
    post?: Models.Document,
    userId: string
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const [likes, setlikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();
    const { data: currentUser } = useGetCurrentUser()

    const savedPostRecord = currentUser?.save.find((record: Models.Document) =>
        record.post.$id === post?.$id);
    useEffect(() => {
        setIsSaved(!!savedPostRecord)  // savedPostRecord ? true : false
    }, [currentUser])


    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation(); // likes only on heart symbol n not on post

        let newLikes = [...likes]; // copies the likes array into newLikes

        const hasLiked = newLikes.includes(userId) // returns boolean

        if (hasLiked) {
            // If the user has already liked the post, remove their like
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId)
        }

        likePost({ postId: post?.$id || '', likesArray: newLikes })
        setlikes(newLikes)

    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false)
            deleteSavedPost(savedPostRecord.$id)
            return;
        } else {
            savePost({ postId: post?.$id || '', userId })
            setIsSaved(true)
        }

    }


    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img
                    src={checkIsLiked(likes, userId) ?
                        "/assets/icons/liked.svg" :
                        "/assets/icons/like.svg"
                    }
                    alt="like"
                    height={20}
                    width={20}
                    className="cursor-pointer"
                    onClick={handleLikePost}
                />
                <p className="small-medium lg:base-medium text-light-3">{likes.length} likes</p>
            </div>
            <div className="flex gap-2">
                {isSavingPost || isDeletingSavedPost ? <Loader /> :
                    <img
                        src={isSaved ?
                            "/assets/icons/saved.svg" :
                            "/assets/icons/save.svg"
                        }
                        alt="save"
                        height={20}
                        width={20}
                        className="cursor-pointer"
                        onClick={handleSavePost}
                    />}
            </div>

        </div>
    )
}

export default PostStats