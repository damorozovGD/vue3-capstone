<template>
  <main>
    <div class="character-details-container">
      <div class="details-block">
        <h1>{{ chosenCharacter.name }}</h1>
        <h3>{{ chosenCharacter.species }} - {{ chosenCharacter.status }}</h3>
        <h3>Last known location: {{ chosenCharacter?.location?.name }}</h3>
        <h3>First seen in: ep. #{{ firstAppearance }}</h3>
        <CustomBtn :character="chosenCharacter" />
      </div>
      <img :src="chosenCharacter.image" :alt="chosenCharacter.name" />
    </div>
  </main>
</template>

<script setup>
  import CustomBtn from '@/components/CustomBtn.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  const store = useStore();
  const route = useRoute();

  const characterId = route.params.id;

  const data = computed(() => store.state.charactersData);

  const chosenCharacter = computed(() => {
    return data.value?.results?.find((x) => Number(characterId) === x.id) || {};
  });

  const firstAppearance = computed(() => {
    const episodes = chosenCharacter.value?.episode || [];
    return episodes[0]?.match(/episode\/(\d+)/)[1];
  });
</script>

<style scoped>
  main {
    padding: 25px 45px;
  }
  .character-details-container {
    display: flex;
    justify-content: space-between;
    min-height: 200px;
    border: 2px solid lightgray;
    border-radius: 5px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .details-block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
</style>
