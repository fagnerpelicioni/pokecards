<template>
  <div class="home">
    <div v-if="helper.loading">
      <Loading />
    </div>

    <msg v-if="helper.feedback.show" :type="helper.feedback.type">
      {{ helper.feedback.message }}
    </msg>

    <div v-if="!this.helper.loading && !this.helper.feedback.show"
      class="home__content">
      <Search @sendSearch="searchPokemons"/>

      <div class="pokemon-cards">
        <Card class="desktop-cards" v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon" />

        <Hooper :settings="hooperSettings">
          <slide v-for="pokemon in pokemons"
            :key="pokemon.id">
            <Card :pokemon="pokemon" />
          </slide>

          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </Hooper>

        <template v-if="pokemons && pokemons.length === 0">
          <p class="text text--color-primary text--weight-bold">
            {{ $t('home.not_found') }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// according to Vuex specifications,
// a state can only be modified in a component through Getters and Actions.
import { mapActions, mapGetters } from 'vuex';

import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';

import 'hooper/dist/hooper.css';

// Lazy load components
const Card = () => import('@/components/pokemons/Card');
const Loading = () => import('@/components/common/Loading');
const msg = () => import('@/components/common/Message');
const Search = () => import('@/components/pokemons/Search');

export default {
  name: 'Home',

  components: {
    Card,
    Hooper,
    HooperNavigation,
    Loading,
    msg,
    Search,
    Slide,
  },

  data() {
    return {
      helper: {
        loading: true,
        feedback: {
          show: false,
          type: 'error',
          message: null,
        },
      },
      inputSearch: null,
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      pokemonsAll: 'pokemonGetCards',
    }),

    // Return object of pokemons filtered by search name
    pokemons() {
      return this.inputSearch ? this.pokemonsAll.filter(
        poke => poke.name.toUpperCase().includes(this.inputSearch.toUpperCase()),
      )
        : this.pokemonsAll;
    },
  },

  created() {
    // renders the page with the data returned from the Vuex
    this.getPokemons();
  },

  methods: {
    ...mapActions([
      'fetchPokeCards',
    ]),

    // Promises and asynchronous used for request
    // which increases optimization and code quality in more robust systems
    async getPokemons() {
      try {
        await this.fetchPokeCards();

        // if the request is done, inactive the loading component
        this.helper.loading = false;
      } catch (e) {
        this.helper.loading = false;
        // Possibility of error in the request is dealt with, such as COR's error.
        if (e && !e.request) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        // show error from API
        } else if (e && e.response) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: e.response.data.error,
          });
        } else if (e && e.response.status === 429) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        // others errors
        } else {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.generic'),
          });
        }
      }
    },

    // brings the search term in the search component
    searchPokemons(input) {
      this.inputSearch = input;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .hooper {
    height: auto;
    display: auto;

    @include screen(phone-up) {
      display: none;
    }
  }

  &__content {
    .pokemon-cards {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .desktop-cards {
        display: none;

        @include screen(phone-up) {
          display: flex;
        }
      }
    }
  }
}
</style>
