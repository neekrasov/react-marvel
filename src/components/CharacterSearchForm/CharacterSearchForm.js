import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useMarvelAPI} from '../../services/api/MarvelAPI';
import './CharacterSearchForm.sass';

export const CharacterSearchForm = ({setFilterCharacters}) => {
    const [chars, setChars] = useState(null);
    const {isLoaded, isError, getCharactersByName, clearError} = useMarvelAPI();

    const updateChar = (name) => {
        clearError();

        getCharactersByName(name)
            .then(result=>{
                setChars(result)
                setFilterCharacters(result)
            });
        ;
    }
    const errorMessage = isError ? <div className="char__search-critical-error">An unexpected error occurred, please try again</div> : null;
    const results = !chars ? null : chars.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">OK</div>
                    </div>: 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={!isLoaded}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}
