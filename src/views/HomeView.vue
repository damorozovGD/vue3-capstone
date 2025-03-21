<template>
  <main>
    <div class="widget-container">
      <div class="filter-nav">
        <span
          v-for="filter of filters"
          :class="{ activeFilter: activeFilter === filter.title }"
          :key="filter.title"
          @click="activeFilter = filter.title"
        >
          {{ filter.title }}
        </span>
      </div>
      <div class="search-widget">
        <input v-model="name" type="text" placeholder="Search by name..." />
        <button @click="activeFilter = 'name'">Search</button>
      </div>
    </div>
    <div class="container-main">
      <div v-if="filteredProducts?.length" class="cards-list">
        <CharacterCard
          v-for="character in filteredProducts"
          :character="character"
          :key="character.id"
        />
      </div>
      <div v-else>No cards found</div>
      <PaginationButtons :numberOfPages="charactersData?.info?.pages" />
    </div>
  </main>
</template>

<script setup>
  import CharacterCard from '@/components/CharacterCard.vue';
  import { filterTitles } from '@/fixtures';
  import { computed, ref } from 'vue';
  import PaginationButtons from '@/components/PaginationButtons.vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const activeFilter = ref('All');
  const filters = ref(filterTitles);
  const name = ref('');

  const charactersData = computed(() => store.state.charactersData);

  const filteredProducts = computed(() => {
    if (activeFilter.value === 'All') {
      return charactersData.value.results;
    }

    if (activeFilter.value === 'name') {
      return charactersData.value.results.filter((character) => character.name === name.value);
    }

    return charactersData.value.results.filter(
      (character) => character.species === activeFilter.value,
    );
  });
</script>

<style scoped>
  .container-main {
    padding: 30px 50px;
  }

  .widget-container {
    display: flex;
    background: #f2f2f2;
    padding: 40px;
    gap: 20px;
  }

  .filter-nav {
    display: flex;
    border: 2px solid black;
    border-radius: 5px;

    & > span {
      padding: 10px;
      border-right: 2px solid black;
      cursor: pointer;
    }

    & > span:last-child {
      border-right: none;
    }
  }

  .search-widget {
    position: relative;
    border-radius: 5px;

    & input {
      border: 2px solid gray;
      border-radius: 5px;
      padding: 10px;
      width: 240px;
      padding-right: 70px;
      background: white;
    }

    & button {
      position: absolute;
      right: 0px;
      border: 2px solid black;
      border-radius: 5px;
      padding: 10px;
      background: #f2f2f2;
    }
  }

  .cards-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .activeFilter {
    background: black;
    color: white;
  }
</style>
