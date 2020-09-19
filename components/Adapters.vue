<template>
  <div class="py-5">
    <div class="container">
      <h1 class="my-5">Adapters</h1>
      <p class="lead">
        Adapters are basically <b>npm packages with an Ethereum address</b> (and an optional price factor), exposing a single function that takes a SimplOr request, processes it and returns a response object.
      </p>
      <p class="lead">
        To support an adapter a node simply needs to have the package installed. It will then automatically try to respond to all requests using that adapter.
        All adapters listed below are included in the default installation and additional adapters can be installed at any time.
      </p>
      <p class="lead">
        In your smart contract you simply emit request events specifying an adapter and a callback. The callback automatically refunds the gas cost to the responding node.
        For free adapters, like the built-in anyurl adapter, that's all you pay. Other adapters may set an individual price factor of up to 10 (adjustable through governance), increasing the fee relative to that gas cost, which is then equally split between node and adapter.
        This means the price for a request is always bound to general transaction cost on Ethereum and also depends on how efficiently you process responses in your contract.
      </p>

      <div class="card shadow-lg my-5 adapters-list">
        <input type="text" class="form-control form-control-lg border-0" placeholder="Search adapters..." />
        <table class="table">
          <tr>
            <th>Package Name</th>
            <th>Author</th>
            <th class="text-right">Price/Response</th>
          </tr>
          <tr>
            <td>
              <a href="#">@simplor/adapters/anyurl</a><br>
              <small><a href="#" class="text-muted">https://github.com/mktcode/simplor-adapt...</a></small>
            </td>
            <td>
              <a href="#">simplOr</a><br>
              <small class="text-muted">0x27711...9E520</small>
            </td>
            <td class="text-right">gas only</td>
          </tr>
          <tr>
            <td>
              <a href="#">@simplor/adapters/pricefeeds/eth-usd</a><br>
              <small><a href="#" class="text-muted">https://github.com/mktcode/simplor-adapt...</a></small>
            </td>
            <td>
              <a href="#">simplOr</a><br>
              <small class="text-muted">0x27711...9E520</small>
            </td>
            <td class="text-right">gas 2x</td>
          </tr>
          <tr>
            <td>
              <a href="#">@mktcode/simplor-adapters/github-merged</a><br>
              <small><a href="#" class="text-muted">https://github.com/mktcode/simplor-adapt...</a></small>
            </td>
            <td>
              <a href="#">mktcode</a><br>
              <small class="text-muted">0x27711...9E520</small>
            </td>
            <td class="text-right">gas 3x</td>
          </tr>
          <tr>
            <td>
              <a href="#">@someone123/simplor/mytask-hook</a><br>
              <small><a href="#" class="text-muted">https://github.com/mktcode/simplor-adapt...</a></small>
            </td>
            <td>
              <a href="#">someone123</a><br>
              <small class="text-muted">0x27711...9E520</small>
            </td>
            <td class="text-right">gas only</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
