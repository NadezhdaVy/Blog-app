import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import createMethod from '../../api/createMethod'
import authHeaders from '../../api/authHeaders'
import createUrl from '../../api/createUrl'

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
  totalPages: 0,
}

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset = 1) => {
  const url = createUrl('/api/articles', [{ limit: 10 }, { offset }])
  const response = await fetch(url)
  const body = await response.json()
  return body
})

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (values, { getState }) => {
  const token = getState().auth.userToken
  const url = createUrl('/api/articles')
  const fetchMethod = createMethod(
    'post',
    {
      article: {
        ...values,
      },
    },
    token
  )
  const response = await fetch(url, fetchMethod)
  const data = await response.json()
  console.log(data)

  return data
})

export const updateArticle = createAsyncThunk('articles/updateArticle', async (values, { getState }) => {
  const token = getState().auth.userToken

  const { title, description, body, tagList, slug } = values
  const url = createUrl(`/api/articles/${slug}`)
  const fetchMethod = createMethod(
    'put',
    {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
    token
  )
  const response = await fetch(url, fetchMethod)
  const data = await response.json()
  console.log(data)

  return data
})

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, { getState, rejectWithValue }) => {
  const token = getState().auth.userToken
  console.log(slug)
  try {
    const url = createUrl(`/api/articles/${slug}`)
    const fetchHeaders = authHeaders(token)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: fetchHeaders,
    })
    if (response.ok) {
      return true
    }

    return rejectWithValue(response.errors.body)
  } catch {
    return rejectWithValue('something went wrong')
  }
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticlesState(state) {
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'idle'
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
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default articlesSlice.reducer

export const { clearArticlesState } = articlesSlice.actions

export const selectAllArticles = (state) => state.articles.articles

export const selectArticleById = (state, articleSlug) =>
  state.articles.articles.find((article) => article.slug === articleSlug)
