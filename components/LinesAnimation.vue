<template>
  <div class="lines">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style lang="sass">
.lines
  background: rgb(255,255,255)
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 45%)
  background-position: 0 -400px
  background-repeat: no-repeat
  position: absolute !important
  z-index: 2 !important
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  .line
    position: absolute
    width: 1px
    height: 100%
    top: 0
    left: 50%
    overflow: hidden
    &::after
      content: ''
      display: block
      position: absolute
      height: 15vh
      width: 100%
      top: -50%
      left: 0
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 75%, rgba(255, 255, 255, 0.7) 100%)
      animation: run 7s 0s infinite
      animation-fill-mode: forwards
      animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97)
    &:nth-child(1)
      margin-left: -25%
      &::after
        animation-delay: 1s
    &:nth-child(2)
      margin-left: -50%
      &::after
        animation-delay: 3s
    &:nth-child(3)
      margin-left: 25%
      &::after
        animation-delay: 2.5s
    &:nth-child(4)
      margin-left: 50%
      &::after
        animation-delay: 3.5s


  @keyframes run
    0%
      top: -50%
      opacity: 1
    100%
      top: 110%
      opacity: 0
</style>
