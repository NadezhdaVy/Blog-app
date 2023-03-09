import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authHeaders from '../../api/authHeaders'
import createMethod from '../../api/createMethod'
import createUrl from '../../api/createUrl'

const initialState = {
  status: 'idle',
  userInfo: {},
  userToken: localStorage.getItem('token'),
  error: null,
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const url = createUrl('/api/users')
      const fetchMethod = createMethod('post', {
        user: {
          username,
          email,
          password,
        },
      })
      const response = await fetch(url, fetchMethod)
      const data = await response.json()

      if (response.status === 200) {
        localStorage.setItem('token', data.user.token)

        return data
      }

      return rejectWithValue(data.errors)
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const url = createUrl('/api/users/login')
    const fetchMethod = createMethod('post', {
      user: {
        email,
        password,
      },
    })
    const response = await fetch(url, fetchMethod)
    const data = await response.json()
    // console.log('data', data.user)
    if (response.status === 200) {
      localStorage.setItem('token', data.user.token)
      return data
    }

    return rejectWithValue(data.errors)
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getCurrentUserBytoken = createAsyncThunk(
  'auth/getCurrentUserByToken',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.userToken
    try {
      const url = createUrl('/api/user')
      const fetchHeaders = authHeaders(token)
      const response = await fetch(url, {
        method: 'GET',
        headers: fetchHeaders,
      })
      const data = await response.json()

      if (response.status === 200) {
        return { ...data }
      }
      return rejectWithValue(data.errors)
    } catch (e) {
      // console.log('Error', e.response.data)
      return rejectWithValue(e.response.data)
    }
  }
)

export const updateProfile = createAsyncThunk('auth/updateProfile', async (values, { rejectWithValue, getState }) => {
  const token = getState().auth.userToken
  try {
    const url = createUrl('/api/user')
    const fetchMethod = createMethod(
      'put',
      {
        user: { ...values },
      },
      token
    )
    const response = await fetch(url, fetchMethod)

    const data = await response.json()

    if (response.status === 200) {
      return data
    }
    return rejectWithValue(data.errors)
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState(state) {
      state.status = 'idle'
      state.error = null
    },
    logOut(state) {
      state.status = 'idle'
      state.userInfo = {}
      state.error = null
      state.userToken = localStorage.getItem('token')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getCurrentUserBytoken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentUserBytoken.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(getCurrentUserBytoken.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'

        state.error = action.payload
      })
  },
})

export const { clearState, logOut } = authSlice.actions

export default authSlice.reducer
