<template>
  <transition name="modal">
    <div class="modal overflow-auto" v-if="$store.state.modal.show && $store.state.modal.component == 'ModalRegisterAdapter'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title">Register Your Adapter</h5>
            <button type="button" class="close" @click="$store.commit('hideModal')">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p>Your adapter must be a public npm package. Enter the name of your package and select it from the list.</p>
            <input type="text" class="form-control form-control-lg" />
          </div>
          <div class="modal-footer p-0 border-0 overflow-hidden">
            <button disabled @click="$store.commit('showModal', 'ModalRegisterAdapter')" class="m-0 rounded-0 btn btn-success btn-lg w-100 d-flex justify-content-between align-items-center" href="#">
              Confirm
              <fa-icon :icon="['fas', 'check']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      initCode: `\`\`\`shell
$ npx create-simplor-adapter my-adapter
$ cd my-adapter
\`\`\``,
      adapterCode: `\`\`\`javascript
// index.js
module.exports = {
  fetch: request => {
    // return a response object
  },
  tolerate: (val1, val2, mode) => {
    // return true or false
  }
}
\`\`\``
    }
  }
}
</script>
