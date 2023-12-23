
import Loader from "./Loader"
import GridPostList from "./GridPostList"

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {

    if (isSearchFetching) {
        return (<Loader />)

    } else if (searchedPosts && searchedPosts.documents.length > 0) {
        return <GridPostList posts={searchedPosts.documents} />;
    }
    else {
        return (
            <div className="flex flex-col gap-2 items-center w-full">
                <p className="text-light-4 mt-10">No results found</p>
                <p className="text-light-4 small-regular ">Try seaching by caption</p>
            </div>
        )
    }

}
export default SearchResults