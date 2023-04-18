const authHeaders = (tokenData: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${tokenData}`,
});
export default authHeaders;
