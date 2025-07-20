import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchPosts} from './postsAPI';
import {Post} from './types';

interface PostsState {
    items: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    skip: number;
    hasMore: boolean;
}

const initialState: PostsState = {
    items: [],
    status: 'idle',
    skip: 0,
    hasMore: true,
};

export const loadPosts = createAsyncThunk(
    'posts/fetch',
    async (_, {getState}) => {
        const {posts} = getState() as { posts: PostsState };
        const res = await fetchPosts(10, posts.skip);
        return res;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(loadPosts.fulfilled, (state, action: PayloadAction<{ posts: Post[] }>) => {
                state.items = [...state.items, ...action.payload.posts];
                state.skip += 10;
                state.hasMore = action.payload.posts.length === 10;
                state.status = 'succeeded';
            })

            .addCase(loadPosts.rejected, (state, action) => {
                state.status = 'failed';
                console.error('Ошибка при загрузке постов:', action.error.message);
            });
    },
});

export default postsSlice.reducer;
