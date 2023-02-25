import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
  totalPages: 0,
}

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset = 1) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`)
  const body = await response.json()
  return body
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.articles = action.payload.articles
        state.totalPages = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default articlesSlice.reducer

export const selectAllArticles = (state) => state.articles.articles

export const selectArticleById = (state, articleSlug) =>
  state.articles.articles.find((article) => article.slug === articleSlug)
