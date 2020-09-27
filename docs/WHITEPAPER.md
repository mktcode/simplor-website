# <center>SimplOr</center>
## <center>Simple & flexible Oracle Service for Ethereum Smart Contracts</center>

<center>Markus Kottländer</center>
<center>September 22nd 2020</center>
<center>v0.1</center>

### Content

- [0. In Brief: What is an Oracle?](#0-In-Brief-What-is-an-Oracle?)
- [1. Facilitating Consensus](#1-Facilitating-Consensus)
  - [1.1 The Dynamic Data Problem](#11-The-Dynamic-Data-Problem)
  - [1.2 Per-Request Consensus](#12-Per-Request-Consensus)
  - [1.3 We are wrong!](#13-We-are-wrong)
  - [1.4 Byzantine Fault Tolerance (BFT)](#14-Byzantine-Fault-Tolerance-BFT)
- [4. Monetization](#1-Monetization)

# 0. In Brief: What is an Oracle?

Oracles or Oracle networks solve a crucial problem of decentralized, blockchain-based smart contract platforms. Since such contracts need to be deterministic they are isolated from any outside data sources while processing transactions. That means any dynamic data from the outside world needs to be proactively transmitted to them before they can process it.

Oracles are enteties that provide this data in a secure enough way, for a smart contract to store it on its underlying, immutable blockchain.

Trusted oracles are those you explicitly trust and choose to provide data for you, like an official institution you trust.

These oracles have the downside that they are single points of failure and can often not offer the redundancy a secure and reliable application needs.

A trustless oracle is an oracle you don't need to trust and that can't easily be attacked, because you don't rely on only one of them but on an entire network of oracles, trying to find consensus over the correct response for the request you made.

# 1. Facilitating Consensus

## 1.1 The Dynamic Data Problem

Trustless, decentralized oracle networks will always face the problem of facilitating consensus over very dynamic data.
An oracle might report a gold price of $1.869,17 while another one reports $1,869.19
because of a slight delay between both API requests and because the
gold price is so volatile. So even though both oracles got their data from the same source, the results might differ slightly.

For a human being it is easy to make sense of these numbers while an automated oralce requires predefined algorithms, which depend on the type of data that was requested. The gold price has a different tolerance for deviation than the current average temperature in your home town or the status of your new startup's fundraising.

This is why most current solutions leave data aggregation and finding consensus simply to the consumer.
Decentralization has to be achieved "on-chain", which is expensive.

## 1.2 Per-Request Consensus

In SimplOr the adapters that the oracles use to fetch data are
also responsible for providing a reasonable deviation tolerance algorithm or even
multiple ones to let the consumer decide.

So basically the consumers and the adapters provide a per-request consensus algorithm,
specific to the requested data, that the oracle network will rely on.

## 1.3 We are wrong!

The other part in the process of facilitating consensus happens in an "We are wrong!" approach. The first oracle that fetches data for a request, simply
stores it on the oracle blockchain. The next one compares its own result to the existing one(s) and removes
all if the adapter's deviation function detects a too significant deviation. If the deviation is within the predefined range, the result is just added and the next oracle will continue. This process repeats until a desired amount of oracles in a row returned the same sufficiently similar results.

## 1.4 Byzantine Fault Tolerance (BFT)

By requiring a number of consecutively same results, chances for a majority of oracles to find a consensus is amplified, compared to the chances the respective minority has. That leads to an effect where even at a 49% corruption rate, the system can still return 60% correct results, which is significantly more than 51%.

The required number of consecutively same results is dynamically adjusted based on failure rate. The more the network experiences deviating data the harder it will become to reach consensus while always amplifying chances of the majority. At a 40% organized corruption rate (same wrong values) the network can still reach success rates of over 99%, given a large amount of nodes (~10,000). With one third corruption (BFT) it is a 100%.

# 3. Competition
## 3.1 Advantages
## 3.2 Disadvantages
## 3.3 MVP
# 4. Monetization

## 4.1 Registration

A fee is charged for registering nodes and adapters.

## 4.1 MergePay

MergePay will be the first experimental project using the SimplOr network.
As a decentralized payment and donation service for the software collaboration
platform GitHub, it needs information about contributions and accounts, which will
require SimplOr adapters tailored for those needs.
This will add a real world scenario for the oracle network to be tested with.

MergePay will be developed simultaneously as required and finished and launched
after a successful launch of SimplOr. It allows users to deposit funds that can be automatically released to the receiving party once certain conditions on GitHub are met or to simply transfer value between GitHub accounts without knowing their address.

Monetization is implemented in the form of a simple fee model and automated marketing services.

Prototype available at: https://mergepay.uber.space

# Notes
- Adapter Security
- Node Selection
- Code checks (binary with checksum?)
- MergePay integration
- Governance:
  - removing adapters
  - node/adapter split
- Consens Demo on Website
- Aggregating same requests
- Custom governance token
  - Mint through consensus
  - Uniswap LPs
    - can vote on other oracles to become trusted
    - earn more fees
    -
