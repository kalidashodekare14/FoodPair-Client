import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import GoogleAuthSystem from '../../Components/GoogleAuthSystem/GoogleAuthSystem';

const Register = () => {


    const { registerSystem } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        registerSystem(data.email, data.password)
            .then(res => {
                console.log(res.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="card bg-base-100 w-96 shrink-0 shadow-2xl">
                    <h1 className='text-4xl text-center mt-5'>Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input {...register("fullName")} type="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password")} type="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className='px-8 pb-5 space-y-3'>
                        <div>
                            <GoogleAuthSystem></GoogleAuthSystem>
                        </div>
                        <div>
                            <Link to="/login" className='hover:decoration-clone'>
                                <p>I am Already Member</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;