import React from 'react';
import google from '../../assets/google.png'
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const GoogleAuthSystem = () => {


    const { googleLoginSystem } = useAuth()
    const navigate = useNavigate()

    const handleGoogleAuth = () => {
        googleLoginSystem()
            .then(res => {
                console.log(res.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='flex justify-center'>
            <button onClick={handleGoogleAuth} className='btn w-32'>
                <img className='w-5' src={google} alt="" />
                Google
            </button>
        </div>
    );
};

export default GoogleAuthSystem;