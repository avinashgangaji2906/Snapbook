import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type SearchPostsProps = {
    isSearchFetching: boolean,
    searchedPosts: Models.Document[],
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchPostsProps) => {

    if (isSearchFetching) return (<Loader />)

    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }

    return (
        <div className="flex flex-col gap-2 items-center w-full">
            <p className="text-light-4 mt-10">No results found</p>
            <p className="text-light-4 small-regular ">Try seaching by caption</p>
        </div>
    )
}

export default SearchResults