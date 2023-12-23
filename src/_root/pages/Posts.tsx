
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const Posts = () => {
    const { data: currentUser } = useGetCurrentUser();

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <>
            {currentUser.posts.length === 0 && (
                <p className="text-light-4">No posts Available</p>
            )}

            <GridPostList posts={currentUser.posts} showStats={false} />
        </>
    );
};

export default Posts;