import { useEffect } from 'react';
import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetPosts, useGetRecentPosts, useGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useInView } from 'react-intersection-observer';
import UserCard from '@/components/shared/UserCard';

const Home = () => {

  const { ref, inView } = useInView()
  const { fetchNextPage, hasNextPage } = useGetPosts();
  const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();
  const { data: creators, isLoading: isUserLoading } = useGetUsers(10);

  useEffect(() => {

    if (inView) fetchNextPage()

  }, [inView]);


  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h3 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h3>
          {isPostsLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 w-full gap-9'>
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
        {hasNextPage && (
          <div ref={ref} className='mt-10 '>
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home