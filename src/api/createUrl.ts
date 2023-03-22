const createUrl = (url: string, params?: Array<{ [index: string | number]: string | number } | string | number>) => {
  const baseUrl = 'https://blog.kata.academy'
  const newUrl = new URL(url, baseUrl)

  if (params) {
    params.forEach((element) => {
      newUrl.searchParams.append(Object.keys(element)[0], Object.values(element)[0])
    })
  }
  return newUrl
}
export default createUrl
