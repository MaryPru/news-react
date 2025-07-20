import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {loadPosts} from '../features/posts/postsSlice';
import {PostCard} from '../components/PostCard';
import {Alert, Spin} from 'antd';
import {useInfiniteScroll} from '../hooks/useInfiniteScroll';

export default function Home() {
    const dispatch = useAppDispatch();
    const {items, status, hasMore} = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    useInfiniteScroll(() => {
        if (status !== 'loading' && hasMore) {
            dispatch(loadPosts());
        }
    });

    return (
        <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
            {items.map((post) => (
                <PostCard
                    key={post.id}
                    title={post.title}
                    body={post.body}
                    tags={post.tags}
                    reactions={post.reactions}
                />
            ))}
            {status === 'loading' && <Spin style={{margin: '2rem 0 0 2rem', width: '100%'}}/>}

            {!hasMore && status !== 'loading' && (
                <div style={{textAlign: 'center', marginTop: '2rem', color: '#999'}}>
                    Все новости загружены.
                </div>
            )}

            {status === 'failed' && (
                <Alert
                    message="Ошибка загрузки новостей"
                    description="Попробуйте позже или проверьте соединение."
                    type="error"
                    showIcon
                />
            )}
        </div>
    );
}
