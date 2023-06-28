import {PostForm} from './postForm';
import { useState, useEffect, createContext, useContext } from 'react';
import {getDocs, collection, query, orderBy} from 'firebase/firestore';
import {auth, db} from "../../config/firebase";
import {Post} from "./post";
import { Button, Container } from 'react-bootstrap';
import {ArrowClockwise} from 'react-bootstrap-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import {InitialNotice} from './initialNotice';

export interface Post {
    id: string,
    post: string,
    timestamp: number,
    userID: string,
    username: string
}
export type MainContextType = {
    getPosts: () => void
}
export const MainContext = createContext<MainContextType>({
    getPosts: () => {}
});
export const useMainContext = () => useContext(MainContext);

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");
    const [user] = useAuthState(auth);
    const [viewPopup, setViewPopup] = useState(false);
    let visited = localStorage["alreadyVisited"];

    const getPosts = async () => {
        setPostsList(null);
        const data = await getDocs(query(postsRef, orderBy('timestamp', 'desc')));
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() => {
        if (!postsList) {
            getPosts();
        }
        if (!visited) {
            localStorage["alreadyVisited"] = true;
            setViewPopup(true);
        }
    }, [])

    return (
    <MainContext.Provider value= {{ getPosts }}>
    <Container className='my-3'>
        {viewPopup && <InitialNotice />}
        {user && <PostForm />}
        {!user && <p>Must be logged in to make a post.</p>}
        <Button variant='dark' size='sm' onClick={getPosts}><ArrowClockwise /></Button>
        <div>
            {!postsList && <p>Loading...</p>}
            {postsList && postsList?.map((post) => 
                <Post post={post}/>
            )}
        </div>
    </Container>
    </MainContext.Provider>
    );
}