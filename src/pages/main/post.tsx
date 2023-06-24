import {Post as IPost} from './main';
import Card from 'react-bootstrap/Card';

interface Props {
    post: IPost
}

export const Post = (props: Props) => {
    return <Card className='w-100 my-3'>
        <Card.Body>
            <Card.Text>{props.post.post}</Card.Text>
            <Card.Text className='text-muted small'><span className='text-decoration-underline'>@{props.post.username}</span> - {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(props.post.timestamp)}</Card.Text>
        </Card.Body>
    </Card>;
}