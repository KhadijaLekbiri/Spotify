<template>
  <div>
    <div class="relative h-52 rounded-md overflow-hidden">
      <div class="bg-gradient-to-b from-black/80 to-transparent inset-0 absolute"></div>

      <img
        src="https://picsum.photos/200/300?id=now-playing-artist"
        alt="Album Artist"
        class="w-full h-full object-cover rounded-md"
      />

      <h2 class="text-lg m-4 font-semibold absolute top-0 w-full">About the artist</h2>
    </div>

    <div class="flex items-center justify-between gap-4 mt-4">
      <div>
        <h3 class="font-semibold">Mahalini</h3>
        <div class="text-sm text-zinc-400">9,222,222 monthly listeners</div>
      </div>
      <button
        class="ml-auto px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold"
      >
        Follow
      </button>
    </div>

    <div class="mt-4 text-sm text-zinc-300">
      Mahalini is a singer-songwriter from Jakarta, Indonesia. She is known for her songs
      "Sial", "Tentang Dia", and "Tak Mungkin Bersama". She has released two albums,
      "Mahalini" (2019) and "About Her" (2020).
    </div>
  </div>
</template>
