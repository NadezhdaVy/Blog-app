import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { Status } from '../../ts/variables'
import { User, AuthResponseError, MyKnownError } from '../../ts/interfaces'
import { RootState } from '../store'
import authHeaders from '../../api/authHeaders'
import createMethod from '../../api/createMethod'
import createUrl from '../../api/createUrl'

type LogInData = Required<Pick<User, 'email' | 'password'>>
type RegisterData = LogInData & { username: string }
type UpdateData = Partial<User>

type AuthResponseData = {
  user: User
}

interface AuthState {
  status: Status
  userInfo: User | Record<string, never>
  userToken: string | null
  error: null | MyKnownError | string
}

const initialState: AuthState = {
  status: 'idle',
  userInfo: {},
  userToken: localStorage.getItem('token'),
  error: null,
}

export const registerUser = createAsyncThunk<AuthResponseData, RegisterData, { rejectValue: MyKnownError | string }>(
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

      if (response.status === 200) {
        const data: AuthResponseData = await response.json()
        localStorage.setItem('token', data.user.token)

        return data
      }

      const error: AuthResponseError = await response.clone().json()

      return rejectWithValue(error.errors)
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

export const loginUser = createAsyncThunk<AuthResponseData, LogInData, { rejectValue: MyKnownError | string }>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const url = createUrl('/api/users/login')
      const fetchMethod = createMethod('post', {
        user: {
          email,
          password,
        },
      })
      const response = await fetch(url, fetchMethod)
      if (!response.ok) {
        const error = (await response.json()) as AuthResponseError
        console.log(error)
        return rejectWithValue(error.errors)
      }
      const data: AuthResponseData = await response.clone().json()
      localStorage.setItem('token', data.user.token)
      return data
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

export const getCurrentUserBytoken = createAsyncThunk<
  AuthResponseData,
  undefined,
  { rejectValue: MyKnownError | string; state: RootState }
>('auth/getCurrentUserByToken', async (arg, { rejectWithValue, getState }) => {
  const token: string | null = getState().auth.userToken
  try {
    if (token) {
      const url = createUrl('/api/user')
      const fetchHeaders = authHeaders(token)
      const response = await fetch(url, {
        method: 'GET',
        headers: fetchHeaders,
      })

      if (response.status === 200) {
        const data = await response.json()
        return { ...data }
      }
      const error: AuthResponseError = await response.clone().json()
      return rejectWithValue(error.errors)
    }
    throw new Error('no token')
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const updateProfile = createAsyncThunk<
  AuthResponseData,
  UpdateData,
  { rejectValue: MyKnownError | string; state: RootState }
>('auth/updateProfile', async (values, { rejectWithValue, getState }) => {
  const token = getState().auth.userToken
  try {
    if (token) {
      const url = createUrl('/api/user')
      const fetchMethod = createMethod(
        'put',
        {
          user: { ...values },
        },
        token
      )
      const response = await fetch(url, fetchMethod)

      if (response.status === 200) {
        const data: AuthResponseData = await response.json()
        return data
      }
      const error: AuthResponseError = await response.clone().json()

      return rejectWithValue(error.errors)
    }
    throw new Error('no token')
  } catch (e) {
    const error = e as Error
    console.log(error)
    return rejectWithValue(error.message)
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
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
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
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
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
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
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
        console.log(action)
        if (action.payload) {
          state.error = action.payload
        } else state.error = action.error.message ? action.error.message : 'something went wrong'
      })
  },
})

export const { clearState, logOut } = authSlice.actions

export default authSlice.reducer
