import HttpClient from '@/services/httpClient';
import { createStore } from 'vuex';

const httpClient = new HttpClient({ baseURL: 'https://rickandmortyapi.com/api' });

const store = createStore({
  state() {
    return {
      charactersData: [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    };
  },
  mutations: {
    setCharacters(state, data) {
      state.charactersData = data;
    },
    updateFavourites(state, data) {
      state.favourites = data;
    },
  },
  actions: {
    async fetchCharacters({ commit }) {
      try {
        const data = await httpClient.get('/character');
        commit('setCharacters', data);
      } catch (err) {
        console.log('err', err.message);
      }
    },
    async updatePage({ commit }, newPageNumber) {
      try {
        const data = await httpClient.get(`/character?page=${newPageNumber}`);
        commit('setCharacters', data);
      } catch (err) {
        console.log('err', err.message);
      }
    },
  },
});

export default store;
