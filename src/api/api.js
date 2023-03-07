import createUrl from './createUrl'
import authHeaders from './authHeaders'

export const getResource = async (slug, token) => {
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
  const body = await res.json()
  return body.article
}

export const postFavorite = async (slug, token, favorited) => {
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
  const body = await res.json()
  return body.article
}
