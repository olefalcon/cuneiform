import {HandThumbsUp, HandThumbsUpFill} from 'react-bootstrap-icons';
import {addDoc, getDocs, doc, deleteDoc, collection, query, where} from 'firebase/firestore';
import {auth, db} from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useMainContext } from './main';
import { useState, useEffect } from 'react';

interface Props {
    postID: string
}

export interface Like {
    id: string,
    postID: string,
    userID: string
}

export const PostScore = (props: Props) => {

    const [user] = useAuthState(auth);
    const {getPosts} = useMainContext();
    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postID", "==", props.postID));

    const hasLikedPost = likes?.find((like) => like.userID === user?.uid);
    const likeID = likes?.find((like) => {return like.userID === user?.uid})?.id as string;

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Like[]);       
    }
    const likePost = async () => {
        await addDoc(likesRef, {
            postID: props.postID,
            userID: user?.uid,
        });
        getLikes();
    }
    const unlikePost = async () => {
        try {
            await deleteDoc(doc(db, "likes", likeID));
            getLikes();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (likes==null) {
            getLikes();
        }
    }, []);

    return(
        <>
        {!hasLikedPost && <HandThumbsUp onClick={likePost} />}
        {hasLikedPost && <HandThumbsUpFill onClick={unlikePost} />}
        {likes?.length}
        </>
    );
}