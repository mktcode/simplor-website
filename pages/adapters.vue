<template>
<div>
  <Nav back-link="/" logo class="border-bottom" title="Adapters" />
  <input type="text" class="form-control form-control-lg border-0 rounded-0" placeholder="Search adapters..." />
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
</template>

<script>
export default {
  transition: 'fade'
}
</script>
