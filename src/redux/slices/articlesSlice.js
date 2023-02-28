import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
  totalPages: 0,
}
const baseUrl = 'https://blog.kata.academy'
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset = 1) => {
  const response = await fetch(`${baseUrl}/api/articles?limit=10&limit=10&offset=${offset}`)
  const body = await response.json()
  return body
})

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (values, { getState }) => {
  const token = getState().auth.userToken

  const response = await fetch(`${baseUrl}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article: {
        ...values,
      },
    }),
  })
  const data = await response.json()
  console.log(data)

  return data
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
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default articlesSlice.reducer

export const selectAllArticles = (state) => state.articles.articles

export const selectArticleById = (state, articleSlug) =>
  state.articles.articles.find((article) => article.slug === articleSlug)
