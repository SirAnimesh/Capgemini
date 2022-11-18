export async function request(url: URL) {
  console.log(url)
  const response = await fetch(url)
  const body = await response.json()
  return body
}