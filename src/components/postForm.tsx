import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {auth, db} from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


interface CreateFormData {
    post: string;
}

export const PostForm = () => {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        post: yup.string().required("You cannot post nothing.")
    });

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
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
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <textarea placeholder='Type something...' {...register('post')} />
            <p> {errors.post?.message} </p>
            <button>Post</button>
        </form>
    );

}