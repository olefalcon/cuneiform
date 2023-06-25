import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {auth, db} from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

//React Boostrap
import {Button, Form, InputGroup, Alert} from 'react-bootstrap';



interface CreateFormData {
    post: string;
}

export const PostForm = (props: {getPosts: () => void}) => {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        post: yup.string().required("You cannot post nothing.")
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            post: data.post,
            timestamp: Date.now(),
            userID: user?.uid,
            username: user?.displayName
        });
        props.getPosts();
        reset({
            post: ''
        });
    }

    return (
        <Form onSubmit={handleSubmit(onCreatePost)} className='my-3'>
            <InputGroup>
                <Form.Control as="textarea" rows={2} placeholder='Mark the wall...' {...register('post')} />
                <Button type='submit' variant='outline'>Post</Button>
            </InputGroup>
            {errors.post?.message && <Alert variant='danger'> {errors.post?.message} </Alert>}
        </Form>
    );

}