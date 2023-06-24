import {auth, provider} from '../config/firebase'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
}

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const schema = yup.object().shape({
        email: yup.string().required("You must have a email.").email("You must provide a valid email."),
        username: yup.string().required("You must have a username."),
        password: yup.string().required().min(6, "Your password must be at least 6 characters."),
    });

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
      }, [user, loading]);

    const onRegister = async (data: RegisterFormData) => {
        const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
        updateProfile(result.user, {
            displayName: data.username, photoURL: "../resources/images/default.png"
        });
    }
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormData>({
        resolver: yupResolver(schema)
    });

    return <div>
        <form onSubmit={handleSubmit(onRegister)}>
            <p> Login Form </p>
            <p>Email: <input type='email' {...register('email')} /></p>
            <p> {errors.email?.message} </p>
            <p>Username: <input {...register('username')} /></p>
            <p> {errors.username?.message} </p>
            <p>Password: <input type='password' {...register('password')} /></p>
            <p> {errors.password?.message} </p>
            <input type='submit'/>
        </form>
    </div>;
}