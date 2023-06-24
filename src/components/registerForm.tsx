import {auth, provider} from '../config/firebase'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

//React Boostrap
import {Button, Form, InputGroup, Alert, Container} from 'react-bootstrap';

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

    return <Container className='my-3'>
        <Form onSubmit={handleSubmit(onRegister)}>
            <h5> Register Form </h5>
            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" {...register('email')} />
                {errors.email?.message && <Alert variant='danger'> {errors.email?.message} </Alert>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control {...register('username')} />
                {errors.username?.message && <Alert variant='danger'> {errors.username?.message} </Alert>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register('password')} />
                {errors.password?.message && <Alert variant='danger'> {errors.password?.message} </Alert>}
            </Form.Group>
            <Button variant="outline-dark" type="submit">Register!</Button>
        </Form>
    </Container>;
}