# Consuming Data

Consuming data with SimplOr is very easy. In your smart contract you simply emit request events specifying an adapter and a callback.
The adapter defines how the event data needs to be structured, how your callback needs to be implemented and how much a single request response cycle will cost your contract.

### Setup

First you need to install the SimplOr consumer contract to inherit from.

```shell=
npm i --save @simplor/consumer
```

```javascript=
pragma solidity ^0.7.1;

import "@simplor/SimplorConsumer.sol";

contract ConsumerExample is SimplorConsumer { ... }
```

You also need to set the address of the SimplOr Registration Gateway. To do so use the `setRegistrationGateway` function.

```javascript
constructor(address simplorRegistrationGatewayAddress) SimplorConsumer() {
  setRegistrationGateway(simplorRegistrationGatewayAddress);
}
```

While calling the `SimplorConsumer()` constructor is required, passing and setting the `simplorRegistrationGatewayAddress` can happen at any time and in any other method.

### Register Events

In order to request data you need to specify an event first, that you want the SimplOr network to listen for.

Choose a name for your event and define its attributes. The minimum required attributes for an event are a unique request ID, the name of the adapter you want to use and the signature of the callback function of your contract you want to be invoked when an oracle responds. Additionally you can define an expire date, an error callback or a specific node you want to respond. (Otherwise any node supporting the requested adapter can respond.) Depending on the adapter more attributes might also be required.

The simplest form of a request event would look like this:

```javascript
event MyEthPriceEvent(
  uint256 requestId,
  string adapterName,
  bytes4 fulfillCallback
);
```

An event with all optional attributes and an additional *sourceId* attribute (defined by the adapter) could look like this:

```javascript
event MyEthPriceEvent(
  uint256 requestId,
  string adapterName,
  address node,
  bytes4 fulfillCallback,
  bytes4 errorCallback,
  uint256 expire,
  string sourceId
);
```

After you decided which adapter you want to use and you defined an event, you need to register that event on the SimplOr Registration Gateway you set earlier. Once you called the following function, the SimplOr network will listen to that event.


```javascript
registerSimplorEvent("MyEthPriceEvent");
```

### Receiving Responses

SimplOr is decentralized by default. But there are two factors that determine how decentralized a response will be: The number of oracles you require to respond before your callback gets invoked and the adapter that is responsible for fetching the actual data. The default adapter for requesting the ETH price for example let's you decide if you want to have a decentralized median result or a result from one specific source.

So basically you decide how many confirmations of a response you want and the adapter decides (or lets you decide) how decentralized the data sources shall be.

If you just want a single response from the oracle network the only thing you have to do is to emit your event and define a callback.

```javascript
function requestEthPrice() external {
  emit MyEthPriceEvent(
    _nextSimplorReqID(),
    "@simplor/adapters/eth-price",
    this.ethPriceCallback.selector
  );
}

function ethPriceCallback(uint256[] memory ethPrices, uint256 requestId) public onlySimplOracle {
  _ethPrice = ethPrices[0];
}
```

You might notice that the response comes as an array. This will always be the case, no matter if you request one or more responses. But it will always contain the number of response values you requested. The last argument always has to be the `requestId`. In this example we don't use it but in most cases you will need it.

The type of the array you receive in your callback depends on the adapter. An adapter can return a boolen value, an integer or a string. What type the adapter returns is fixed in most cases. But an adapter can also decide what type to return each time it is invoked, based on the data it fetches or other factors.

That means, depending on the adapter, it might be necessary to implement a callback for each type the adapter can return.

```javascript
function ethPriceCallback(bool[] memory ethPrices, uint256 requestId) public onlySimplOracle
function ethPriceCallback(uint256[] memory ethPrices, uint256 requestId) public onlySimplOracle
function ethPriceCallback(string[] memory ethPrices, uint256 requestId) public onlySimplOracle
```

These functions can actually have the same name due to function overloading in solidity.

As you can see, the exact implementation depends on which adapter(s) you want to use and how. What an adapter does, what options it has and what it returns, is described in it's *package.json* file.

### Price per Response

...
