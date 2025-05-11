export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()

  const authHeader = Buffer.from(`${config.spotifyClientId}:${config.spotifyClientSecret}`).toString('base64')

  const tokenRes = await $fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: body.code,
      redirect_uri: config.spotifyRedirectUri
    }).toString()
  })

  return tokenRes
})