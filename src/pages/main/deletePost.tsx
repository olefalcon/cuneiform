import {Trash} from 'react-bootstrap-icons';
import {deleteDoc, doc} from 'firebase/firestore';
import { db} from "../../config/firebase";
import { useMainContext } from './main';
import { DeletePostConfirm } from './deletePostConfirm';
import { createContext, useContext, useState } from 'react';


interface Props {
    postID: string
}

export type DeletePostContext = {
    deletePost: () => void,
    show: boolean,
    handleShow: () => void,
    handleClose: () => void
}
export const MainContext = createContext<DeletePostContext>({
    deletePost: () => {},
    show: false,
    handleShow: () => {},
    handleClose: () => {}
});
export const useDeletePostContext = () => useContext(MainContext);

export const DeletePost = (props: Props) => {
    const [show, setShow] = useState(false);
    const {getPosts} = useMainContext();

    const confirmDeletePost = () => {
        deletePost();
    }

    const deletePost = async () => {
        try {
            await deleteDoc(doc(db, "posts", props.postID));
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Trash onClick={deletePost} />
            {/* <DeletePostConfirm/> */}
        </>
    );
}

