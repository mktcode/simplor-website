<template>
  <div class="py-5">
    <div class="container">
      <h1 class="my-5">Oracles</h1>
      <p class="lead">
        The standard oracle node is written in Javascript and requires Node.js.
        It listens to all request events from registered consumer contracts and it will try to respond to every request that requires an adapter that it has installed.
        You can use a blacklist or a whitelist to control which individual consumers you want to serve. Your node's response transactions will be reverted if the consumer does not have sufficiant ETH to pay the fee.
      </p>

      <div class="card shadow-lg my-5 adapters-list">
        <table class="table mb-0">
          <tr>
            <th class="border-0">Status</th>
            <th class="border-0">Name</th>
            <th class="border-0 text-center">Stake</th>
            <th class="border-0 text-center">Requests fulfilled</th>
          </tr>
          <tr>
            <td>
              <span class="badge badge-success">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">simplOr</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">10 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">468</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="badge badge-success">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">simplOr</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">8 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">422</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="badge badge-success">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">SimplOr</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">5 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">201</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="badge badge-success">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">MergePay</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">5 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">153</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="badge badge-success">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">MergePay</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">1.2 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">113</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="badge badge-warning">&nbsp;&nbsp;</span>
            </td>
            <td>
              <a href="#">mkt</a><br>
              <small><a href="#" class="text-muted">0x27711...9E520</a></small>
            </td>
            <td class="text-center">
              <h5 class="mb-0 font-weight-bold">0.5 ETH</h5>
              <small class="text-muted">1 year, 20 days</small>
            </td>
            <td class="text-center">
              <span class="badge badge-primary">27</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
