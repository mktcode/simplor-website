<template>
  <transition name="modal">
    <div class="modal" v-if="$store.state.modal.show">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title">Create an Adapter</h5>
            <button type="button" class="close" @click="$store.commit('hideModal')">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="code rounded-lg p-3" v-html="$markdown.render(adapterCode)"></div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="sass">
.modal
  background: rgba(0, 0, 0, 0.2)
  display: block
</style>

<script>
export default {
  data() {
    return {
      adapterCode: `\`\`\`javascript
const axios = require('axios')

module.exports = async function (request) {
  return axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(result => {
    return {
      value: result.data.ethereum.usd * 100,
      type: 'int', // currently supported: 'bool', 'int' and 'string'
    }
  })
}
\`\`\``
    }
  }
}
</script>
