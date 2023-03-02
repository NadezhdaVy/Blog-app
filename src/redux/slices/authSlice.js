import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  userInfo: {},
  userToken: localStorage.getItem('token'),
  error: null,
}

const baseUrl = 'https://blog.kata.academy'

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
        }),
      })
      const data = await response.json()
      console.log(data)
      if (response.status === 200) {
        localStorage.setItem('token', data.user.token)

        return data
      }
      return rejectWithValue(data)
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
    const data = await response.json()
    console.log('data', data.user)
    if (response.status === 200) {
      localStorage.setItem('token', data.user.token)
      return data
    }

    return rejectWithValue(data)
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getCurrentUserBytoken = createAsyncThunk(
  'auth/getCurrentUserByToken',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.userToken
    try {
      const response = await fetch(`${baseUrl}/api/user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      if (response.status === 200) {
        return { ...data }
      }
      return rejectWithValue(data)
    } catch (e) {
      console.log('Error', e.response.data)
      return rejectWithValue(e.response.data)
    }
  }
)

export const updateProfile = createAsyncThunk('auth/updateProfile', async (values, { rejectWithValue, getState }) => {
  const token = getState().auth.userToken
  try {
    const response = await fetch(`${baseUrl}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: { ...values },
      }),
    })
    const data = await response.json()

    if (response.status === 200) {
      return data
    }
    return rejectWithValue(data)
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
        state.userInfo.user = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.errors
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo.user = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.errors
      })
      .addCase(getCurrentUserBytoken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentUserBytoken.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo.user = action.payload.user
        state.userToken = action.payload.user.token
      })
      .addCase(getCurrentUserBytoken.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.errors
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo.user = action.payload.user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'

        state.error = action.payload.errors
      })
  },
})

export const { clearState } = authSlice.actions

export default authSlice.reducer
