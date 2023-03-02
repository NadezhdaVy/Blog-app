const createUrl = (url, params) => {
  const baseUrl = 'https://blog.kata.academy/api/'
  const newUrl = new URL(url, baseUrl)

  if (params) {
    params.forEach((element) => {
      newUrl.searchParams.append(Object.keys(element), Object.values(element))
    })
  }
  return newUrl
}
export default createUrl
