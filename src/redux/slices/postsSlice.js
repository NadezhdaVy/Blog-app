import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', auther: 'Luke Perro', tags: ['tag1', 'tag2', 'tag3'] },
  {
    id: '2',
    title: 'Second Post',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.',
    auther: 'Luke Perro',
    tags: ['tag1', 'tag2', 'tag3'],
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})

export default postsSlice.reducer
