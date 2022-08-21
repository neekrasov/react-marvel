import { useHttp } from "../../hooks/http.hook";

export const useMarvelAPI = () => {
    const _apiBaseURL ='http://gateway.marvel.com/v1/public/';
    const _apiKey ='apikey=515c4f46b9ee3419f3020f0655af98bc';
    const _limitCharacters ='limit=9&';
    const _offsetCharacters = 'offset={}&';
    const _allCharactersURI = 'characters?';
    const _singleCharacterURI = `characters/{}?`;

    const _transformResponse = (response) => {
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

    const {isLoaded, isError, request, clearError} = useHttp();

    const getAllCharacters = async (offset = 301) =>{
        const response = await request(_apiBaseURL + _allCharactersURI + _limitCharacters + _offsetCharacters.replace('{}', offset)+ _apiKey);
        return response.data.results.map(_transformResponse)
    } 
    
    const getCharacter = async (id) =>  {
        const response = await request(_apiBaseURL + _singleCharacterURI.replace("{}", id)+ _apiKey);
        return _transformResponse(response.data.results[0])
    }

    return {isLoaded, isError, getCharacter, getAllCharacters, clearError}

}