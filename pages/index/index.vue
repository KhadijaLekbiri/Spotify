<script setup lang="ts">
// Use auto-imported composables directly
const { getAccessToken } = useSpotifyAuth();
const { getArtistData } = useSpotifyArtist();
const { getAlbumData } = useSpotifyAlbum();

// Define the type for an item
interface Item {
  image: string;
  title: string;
  description: string;
}

// Define the type for each section
interface Section {
  label: string;
  items: Item[];
}

// Define the items as a ref with the correct type
const items = ref<Section[]>([
  {
    label: "Recently Played",
    items: [],
  },
  {
    label: "Made For Warsono",
    items: [],
  },
  {
    label: "Your top mixes",
    items: [],
  },
]);

const fetchSpotifyData = async () => {
  const clientId = '53576fb1696b4060b49cedc2f8859d4a';
  const clientSecret = '635f498b437c448a84553f6f9dab0a1c';

  try {
    const accessToken = await getAccessToken(clientId, clientSecret);

    // Fetch recently played artists
    const recentArtistIds = [
      '4Z8W4fKeB5YxbusRsdQVPb', // Example Artist ID: Radiohead
      '3TVXtAsR1InumwjB7fR4p4', // Example Artist ID: Drake
    ];
    const recentlyPlayed = await Promise.all(
      recentArtistIds.map((artistId) => getArtistData(accessToken, artistId))
    );

    items.value[0].items = recentlyPlayed.map((artist) => ({
      image: artist.images[0]?.url || "https://picsum.photos/300/300?random=1",
      title: artist.name,
      description: `Artist: ${artist.name}`,
    }));

    // Fetch Made For Warsono (Daily Mixes)
    const dailyMixes = [
      '0vJhNkQ7qDWGbx5GL9j5h9', // Example Album ID
      '4Zd1ET4jAvh1swbf2ggttg', // Example Album ID
    ];
    const madeForWarsono = await Promise.all(
      dailyMixes.map((albumId) => getAlbumData(accessToken, albumId))
    );

    items.value[1].items = madeForWarsono.map((album) => ({
      image: album.images[0]?.url || "https://picsum.photos/300/300?random=2",
      title: album.name,
      description: `Album: ${album.name}`,
    }));

    // Fetch Your top mixes (Example album/track lists)
    const topMixes = [
      '6x1XMOSGeiQknt0wQ0bI7Q', // Example Album ID
      '3ZT9ikn6zH9ts1XtTOiAKV', // Example Album ID
    ];
    const topMixesData = await Promise.all(
      topMixes.map((albumId) => getAlbumData(accessToken, albumId))
    );

    items.value[2].items = topMixesData.map((album) => ({
      image: album.images[0]?.url || "https://picsum.photos/300/300?random=3",
      title: album.name,
      description: `Album: ${album.name}`,
    }));
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
  }
};

onMounted(() => {
  fetchSpotifyData();
});
</script>
