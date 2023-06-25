import {PostForm} from '../../components/postForm';
import { useState, useEffect } from 'react';
import {getDocs, collection, query, orderBy} from 'firebase/firestore';
import {auth, db} from "../../config/firebase";
import {Post} from "./post";
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import {ArrowClockwise} from 'react-bootstrap-icons';

export interface Post {
    id: string,
    post: string,
    timestamp: number,
    userID: string,
    username: string
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        setPostsList(null);
        const data = await getDocs(query(postsRef, orderBy('timestamp', 'desc')));
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() => {
        if (!postsList) {
            getPosts();
        }
    }, [])

    return <Container className='my-3'>
        <PostForm getPosts={getPosts} />
        <Button variant='dark' size='sm' onClick={getPosts}><ArrowClockwise /></Button>
        <div>
            {!postsList && <p>Loading...</p>}
            {postsList && postsList?.map((post) => 
                <Post post={post}/>
            )}
        </div>
    </Container>;
}