<template>
  <v-app>
    <header>
      <nav>
        <ul class="nav-block">
          <li v-for="link in links" :key="link.title">
            <RouterLink :to="link.url" :class="{ active: activePage === link.title }">
              {{ link.title }}
            </RouterLink>
          </li>
        </ul>
        <div class="favourites-block">
          <IconHeart class="heart-icon" />
          <span class="favourites-counter">{{ favouritesCounter }}</span>
        </div>
      </nav>
    </header>
    <RouterView />
  </v-app>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import IconHeart from './components/icons/IconHeart.vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { listOfLinks, routeDict } from './fixtures';

  const store = useStore();
  const route = useRoute();

  const links = ref(listOfLinks);

  const activePage = computed(() => routeDict[route.name]);
  const favouritesCounter = computed(() => store.state.favourites?.length);

  onMounted(() => {
    store.dispatch('fetchCharacters');
  });
</script>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    background: #202428;
    padding: 15px 45px;
  }

  li {
    list-style-type: none;
  }

  a {
    color: white;
    text-decoration: none;
    color: #a6aaae;
  }

  .nav-block {
    display: flex;
    gap: 10px;
  }

  .active {
    color: white;
  }

  .heart-icon {
    height: 20px;
    width: 20px;
    color: white;
  }

  .favourites-block {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .favourites-counter {
    color: #a6aaae;
  }
</style>
