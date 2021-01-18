// import the requests from api file
import api from '@/api/index';

export default {
  state: {
    pokemons: [],
    pokemon: {},
  },

  getters: {
    // card getters with alphabetical order
    pokemonGetCards: state => state.pokemons.sort((a, b) => a.name.localeCompare(b.name)),
    pokemonGetSingle: state => state.pokemon,
  },

  actions: {
    fetchPokeCards({ commit }) {
      return api.getPokeCards()
        .then((response) => {
          // Call the mutation to fill the state
          commit('POKEMONS_SET_DATA', response.data);
          // Accept the promise and send to View
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('POKEMON_RESET_DATA');
          // rejects the promise and sends the error to View
          return Promise.reject(error);
        });
    },

    showPokemon({ commit }, code) {
      return api.getPokemon(code)
        .then((response) => {
          commit('POKEMON_SET_DATA', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('POKEMON_RESET_DATA');
          return Promise.reject(error);
        });
    },
  },

  mutations: {
    // fill the state
    POKEMONS_SET_DATA(state, data) {
      state.pokemons = data.cards;
    },

    POKEMON_SET_DATA(state, data) {
      state.pokemon = data.card;
    },

    // reset vuex pokemons if the request is not made
    POKEMON_RESET_DATA(state) {
      state.pokemons = [];
    },
  },
};
