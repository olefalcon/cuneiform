import {Post as IPost} from './main';

interface Props {
    post: IPost
}

export const Post = (props: Props) => {
    return <div className='post'>
        <p className='username'>@{props.post.username}</p>
        <h3 className='post-text'>{props.post.post}</h3>
    </div>;
}