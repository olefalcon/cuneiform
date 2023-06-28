import { useAuthState } from 'react-firebase-hooks/auth';
import {Post as IPost} from './main';
import { PostScore } from './postScore';
import {Card} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';
import { auth } from '../../config/firebase';
import { DeletePost } from './deletePost';

interface Props {
    post: IPost
}

export const Post = (props: Props) => {
    const [user] = useAuthState(auth);
    
    return <Card className='w-100 my-3'>
        <Card.Body>
            <Card.Text>{props.post.post}</Card.Text>
            <Card.Text className='text-muted small'>
                <PostScore postID={props.post.id} /> - &nbsp;
                <span className='text-decoration-underline'>@{props.post.username}</span> - 
                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(props.post.timestamp)}
                {user?.uid === props.post.userID && <DeletePost postID={props.post.id} />}
            </Card.Text>
        </Card.Body>
    </Card>;
}