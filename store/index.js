export const state = () => ({
  modal: {
    show: false,
    component: ''
  }
})

export const mutations = {
  showModal(state, component) {
    state.modal.component = component
    state.modal.show = true
  },
  hideModal(state) {
    state.modal.show = false
  }
}
