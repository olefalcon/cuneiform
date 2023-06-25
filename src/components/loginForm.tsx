import {auth, provider} from '../config/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

//React Bootstrap
import {Button, Form, InputGroup, Alert, Container} from 'react-bootstrap';

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [isFormError, setIsFormError] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().required("Invalid email."),
        password: yup.string().required("Invalid password"),
    });

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
      }, [user, loading]);

    const onLogin = async (data: LoginFormData) => {
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            console.log(error);
            setIsFormError(true);
        }
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });

    return <Container className='my-3'>
        <Form onSubmit={handleSubmit(onLogin)}>
            <h5> Login Form </h5>
            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" {...register('email')} />
                {errors.email?.message && <Alert variant='danger'> {errors.email?.message} </Alert>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register('password')} />
                {errors.password?.message && <Alert variant='danger'> {errors.password?.message} </Alert>}
            </Form.Group>
            {isFormError && <Alert variant='danger'>There was an error while logging in!</Alert>}
            <Button variant="outline-dark" type="submit">Login!</Button>
        </Form>
    </Container>;
}