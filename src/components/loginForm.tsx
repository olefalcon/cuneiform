import {auth, provider} from '../config/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const schema = yup.object().shape({
        email: yup.string().required("Invalid email."),
        password: yup.string().required("Invalid password"),
    });

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
      }, [user, loading]);

    const onLogin = async (data: LoginFormData) => {
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });

    return <div>
        <form onSubmit={handleSubmit(onLogin)}>
            <p> Login Form </p>
            <p>Email: <input type='email' {...register('email')} /></p>
            <p> {errors.email?.message} </p>
            <p>Password: <input type='password' {...register('password')} /></p>
            <p> {errors.password?.message} </p>
            <input type='submit'/>
        </form>
    </div>;
}