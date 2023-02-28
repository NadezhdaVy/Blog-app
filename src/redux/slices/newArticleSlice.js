// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const initialState = {
//  status: 'idle',
//  error: null,
// }

// const baseUrl = 'https://blog.kata.academy'

// export const fetchArticle = createAsyncThunk(
//  'newArticle/fetchArticle',
//  async (values, { rejectWithValue, getState }) => {
//    const token = getState().auth.userToken
//    try {
//      const response = await fetch(`${baseUrl}/api/articles`, {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${token}`,
//        },
//        body: JSON.stringify({
//          article: {
//            ...values,
//          },
//        }),
//      })
//      const data = await response.json()
//      console.log(data)
//      if (response.status === 200) {
//        return data
//      }
//      return rejectWithValue(data)
//    } catch (e) {
//      return rejectWithValue(e.response.data)
//    }
//  }
// )
