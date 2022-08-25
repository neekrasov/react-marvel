import Helmet from "react-helmet"
import Banner from "../components/Banner/Banner"
import ComicsList from "../components/ComicsList/ComicsList"
export const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Basic information about comics"
                />
                <title> Comics </title>
            </Helmet>
            <Banner/>
            <ComicsList/>        
        </>
    )
}