import React from 'react';
import { Basebutton, PrimaryButton, SecondaryButton } from './Button.styled';
import { formLabelClasses } from '@mui/material';



function Button({ children, btnType = 'primary',btndisabaled=false, ...rest }) {
    console.log(btnType);

    const checkbuttontype = () => {
        switch (btnType) {
            case 'primary':
                return PrimaryButton

            case 'secondary':
                return SecondaryButton
            default:
                return PrimaryButton
        }
    }

    const Custombutton = checkbuttontype();

    return (
        <Custombutton disabled={btndisabaled} {...rest}>
            {children}
        </Custombutton>
    );
}

export default Button;