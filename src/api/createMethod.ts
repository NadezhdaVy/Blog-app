import authHeaders from './authHeaders'

const createMethod = (method: string, bodyData?: object, tokenData?: string) => {
  if (bodyData && tokenData) {
    return {
      method: method.toUpperCase(),
      headers: authHeaders(tokenData),
      body: JSON.stringify(bodyData),
    }
  }
  if (bodyData) {
    return {
      method: method.toUpperCase(),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    }
  }
  return {
    method: method.toUpperCase(),
  }
}
export default createMethod
