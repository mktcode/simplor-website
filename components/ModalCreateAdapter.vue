<template>
  <transition name="modal">
    <div class="modal overflow-auto" v-if="$store.state.modal.show && $store.state.modal.component == 'ModalCreateAdapter'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title">Creating an Adapter</h5>
            <button type="button" class="close" @click="$store.commit('hideModal')">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p>An adapter in SimplOr is nothing more than an npm package that follows certain rules.</p>
            <div v-html="$markdown.render(initCode)" />
            <div v-html="$markdown.render(adapterCode)" />
            <p class="py-3">
              To learn everything about adapter development, like modes, request information or monetization, please refer to our adapter documentation.
              If you need help with something feel free to join our discord server and ask.
            </p>
            <div class="text-center">
              <a class="btn btn-outline-primary btn-lg w-100 d-flex justify-content-between align-items-center" href="#">
                Adapter Documentation
                <fa-icon :icon="['fas', 'book-reader']" />
              </a>
              <a class="btn btn-outline-primary btn-lg w-100 d-flex justify-content-between align-items-center mt-2" href="#">
                Chat with us on Discord!
                <fa-icon :icon="['fab', 'discord']" />
              </a>
              <h5 class="modal-title mt-4">You're done?</h5>
            </div>
          </div>
          <div class="modal-footer p-0 border-0 overflow-hidden">
            <a @click="$store.commit('showModal', 'ModalRegisterAdapter')" class="m-0 rounded-0 btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center" href="#">
              Register Adapter
              <fa-icon :icon="['fas', 'plug']" />
            </a>
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
