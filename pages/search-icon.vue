<script setup>
// Redirect to the search page
const router = useRouter();
onMounted(() => {
  router.push('/search');
});
</script>

<template>
  <div>
    <p>Redirecting to search...</p>
  </div>
</template> 