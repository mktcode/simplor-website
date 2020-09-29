<template>
  <transition name="modal">
    <div class="modal overflow-auto" v-if="$store.state.modal.show && $store.state.modal.component == 'ModalRequestData'">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title">Requesting Data</h5>
            <button type="button" class="close" @click="$store.commit('hideModal')">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div v-html="$markdown.render(initCode)" />
            <div v-html="$markdown.render(solidityCode)" />
            <p class="py-3">
              To see all available options, such as whitelisting oracles or handling errors and to learn more about pricing, please refer to our consumer documentation.
              You should also check out our list of available adapters.
              If you need help with something feel free to join our discord server and ask.
            </p>
            <div class="text-center">
              <a
                class="btn btn-outline-primary btn-lg w-100 d-flex justify-content-between align-items-center"
                href="https://github.com/mktcode/simplor-website/blob/master/docs/CONSUMER.md"
                target="_blank"
              >
                Consumer Documentation
                <fa-icon :icon="['fas', 'book-reader']" />
              </a>
              <a class="btn btn-outline-primary btn-lg w-100 d-flex justify-content-between align-items-center mt-2" href="#">
                Available Adapters
                <fa-icon :icon="['fas', 'plug']" />
              </a>
              <a class="btn btn-outline-primary btn-lg w-100 d-flex justify-content-between align-items-center mt-2" href="#">
                Chat with us on Discord!
                <fa-icon :icon="['fab', 'discord']" />
              </a>
              <h5 class="modal-title mb-3 mt-4">You're done?</h5>
              <p>
                Deploy your contract with the address of one of the SimplOr gateways:
              </p>
            </div>
            <div class="mb-2 btn btn-lg btn-primary w-100 d-flex justify-content-between align-items-center">
              <span class="text-truncate">Main Net: 0x632F2EE1A2127711f9c07230a967a9AC4729E520</span>
              <span class="text-nowrap ml-2">
                copy
                <fa-icon :icon="['far', 'copy']" />
              </span>
            </div>
            <div class="mb-2 btn btn-lg btn-light w-100 d-flex justify-content-between align-items-center">
              <span class="text-truncate">Kovan: 0x32F2EE1A21a967a9AC4729E52027711f9c072306</span>
              <span class="text-nowrap ml-2">
                copy
                <fa-icon :icon="['far', 'copy']" />
              </span>
            </div>
            <div class="btn btn-lg btn-light w-100 d-flex justify-content-between align-items-center">
              <span class="text-truncate">Ropsten: 0x2F2EAC4729E520E1A227072306711f9c31a967a9</span>
              <span class="text-nowrap ml-2">
                copy
                <fa-icon :icon="['far', 'copy']" />
              </span>
            </div>
            <small class="text-muted text-center d-block mt-4 mb-3">
              <fa-icon :icon="['fas', 'info']" class="mr-1" />
              You can change the gateway at any time with the <i><b>updateSimplorGateway(address)</b></i> function.
            </small>
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
$ npm i --save @simplor/consumer
\`\`\``,
      solidityCode: `\`\`\`solidity
pragma solidity ^0.7.1;
import "@simplor/consumer/SimplorConsumer.sol";

contract ConsumerExample is SimplorConsumer {
  uint256 _ethPrice;

  constructor(address simplorGatewayAddress) SimplorConsumer(simplorGatewayAddress) {}

  function requestEthPrice() external {
    makeSimplorRequest(
      "@simplor/adapters/eth-price",
      this.onEthPriceFulfill.selector
    );
  }

  function onEthPriceFulfill(uint256[] memory ethPrices, uint256 requestId) public onlySimplOracle {
    _ethPrice = ethPrices[0];
  }
}
\`\`\``
    }
  }
}
</script>
