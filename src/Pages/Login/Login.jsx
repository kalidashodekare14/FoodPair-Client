import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import GoogleAuthSystem from '../../Components/GoogleAuthSystem/GoogleAuthSystem';

const Login = () => {

    const { loginSystem } = useAuth()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        loginSystem(data.email, data.password)
            .then(res => {
                console.log(res.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="card bg-base-100 w-96 shrink-0 shadow-2xl">
                        <h1 className='text-4xl text-center mt-5'>Login Here</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className='px-8 pb-5 space-y-3'>
                        <div>
                           <GoogleAuthSystem></GoogleAuthSystem>
                        </div>
                        <div>
                            <Link to="/register" className='hover:decoration-clone'>
                                <p>Create Your Account</p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;