import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v1/',
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

export default {
  getPokeCards() {
    return api({
      url: '/cards',
      method: 'get',
    });
  },

  getPokemon(code) {
    return api({
      url: `/cards/${code}`,
      method: 'get',
    });
  },
};
