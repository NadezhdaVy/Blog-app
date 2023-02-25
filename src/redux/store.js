import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'
import authReduser from './slices/authSlice'

export default configureStore({
  reducer: {
    auth: authReduser,
    articles: articlesReducer,
  },
})
