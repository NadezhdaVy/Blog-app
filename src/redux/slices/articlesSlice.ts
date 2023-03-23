import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { Article, FetchArticle, MyKnownError, AuthResponseError } from '../../ts/interfaces'
import { Status } from '../../ts/variables'
import { RootState } from '../store'
import createMethod from '../../api/createMethod'
import authHeaders from '../../api/authHeaders'
import createUrl from '../../api/createUrl'

interface ArticleState {
  articles: [Article] | []
  status: Status
  error: null | MyKnownError | string
  totalPages: number
}

const initialState: ArticleState = {
  articles: [],
  status: 'idle',
  error: null,
  totalPages: 0,
}

export const fetchArticles = createAsyncThunk<
  { articles: [Article]; articlesCount: number },
  number,
  { state: RootState; rejectValue: string | MyKnownError }
>('articles/fetchArticles', async (offset, { getState, rejectWithValue }) => {
  const url = createUrl('/api/articles', [{ limit: 10 }, { offset }])
  const token = getState().auth.userToken

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: token ? authHeaders(token) : { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      const body: { articles: [Article]; articlesCount: number } = await response.json()

      return body
    }
    const error: AuthResponseError = await response.clone().json()

    return rejectWithValue(error.errors)
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const fetchArticle = createAsyncThunk<
  Article,
  FetchArticle,
  { state: RootState; rejectValue: string | MyKnownError }
>('articles/fetchArticle', async (values, { getState, rejectWithValue }) => {
  const token = getState().auth.userToken
  const url = createUrl('/api/articles')

  if (!token) {
    throw new Error('no token')
  }
  const fetchHeaders = authHeaders(token)
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ article: { ...values } }),
      headers: fetchHeaders,
    })
    if (response.ok) {
      const data: Article = await response.json()
      console.log(data)
      return data
    }

    const error: AuthResponseError = await response.clone().json()

    return rejectWithValue(error.errors)
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const updateArticle = createAsyncThunk<
  Article,
  FetchArticle,
  { state: RootState; rejectValue: string | MyKnownError }
>('articles/updateArticle', async (values, { getState, rejectWithValue }) => {
  const token = getState().auth.userToken

  const { title, description, body, tagList, slug } = values
  const url = createUrl(`/api/articles/${slug}`)
  if (!token) {
    throw new Error('no token')
  }
  try {
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
    if (response.ok) {
      const data: Article = await response.json()

      return data
    }
    const error: AuthResponseError = await response.clone().json()

    return rejectWithValue(error.errors)
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const deleteArticle = createAsyncThunk<
  boolean,
  string,
  { state: RootState; rejectValue: string | MyKnownError }
>('articles/deleteArticle', async (slug, { getState, rejectWithValue }) => {
  const token = getState().auth.userToken
  if (!token) {
    throw new Error('no token')
  }
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
    const error = await response.json()
    return rejectWithValue(error.errors.body)
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
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
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
      })
  },
})

export default articlesSlice.reducer

export const { clearArticlesState } = articlesSlice.actions

export const selectAllArticles = (state: RootState) => state.articles.articles

export const selectArticleById = (state: RootState, articleSlug?: string) =>
  state.articles.articles.find((article) => article.slug === articleSlug)
