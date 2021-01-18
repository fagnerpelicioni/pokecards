<template>
  <div class="pokemon">
    <div v-if="helper.loading" class="loading">
      <Loading />
    </div>
    <msg v-if="helper.feedback.show" :type="helper.feedback.type">
      {{ helper.feedback.message }}
    </msg>
    <section v-if="!helper.loading && !this.helper.feedback.show"
      class="pokemon__content">

      <div class="pokemon-image">
        <img class="pokemon-image__image"
          :src="pokemon.imageUrlHiRes" :alt="pokemon.name">
      </div>

      <div class="pokemon-info">
        <p class="pokemon-info__name text--color-primary text--weight-bold">
          {{ pokemon.name }}
        </p>
        <div v-if="pokemon.text" class="pokemon-info__desc">
          <p v-for="(text, index) in pokemon.text" :key="index">
            {{ text }}
          </p>
        </div>
        <p class="pokemon-info__id">
          {{ 'ID: ' }}
          <span>{{ pokemon.id }}</span>
        </p>
        <p v-if="pokemon.types" class="pokemon-info__type">
          {{ $t('pokemon.type') }}
          <span v-for="(type, index) in pokemon.types"
          :key="index">
            {{ type }}
          </span>
        </p>
        <p v-if="pokemon.resistances" class="pokemon-info__resistance">
          {{ $t('pokemon.resistance') }}
          <span  v-for="(resistance, index) in pokemon.resistances"
            :key="index">
            {{ resistance.type }}
          </span>
        </p>
        <p v-if="pokemon.weaknesses" class="pokemon-info__weakness">
          {{ $t('pokemon.weakness') }}
          <span v-for="(weakness, index) in pokemon.weaknesses"
            :key="index">
            {{ weakness.type }}
          </span>
        </p>
        <template v-if="pokemon.attacks">
          <p class="pokemon-info__attacks">
            {{ $t('pokemon.modal.attack') }}
          </p>
          <button v-for="(att, index) in pokemon.attacks" :key="index"
            class="pokemon-info__details" @click.prevent="openModal(att)">
            {{ att.name }}
          </button>
        </template>
      </div>
    </section>
    <div class="modal-overlay" v-if="helper.modalShow" @click="helper.modalShow = false" />
    <transition name="slide-fade" mode="out-in">
      <Modal v-if="helper.modalShow"
        :pokemon="attackData"
        @close="helper.modalShow = false" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const Loading = () => import('@/components/common/Loading');
const msg = () => import('@/components/common/Message');
const Modal = () => import('@/components/pokemons/Modal');

export default {
  name: 'Pokemon',

  props: {
    pokeId: {
      type: String,
      required: true,
    },
  },

  components: {
    Loading,
    Modal,
    msg,
  },

  data() {
    return {
      attackData: {},
      helper: {
        modalShow: false,
        loading: true,
        feedback: {
          show: false,
          type: 'error',
          message: null,
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      pokemon: 'pokemonGetSingle',
    }),
  },

  created() {
    this.getPokemon();
  },

  methods: {
    ...mapActions([
      'showPokemon',
    ]),

    async getPokemon() {
      try {
        await this.showPokemon(this.pokeId);
        this.helper.loading = false;
      } catch (e) {
        this.helper.loading = false;
        if (e && !e.request) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        } else if (e && e.response) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: e.response.data.error,
          });
        } else {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.generic'),
          });
        }
      }
    },

    openModal(data) {
      this.helper.modalShow = true;
      this.attackData = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon {
  padding: 2rem 0;

  &__content {
    display: flex;
    flex-wrap: wrap;

    .pokemon-image {
      width: 100%;
      margin: auto;

      @include screen(phone-up) {
        width: 50%;
      }
    }

    .pokemon-info {
      flex: 1;
      padding: 1rem 0;

      @include screen(phone-up) {
        padding: 1rem 2rem;

      }

      &__name {
        font-size: $text-3xl;
      }

      &__desc {
        margin-bottom: 1rem;
        color: $gray-500;
        font-size: $text-sm;
      }

      &__id {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__type {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__resistance {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__weakness {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__attacks {
        margin-top: .5rem;
        font-size: $text-2xl;
        font-weight: $font-bold;
      }

      &__details {
        margin: 0rem 1rem 1rem 0;
        font-size: $text-xl;
        color: $primary;

        &:hover {
          text-decoration: underline;
          transition: $transition-1;
        }
      }
    }
  }
}
</style>
