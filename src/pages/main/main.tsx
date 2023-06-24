import {PostForm} from '../../components/postForm';
import { useState, useEffect } from 'react';
import {getDocs, collection} from 'firebase/firestore';
import {auth, db} from "../../config/firebase";
import {Post} from "./post";

export interface Post {
    id: string,
    post: string,
    timestamp: string,
    userID: string,
    username: string
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, [postsList]);
    return <div>
        <PostForm />
        <div>
            {postsList?.map((post) => 
                <Post post={post}/>
            )};
        </div>
    </div>;
}