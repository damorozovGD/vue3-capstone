<template>
  <button @click="onClick">{{ title }}</button>
</template>

<script setup>
  import { updateLocalStorage } from '@/fixtures/helpers';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const props = defineProps({
    character: {
      type: Object,
      required: true,
    },
  });

  const store = useStore();

  const isInFavourites = computed(() => {
    return store.state.favourites.find((x) => x.id === props.character?.id);
  });

  const title = computed(() =>
    isInFavourites.value ? 'Remove from Favourites' : 'Add to Favourites',
  );

  const action = computed(() => (isInFavourites.value ? 'remove' : 'add'));

  const onClick = () => {
    const { favouritesList } = updateLocalStorage(action.value, props.character);
    store.commit('updateFavourites', favouritesList);
  };
</script>

<style scoped>
  button {
    background: black;
    color: white;
    border-radius: 5px;
    padding: 10px;
    width: max-content;
  }
</style>
