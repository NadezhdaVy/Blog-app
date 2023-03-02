import createUrl from './createUrl'

const getResource = async (slug) => {
  const resourceUrl = createUrl(`articles/${slug}`)
  const res = await fetch(resourceUrl)

  if (!res.ok) {
    const error = await res.json()
    throw error
  }
  const body = await res.json()
  return body.article
}

export default getResource
