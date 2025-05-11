import { ref } from 'vue';

const SPOTIFY_CLIENT_ID = '53576fb1696b4060b49cedc2f8859d4a';
const SPOTIFY_CLIENT_SECRET = '635f498b437c448a84553f6f9dab0a1c';
const REDIRECT_URI = 'https://3b07-41-137-204-13.ngrok-free.app/callback';
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const useSpotifyAuth = () => {
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const tokenExpiryTime = ref<number | null>(null);
  const error = ref<string | null>(null);
  const isAuthenticating = ref(false);

  // Initialize tokens from localStorage if available
  const initTokens = () => {
    try {
      const storedAccessToken = localStorage.getItem('spotify_access_token');
      const storedRefreshToken = localStorage.getItem('spotify_refresh_token');
      const storedExpiryTime = localStorage.getItem('spotify_token_expiry');

      if (storedAccessToken && storedRefreshToken && storedExpiryTime) {
        accessToken.value = storedAccessToken;
        refreshToken.value = storedRefreshToken;
        tokenExpiryTime.value = parseInt(storedExpiryTime);
        console.log('✅ Tokens initialized from localStorage');
        return storedAccessToken;
      }
      console.log('❌ No tokens found in localStorage');
    } catch (err) {
      console.error('❌ Error initializing tokens:', err);
    }
    return null;
  };

  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      console.error('❌ No refresh token available');
      return null;
    }

    try {
      console.log('🔄 Refreshing access token...');
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken.value
      });

      const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
        },
        body: params
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`);
      }

      const data = await response.json();
      setTokens(data.access_token, data.refresh_token || refreshToken.value, data.expires_in);
      console.log('✅ Access token refreshed successfully');
      return data.access_token;
    } catch (err) {
      console.error('❌ Error refreshing token:', err);
      error.value = 'Failed to refresh access token';
      return null;
    }
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      console.log('🔄 Exchanging code for token...');
      console.log('Using redirect URI:', REDIRECT_URI);

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      });

      const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
        },
        body: params
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ Token exchange failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          redirectUri: REDIRECT_URI
        });
        throw new Error(`Failed to exchange code for token: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Token exchange successful');
      setTokens(data.access_token, data.refresh_token, data.expires_in);
      return data.access_token;
    } catch (err) {
      console.error('❌ Error exchanging code for token:', err);
      throw err;
    }
  };

  const getAccessToken = async () => {
    if (isAuthenticating.value) {
      console.log('⏳ Authentication already in progress');
      return null;
    }

    try {
      isAuthenticating.value = true;
      console.log('🔄 Starting authentication flow...');

      // Check if current token is expired or about to expire (within 5 minutes)
      if (accessToken.value && tokenExpiryTime.value) {
        const now = Date.now();
        if (now < tokenExpiryTime.value - 300000) { // 5 minutes buffer
          console.log('✅ Using existing valid token');
          return accessToken.value;
        } else {
          console.log('🔄 Token expired or about to expire, refreshing...');
          return await refreshAccessToken();
        }
      }

      // If no token in memory, try to initialize from localStorage
      const storedToken = initTokens();
      if (storedToken) {
        // Check if the initialized token is still valid
        if (tokenExpiryTime.value && Date.now() < tokenExpiryTime.value - 300000) {
          console.log('✅ Using token from localStorage');
          return storedToken;
        } else {
          console.log('🔄 Stored token expired, refreshing...');
          return await refreshAccessToken();
        }
      }

      // Check if we have a code in the URL (after Spotify redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const spotifyError = urlParams.get('error');
      const state = urlParams.get('state');
      const storedState = localStorage.getItem('spotify_auth_state');

      // If there's an error in the URL, handle it
      if (spotifyError) {
        console.error('❌ Auth error from Spotify:', spotifyError);
        error.value = `Authentication error: ${spotifyError}`;
        return null;
      }

      // Verify state parameter
      if (state && storedState && state !== storedState) {
        console.error('❌ State mismatch');
        error.value = 'Authentication failed: Invalid state parameter';
        return null;
      }

      if (code) {
        console.log('🔄 Found authorization code, exchanging for token');
        try {
          const token = await exchangeCodeForToken(code);

          // Clean up the URL and state
          window.history.replaceState({}, document.title, window.location.pathname);
          localStorage.removeItem('spotify_auth_state');

          return token;
        } catch (err) {
          console.error('❌ Error in token exchange:', err);
          error.value = 'Failed to authenticate with Spotify';
          return null;
        }
      }

      // If no code and no error, don't redirect automatically
      console.log('ℹ️ No token or code found. Please click "Log in with Spotify" to authenticate.');
      return null;

    } catch (err) {
      console.error('❌ Error in getAccessToken:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      return null;
    } finally {
      isAuthenticating.value = false;
    }
  };

  const initiateLogin = () => {
    try {
      console.log('🔄 Initiating Spotify login...');
      console.log('Using redirect URI:', REDIRECT_URI);

      const scope = 'playlist-read-private playlist-read-collaborative';
      const authUrl = new URL(SPOTIFY_AUTH_ENDPOINT);

      // Add required parameters
      authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
      authUrl.searchParams.append('scope', scope);

      // Add state parameter for security
      const state = Math.random().toString(36).substring(7);
      authUrl.searchParams.append('state', state);
      localStorage.setItem('spotify_auth_state', state);

      console.log('🔄 Redirecting to Spotify auth URL:', authUrl.toString());
      window.location.href = authUrl.toString();
    } catch (err) {
      console.error('❌ Error initiating login:', err);
      error.value = 'Failed to initiate Spotify login';
    }
  };

  const setTokens = (access: string, refresh: string, expiresIn: number) => {
    try {
      // Calculate expiry time (current time + expires_in seconds - 5 minutes buffer)
      const expiryTime = Date.now() + (expiresIn * 1000) - 300000;

      // Store tokens and expiry time
      localStorage.setItem('spotify_access_token', access);
      localStorage.setItem('spotify_refresh_token', refresh);
      localStorage.setItem('spotify_token_expiry', expiryTime.toString());

      // Update refs
      accessToken.value = access;
      refreshToken.value = refresh;
      tokenExpiryTime.value = expiryTime;

      console.log('✅ Tokens stored successfully');
    } catch (err) {
      console.error('❌ Error storing tokens:', err);
      error.value = 'Failed to store tokens';
    }
  };

  const clearTokens = () => {
    try {
      accessToken.value = null;
      refreshToken.value = null;
      tokenExpiryTime.value = null;
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
      localStorage.removeItem('spotify_token_expiry');
      localStorage.removeItem('spotify_auth_state');
      console.log('✅ Tokens cleared successfully');
    } catch (err) {
      console.error('❌ Error clearing tokens:', err);
    }
  };

  // Initialize tokens on composable creation
  initTokens();

  return {
    accessToken,
    error,
    isAuthenticating,
    getAccessToken,
    initiateLogin,
    clearTokens
  };
};
