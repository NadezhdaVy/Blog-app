import authHeaders from './authHeaders'

const createMethod = (method, bodyData, tokenData) => ({
  method: method.toUpperCase(),
  headers: authHeaders(tokenData),
  body: JSON.stringify(bodyData),
})
export default createMethod
