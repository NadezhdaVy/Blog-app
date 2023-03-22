import { Article } from '../ts/interfaces'

import createUrl from './createUrl'
import authHeaders from './authHeaders'

type ResponseData = {
  article: Article
}

export const getResource = async (slug: string, token: string): Promise<Article> => {
  const fetchHeaders = authHeaders(token)
  const resourceUrl = createUrl(`/api/articles/${slug}`)
  const res = await fetch(resourceUrl, {
    method: 'GET',
    headers: fetchHeaders,
  })

  if (!res.ok) {
    const error = await res.json()
    throw error
  }
  const body: ResponseData = await res.json()
  return body.article
}

export const postFavorite = async (slug: string, token: string, favorited: boolean): Promise<Article> => {
  const method = favorited ? 'DELETE' : 'POST'
  const resourceUrl = createUrl(`/api/articles/${slug}/favorite`)
  const fetchHeaders = authHeaders(token)
  const res = await fetch(resourceUrl, {
    method,
    headers: fetchHeaders,
  })

  if (!res.ok) {
    const error = await res.json()
    throw error
  }
  const body: ResponseData = await res.json()
  return body.article
}
