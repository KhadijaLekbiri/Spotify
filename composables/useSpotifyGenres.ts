import { ref } from 'vue'
import { useSpotifyAuth } from './useSpotifyAuth'

export const useSpotifyGenres = () => {
    const { accessToken } = useSpotifyAuth()
    const genres = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Genre images from Spotify's own CDN
    const genreImages = {
        pop: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
        hiphop: 'https://i.scdn.co/image/ab67706f000000025a84b746ff362e5a9099c924',
        rock: 'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730',
        electronic: 'https://i.scdn.co/image/ab67706f000000026d1bd9d2a545d0c2f2f8c505',
        rnb: 'https://i.scdn.co/image/ab67706f00000002c9f71c0d9d8f6e24f49e8556',
        indie: 'https://i.scdn.co/image/ab67706f000000025f7327d3fdc71af27917adba',
        latin: 'https://i.scdn.co/image/ab67706f00000002a59d5ad44320d49a9f8d6071',
        metal: 'https://i.scdn.co/image/ab67706f0000000285704160b49125ac95099ec8'
    }

    // Genre colors mapping
    const genreColors = {
        pop: 'bg-purple-600',
        hiphop: 'bg-orange-600',
        rock: 'bg-red-600',
        electronic: 'bg-green-600',
        rnb: 'bg-pink-600',
        indie: 'bg-blue-600',
        latin: 'bg-yellow-600',
        metal: 'bg-gray-600'
    }

    const fetchGenres = async () => {
        if (!accessToken.value) {
            error.value = 'Please log in to view genres'
            return
        }

        loading.value = true
        error.value = null

        try {
            // Fetch available genres from Spotify API
            const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=8&country=US', {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch genres')
            }

            const data = await response.json()

            // Map the categories to our format with images and colors
            genres.value = data.categories.items.map(category => {
                const id = category.id.toLowerCase()
                return {
                    id: category.id,
                    name: category.name,
                    color: genreColors[id] || 'bg-zinc-600', // Fallback color if not in mapping
                    image: category.icons[0]?.url || genreImages[id] || genreImages.pop // Use category icon or our fallback
                }
            })
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred while fetching genres'
        } finally {
            loading.value = false
        }
    }

    return {
        genres,
        loading,
        error,
        fetchGenres
    }
} 