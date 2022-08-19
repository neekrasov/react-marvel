export default class MarvelAPI {
    _apiBaseURL ='http://gateway.marvel.com/v1/public/';
    _apiKey ='apikey=515c4f46b9ee3419f3020f0655af98bc';
    _limitCharacters ='limit=9&';
    _offsetCharacters = 'offset=300&';
    _allCharactersURI = 'characters?';
    _singleCharacterURI = `characters/{}?`;

    _transformResponse = (response) => {
        return {
            id: response.id,
            charName: response.name,
            charDescription: response.description,
            charPreview: response.thumbnail.path + '.' + response.thumbnail.extension,
            homepageLink: response.urls[0].url,
            wikiLink: response.urls[1].url
        }
    }


    get = async (url, apiKey) => {
        let response = await fetch(url+apiKey);
        if (!response.ok) throw new Error(`Not fetch, status code ${response.status}`)
        return await response.json();
    }

    getAllCharacters = async () =>{
        const response = await this.get(this._apiBaseURL + this._allCharactersURI + this._limitCharacters + this._offsetCharacters, this._apiKey);
        return response.data.results.map(this._transformResponse)
    } 
    
    getCharacter = async (id) =>  this._transformResponse(
        (await this.get(this._apiBaseURL + this._singleCharacterURI.replace("{}", id), this._apiKey)).data.results[0])

}