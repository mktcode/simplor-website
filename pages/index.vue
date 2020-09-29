<template>
<div>
  <Header />
  <div id="content">
    <Adapters />
    <Oracles />
    <Footer />
  </div>
  <ModalCreateAdapter />
  <ModalRequestData />
  <ModalRegisterAdapter />
</div>
</template>

<script>
export default {
  transition: 'fade'
}
</script>
