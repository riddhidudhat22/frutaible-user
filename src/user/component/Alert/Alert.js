import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import {useSelector } from 'react-redux'



function Alert(props) {
    const {color,message}=useSelector(state=>state.alert)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(()=>{
        if(message!=''){
            enqueueSnackbar(message,{ variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                  }
             })
        }
    },[message])
    return (
        <div>       
        </div>
    );
}

export default Alert;