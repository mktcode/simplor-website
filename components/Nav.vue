<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex">
      <nuxt-link :to="backLink" v-if="backLink" class="p-3">
        <fa-icon :icon="['fas', 'chevron-left']" />
      </nuxt-link>
      <h5 class="text-primary m-0 d-flex justify-content-center align-items-center" v-if="logo">
        Simpl<fa-icon :icon="['far', 'circle']" style="font-size: 1.6rem; margin: 0 0.1rem;" />r
      </h5>
      <h5 class="text-primary m-0 d-flex justify-content-center align-items-center ml-2" v-if="title" v-html="title" />
    </div>
    <div class="p-3">
      <a href="#" :class="['mr-3', { 'text-white-50': dark }]">
        Oracles
      </a>
      <nuxt-link to="/adapters" :class="['mr-3', { 'text-white-50': dark }]">
        Adapters
      </nuxt-link>
      <a href="#" :class="[{ 'text-white-50': dark }]">
        Connect Wallet
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: Boolean,
    backLink: String,
    logo: Boolean,
    title: String
  }
}
</script>
