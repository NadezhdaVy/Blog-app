const authHeaders = (tokenData) => {
  if (tokenData === undefined) {
    return { 'Content-Type': 'application/json' }
  }
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenData}` }
}
export default authHeaders
