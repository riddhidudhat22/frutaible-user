import React from 'react';
import { Inputbox, Spantag } from './input.styled';

function Input({ errorText, ...res }) {
    return (
        <>
            <Inputbox  {...res}

            />

            <Spantag>
                {errorText}
            </Spantag>
        </>
    );
}

export default Input;  