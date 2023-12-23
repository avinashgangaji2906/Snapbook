import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import SearchResults from '@/components/shared/SearchResults';
import GridPostList from '@/components/shared/GridPostList';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import useDebounce from '@/hooks/useDebounce';
import Loader from '@/components/shared/Loader';
import { useInView } from 'react-intersection-observer';
import { FaTimes } from "react-icons/fa"

const Explore = () => {

    const { ref, inView } = useInView();
    const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 500);
    const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

    useEffect(() => {
        if (inView && !searchValue) {
            fetchNextPage();
        }
    }, [inView, searchValue]);

    if (!posts)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults &&
        posts.pages.every((item) => item?.documents.length === 0);  // if length == 0 , returns true
    // console.log(shouldShowPosts)
    // console.log(posts.pages.every((item) => item?.documents.length === 0))
    // posts.pages.map((item, index) => console.log(item?.documents))

    return (
        <div className='explore-container'>
            <div className="explore-inner_container">
                <div className="flex gap-2 w-full max-w-5xl">
                    <img
                        src="/assets/icons/posts.svg"
                        alt="users"
                        width={36}
                        height={36}
                        className="invert-white" />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Search Posts</h2>
                </div>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                    <img src="/assets/icons/search.svg"
                        height={24}
                        width={24}
                        alt="search" />
                    <Input
                        type='text'
                        placeholder='Search'
                        className='explore-search'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}

                    />
                    {searchValue && (
                        <FaTimes
                            className="relative right-2 top-1/2 transform -translate-y-1/2 border-none bg-none cursor-pointer text-light-3"
                            onClick={() => setSearchValue('')}
                        />

                    )}
                </div>
            </div>
            <div className="flex-between w-full max-w-5xl mt-12 mb-7">
                <h3 className="body-bold md:h3-bold">Popular Today</h3>
                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2
                cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">All</p>
                    <img
                        src="/assets/icons/filter.svg"
                        alt="filter"
                        width={20}
                        height={20}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {shouldShowSearchResults ? (
                    <SearchResults
                        isSearchFetching={isSearchFetching}
                        searchedPosts={searchedPosts}
                    />
                ) : shouldShowPosts ? (
                    <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
                ) : (
                    posts.pages.map((item, index) => (
                        item && <GridPostList key={`page-${index}`} posts={item.documents} />
                    ))
                )}
            </div>
            {hasNextPage && !searchValue && (
                <div ref={ref} className='mt-10'>
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default Explore