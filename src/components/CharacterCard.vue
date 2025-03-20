<template>
  <div class="card-container">
    <img :alt="character.name" :src="character.image" @click="goToCharacterDetails(character.id)" />
    <div class="card-details">
      <h3>{{ character.name }}</h3>
      <div>{{ character.species }} - {{ character.status }}</div>
      <CustomBtn :character="character" />
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import CustomBtn from './CustomBtn.vue';

  defineProps({
    character: {
      type: Object,
      required: true,
    },
  });

  const router = useRouter();

  const goToCharacterDetails = (id) => {
    router.push(`/character/${id}`);
  };
</script>

<style scoped>
  .card-container {
    width: 300px;
    min-height: 400px;
    border: 2px solid lightgray;
    border-radius: 5px;
  }
  .card-details {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px 20px 20px;
  }

  img {
    cursor: pointer;
  }
</style>
