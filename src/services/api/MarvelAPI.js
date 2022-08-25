import { useHttp } from "../../hooks/http.hook";

export const useMarvelAPI = () => {
    const _apiBaseURL ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=515c4f46b9ee3419f3020f0655af98bc';

    const _limitBase ='limit=9&';
    const _offsetBase = 'offset={}&';

    const _allCharactersURI = 'characters?';
    const _singleCharacterURI = `characters/{}?`;

    const _allComicsURI = 'comics?';
    const _singleComicURI = `comics/{}?`;

    const _filterByName = 'name={}&';


    const _transformCharacterResponse = (response) => {
        return {
            id: response.id,
            charName: response.name,
            charDescription: response.description,
            charPreview: response.thumbnail.path + '.' + response.thumbnail.extension,
            homepageLink: response.urls[0].url,
            wikiLink: response.urls[1].url,
            comics: response.comics.items.length > 10? response.comics.items.slice(0, 10) : response.comics.items,
        };
    }

    const _transformComicsResponse = (response) => {
        return {
            id: response.id,
            title: response.title,
            description: response.description,
            pageCount: response.pageCount,
            language: response.textObjects.length !==0? response.textObjects[0].language : null,
            price: response.prices[0].price === 0? "NOT AVAILABLE": response.prices[0].price + "$",
            thumbnail: response.thumbnail.path + '.' + response.thumbnail.extension,
        };
    }

    const {isLoaded, isError, request, clearError} = useHttp();

    const getAllCharacters = async (offset = 301) =>{
        const response = await request(_apiBaseURL + _allCharactersURI + _limitBase + _offsetBase.replace('{}', offset)+ _apiKey);
        return response.data.results.map(_transformCharacterResponse);
    } 
    
    const getCharacter = async (id) =>  {
        const response = await request(_apiBaseURL + _singleCharacterURI.replace("{}", id)+ _apiKey);
        return _transformCharacterResponse(response.data.results[0]);
    }

    
    const getAllComics= async (offset = 200) =>{
        const response = await request(_apiBaseURL + _allComicsURI + _limitBase.replace(9, 8) + _offsetBase.replace('{}', offset)+ _apiKey);
        return response.data.results.map(_transformComicsResponse);
    } 
    
    const getComic = async (id) =>  {
        const response = await request(_apiBaseURL + _singleComicURI.replace("{}", id)+ _apiKey);
        return _transformComicsResponse(response.data.results[0]);
    }

    const getCharactersByName = async (name) =>  {
        const response = await request(_apiBaseURL + _allCharactersURI + _filterByName.replace('{}', name) +  _apiKey);
        return response.data.results.map(_transformCharacterResponse);
    }

    return {isLoaded, isError, clearError, getCharacter, getAllCharacters, getAllComics, getComic, getCharactersByName};

}