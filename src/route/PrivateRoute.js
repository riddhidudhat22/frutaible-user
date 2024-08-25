import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import authlogin, { authcheck } from '../redux/reducer/slice/authlogin';

function PrivateRoute(props) {
    // const auth = true
    const [loading,setloading]=useState(true)
    const {isAuthantication}=useSelector(state => state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        const authhome=async()=>{
           try {
           await dispatch(authcheck())
           } catch (error) {
            navigate("/login")
           }finally{
            setloading(false)
           }
        }

        authhome()
    },[dispatch,navigate])

    if (loading) {
        return <div>Loading.....</div>
    }
    return (
        // auth ? <Outlet /> : <Navigate to={'/'} replace />
        isAuthantication?<Outlet /> : <Navigate to={'/login'} replace />
    );
}

export default PrivateRoute;