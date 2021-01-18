<template>
  <div class="modal">
    <button class="close" @click.prevent="$emit('close')">
      <svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
    </button>
    <div class="pokemon-details">
      <p class="pokemon-details__name text text--color-primary text--weight-bold">
        {{ pokemon.name }}
      </p>
      <p v-if="pokemon.text" class="pokemon-details__desc">
        {{ pokemon.text }}
      </p>
      <div class="pokemon-details__attacks">
        <p v-if="pokemon.damage" class="damage">
          {{ $t('pokemon.modal.damage') }}
          <span>
            {{ pokemon.damage }}
          </span>
        </p>
        <p class="cost">
          {{ $t('pokemon.modal.cost') }}
          <span class="cost__tag" v-for="(cost, index) in pokemon.cost" :key="index">
          {{ cost }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    pokemon: Object,
  },

  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.pokemon-details {
  &__name {
    font-size: $text-2xl;
    margin-bottom: 1rem;
  }

  &__desc {
    font-size: $text-base;
    color: $gray-500;
  }

  &__attacks {
    margin-top: 1rem;

    .damage {
      font-weight: $font-bold;
      font-size: $text-base;
      margin: 0;

      span {
        font-weight: $font-normal;
      }
    }

    .cost {
      font-weight: $font-bold;

      &__tag {
        font-weight: $font-normal;
        background: $primary;
        color: $white;
        margin: .1rem;
        padding: .5rem;
        border-radius: $radius-normal;
        font-size: $text-sm;
      }
    }
  }
}
</style>
