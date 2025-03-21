<template>
  <div class="favourites-page">
    <template v-if="favourites.length">
      <CharacterCard v-for="character in favourites" :character="character" :key="character.id" />
    </template>
    <div v-else>You haven't added any cards yet</div>
  </div>
</template>
<script setup>
  import CharacterCard from '@/components/CharacterCard.vue';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const favourites = computed(() => store.state.favourites);
</script>

<style scoped>
  .favourites-page {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 30px 50px;
  }
</style>
