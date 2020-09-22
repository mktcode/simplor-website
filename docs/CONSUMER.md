# Consuming Data

- [Setup](#Setup)
- [Requesting and Receiving Data](#Requesting-and-Receiving-Data)
  - [Optional Paramters](#Optional-Paramters)
    - [Required Responses](#Required-Responses)
    - [Error Callback](#Error-Callback)
    - [Expire Timestamp](#Expire-Timestamp)
    - [Passing Data](#Passing-Data)
- [Price per Response](#Price-per-Response)
- [Minimum Consumer Example](#Minimum-Consumer-Example)
- [Advanced Consumer Example](#Advanced-Consumer-Example)

Consuming data with SimplOr is very easy. In your smart contract you simply need to inherit from our SimplorConsumer contract and specify an adapter and a callback. The adapter defines how your callback needs to be implemented and how much a single request response cycle will cost your contract.

Take a look at the [Minimum Consumer Example](#Minimum-Consumer-Example) at the bottom of the page to see what it boils down to in many simple cases.

### Setup

First you need to install the SimplOr consumer contract to inherit from.

```shell=
npm i --save @simplor/consumer
```

```solidity
pragma solidity ^0.7.1;

import "@simplor/SimplorConsumer.sol";

contract MyContract is SimplorConsumer {
  ...
}
```

When deploying your contract you need to provide the address of the SimplOr Gateway, depending on the network you are deploying to, and pass it to the parent constructor.

```solidity
constructor(address simplorGatewayAddress)
SimplorConsumer(simplorGatewayAddress) payable {}
```

This will automatically register your consumer contract in the oracle network and you can start to make requests and receive responses.

### Requesting and Receiving Data

SimplOr is decentralized by default. But there are two factors that determine how decentralized a response will be: The number of oracles you require to respond before your callback gets invoked and the adapter that is responsible for fetching the actual data. The default adapter for requesting the ETH price for example let's you decide if you want to have a decentralized median result or a result from one specific source.

So basically you decide how many confirmations of a response you want and the adapter decides (or lets you decide) how decentralized the data sources shall be.

With the default url adapter you can specify multiple urls. It lets you decide whether you want to have a single random response or an already aggregated one.

**[Find out more about what adapters are available and what they can do for you.](https://simplor.uber.space/adapters)**

If you just want a simple single response from the oracle network the only thing you have to do is to call the `makeSimplorRequest` function with your desired adapter and a callback function.

```solidity
function requestEthPrice() external {
  makeSimplorRequest(
    "@simplor/coingecko-eth-price",
    this.onEthPriceFulfill.selector
  );
}

function onEthPriceFulfill(uint256[] memory ethPrices, uint256 requestId) public onlySimplOracle {
  _ethPrice = ethPrices[0];
}
```

You might notice that the response comes as an array. This will always be the case, no matter if you request one or more responses. But it will always contain the number of response values you requested. The last argument always has to be the `requestId`. In this example we don't use it but in most cases you will need it.

The type of the array you receive in your callback depends on the adapter. An adapter can return a boolen value, an integer or a string. What type the adapter returns is fixed in most cases but an adapter can also decide what type to return each time it is invoked, based on the data it fetches or other factors.

That means, in some special cases, depending on the adapter, it might be necessary to implement a callback for each type the adapter can return.

```solidity
function someDataCallback(bool[] memory someData, uint256 requestId) public onlySimplOracle
function someDataCallback(uint256[] memory someData, uint256 requestId) public onlySimplOracle
function someDataCallback(string[] memory someData, uint256 requestId) public onlySimplOracle
```

These functions can actually have the same name due to function overloading in solidity.

As you can see, the exact implementation depends on which adapter(s) you want to use and how. What an adapter does, what options it has and what it returns, is described in it's *package.json* file.

#### Optional Paramters

The `makeSimplorRequest` function exists in multiple variations (again [function overloading](https://solidity.readthedocs.io/en/v0.7.1/contracts.html#function-overloading)), making sure the most simple calls can be represented very simple as well.

For more advanced use cases there are some optional paramters that you can use.

##### Required Responses

Most commonly you might want to have more than one response from the network. You do that by simply passing that information as a third argument.

```
makeSimplorRequest(
  "@simplor/coingecko-eth-price",
  this.onEthPriceFulfill.selector,
  3
);
```

In this case your `onEthPriceFulfill` callback will only be called as soon as 3 different oracle nodes actually responded with the requested data and you can then process the data however you need to.

##### Error Callback

In case the adapter can return special error responses (e.g. when some underlying service is not accessible) you need to specify an error callback for that as well.

```
makeSimplorRequest(
  "@somecompany/some-custom-platform-adapter",
  this.onFulfill.selector,
  1,
  this.onError.selector
);
```

As you can see you still have to provide the third argument, which is the number required responses.

##### Expire Timestamp

In the fifth arguemnt you can set a custom time to live for your request. After that oracles will not try to respond anymore (e.g. if the adapter takes to long).

```
makeSimplorRequest(
  "@somecompany/some-heavy-processing-adapter",
  this.onFulfill.selector,
  1,
  this.defaultErrorCallback.selector,
  block.timestamp + 1 hour
);
```

The standard oracle installation has a default of 5 minutes.

##### Passing Data

Many adapters have parameters and require to pass some data with your request. That's the last possible argument.

```
makeSimplorRequest(
  "@somecompany/some-heavy-processing-adapter",
  this.onFulfill.selector,
  1,
  this.defaultErrorCallback.selector,
  block.timestamp + 5 minutes,
  abi.encodePacked(myValue)
);
```

The data needs to be of type `bytes32`.

### Price per Response

SimplOr uses ETH for payments. You don't need to convert to any other token. Just make sure your contract has enough ETH to pay for requests.

In SimplOr you pay for responses the moment your contract receives them. Prices or fees are always bound to the gas cost of the underlying transaction. **That also means that the efficiency of your callback functions affects the price of each response.**

The main factor for pricing though are the adapters. An adapter can define a price factor of up to 10 (stored on the blockchain and adjustable through governance) that will be multiplied with the gas cost of the response transaction.
With a factor of 1 (default) the only costs you need to cover when receiving data is the gas cost of the response transaction. A factor of 2 doubles that and the node receives a gas refund and the adapter earns the same amount. The final price will always be equally split between node and adapter.

### Minimum Consumer Example

In this minimum example we request the current ETH price, aggregated from different sources (this adapter's default) and store it in a storage variable.

```solidity
pragma solidity ^0.7.1;

import "./SimplorConsumer.sol";

contract ConsumerExample is SimplorConsumer {
  uint256 _ethPrice;

  constructor(address simplorGatewayAddress)
  SimplorConsumer(simplorGatewayAddress) payable {}

  function requestEthPrice() external {
    makeSimplorRequest(
      "@simplor/coingecko-eth-price",
      this.onEthPriceFulfill.selector
    );
  }

  function onEthPriceFulfill(uint256[] memory ethPrices, uint256 requestId) public onlySimplOracle {
    _ethPrice = ethPrices[0];
  }
}

```


### Advanced Consumer Example

A slightly more complex example, using the anyurl adapter, could look like this.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "./SimplorConsumer.sol";

contract ConsumerExample is SimplorConsumer {
  bool _isValid = false;
  uint256 _errors = 0;

  constructor(address simplorGatewayAddress)
  SimplorConsumer(simplorGatewayAddress) payable {}

  function requestUrls() external {
    // Oracles will choose one of those two URLs randomly.
    string url1 = "https://api.example.com";
    string url2 = "https://api.other-example.org";
    // Some heavy processing is involved so we set an expire date 1 hour in the future
    makeSimplorRequest(
      "@simplor/anyurl",
      this.onUrlFulfill.selector,
      10,
      this.onUrlError.selector,
      block.timestamp + 1 hour,
      abi.encodePacked(url1, url2, 1)
    );
  }

  // We know that both of our URLs will return a boolean value.
  // We will get 10 of them whenever this function gets called.
  function onUrlFulfill(bool[] memory isExampleValid, uint256 requestId) public onlySimplOracle {
    uint8 confirmations = 0;
    for (uint8 i = 0; i < 10; i++) {
      if (isExampleValid[i]) {
        confirmations++;
      }
    }

    if (confirmations >= 5) {
      _isValid = true;
    }
  }

  // Store errors and emit event so that our dapp can react accordingly.
  function onUrlError(uint256 errorCode, uint256 requestId) public onlySimplOracle {
    _errors++;
    emit SimplorAdapterResponseErrorEvent(errorCode, requestId);
  }
}
```
