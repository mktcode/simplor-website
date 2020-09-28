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
  - [1.3 We are wrong! Consensus](#13-We-are-wrong-Consensus)
  - [1.4 Byzantine Fault Tolerance (BFT)](#14-Byzantine-Fault-Tolerance-BFT)
- [4. Monetization](#4-Monetization)
  - [4.1 Registration](#41-Registration)
  - [4.2 MergePay](#42-MergePay)

# 0. In Brief: What is an Oracle?

Orakel oder Oracle-Netzwerke lösen ein entscheidendes Problem dezentraler, Blockchain-basierter Smart Contract-Plattformen. Da solche Verträge deterministisch sein müssen, werden sie bei der Verarbeitung von Transaktionen von externen Datenquellen isoliert. Das bedeutet, dass dynamische Daten aus der Außenwelt proaktiv an sie übertragen werden müssen, bevor sie verarbeitet werden können.

Orakel sind Entitäten, die diese Daten auf eine ausreichend sichere Weise bereitstellen, damit ein intelligenter Vertrag sie in seiner zugrunde liegenden und unveränderlichen Blockchain speichern kann.

Vertrauenswürdige Orakel sind diejenigen, denen Sie ausdrücklich vertrauen und die Daten für Sie bereitstellen, wie eine offizielle Institution, der Sie vertrauen.

Diese Orakel haben den Nachteil, dass sie einzelne Fehlerquellen sind und häufig nicht die Redundanz bieten können, die eine sichere und zuverlässige Anwendung benötigt.

Ein vertrauenswürdiges Orakel ist ein Orakel, dem Sie nicht vertrauen müssen und das nicht einfach manipuliert oder angegriffen werden kann, da Sie sich nicht nur auf eines von ihnen verlassen, sondern auf ein ganzes Netzwerk von Orakeln, wodurch automatisch ein Konsens über die Richtigkeit erzielt wird der von Ihnen angeforderten Daten.

# 1. Facilitating Consensus

## 1.1 The Dynamic Data Problem

Vertrauenslose, dezentrale Orakel-Netzwerke werden immer vor dem Problem stehen, einen Konsens über sehr dynamische Daten zu ermöglichen.
Ein Orakel meldet möglicherweise einen Goldpreis von 1,869,17 USD, während ein anderes 1.869,19 USD meldet, da sich beide API-Anforderungen geringfügig verzögern und Gold ein volatiler Vermögenswert ist. Obwohl beide Orakel ihre Daten aus derselben Quelle bezogen haben, können die Ergebnisse geringfügig abweichen.

Für einen Menschen ist es einfach, diese Zahlen zu verstehen, während eine automatisierte mündliche Verhandlung vordefinierte Algorithmen erfordert, die von der Art der angeforderten Daten abhängen. Der Goldpreis hat eine andere Abweichungstoleranz als die aktuelle Durchschnittstemperatur in Ihrer Heimatstadt oder der Status der Spendenaktion Ihres neuen Startups.

Aus diesem Grund überlassen viele andere Lösungen die Datenaggregation und die Konsensfindung einfach dem Verbraucher.
Die Dezentralisierung muss "in der Kette" erfolgen, was teuer ist.

## 1.2 Per-Request Consensus

In SimplOr sind die Adapter, mit denen die Orakel Daten abrufen
auch verantwortlich für die Bereitstellung eines angemessenen Abweichungstoleranzalgorithmus oder sogar
mehrere, damit der Verbraucher entscheiden kann.

Grundsätzlich bieten die Verbraucher und die Adapter einen Konsensalgorithmus pro Anfrage.
spezifisch für die angeforderten Daten, auf die sich das Oracle-Netzwerk verlassen wird.

Auf diese Weise können auch sehr dynamische Daten wie Preisinformationen verarbeitet werden, um den Konsens auf vernünftige Weise zu erleichtern.

## 1.3 We are wrong! Consensus

Der andere Teil des Prozesses zur Erleichterung des Konsenses geschieht in einem "Wir liegen falsch!" Ansatz. Das erste Orakel, das einfach Daten für eine Anfrage abruft
speichert es in der Orakel-Blockchain. Der nächste vergleicht sein eigenes Ergebnis mit dem vorhandenen und entfernt es
alles, wenn die Abweichungsfunktion des Adapters eine zu signifikante Abweichung erkennt. Wenn die Abweichung innerhalb des vordefinierten Bereichs liegt, wird das Ergebnis nur hinzugefügt und das nächste Orakel wird fortgesetzt. Dieser Vorgang wiederholt sich, bis eine gewünschte Anzahl von Orakeln in einer Reihe die gleichen ausreichend ähnlichen Ergebnisse liefert.

## 1.4 Byzantine Fault Tolerance (BFT)

Durch das Erfordernis einer Reihe von nacheinander gleichen Ergebnissen wird die Wahrscheinlichkeit, dass die Mehrheit der Orakel einen Konsens findet, im Vergleich zu den Chancen der jeweiligen Minderheit erhöht. Dies führt zu einem Effekt, bei dem das System selbst bei einer Korruptionsrate von 49% immer noch 60% korrekte Ergebnisse zurückgeben kann, was deutlich mehr als 51% entspricht.

Die erforderliche Anzahl von nacheinander gleichen Ergebnissen wird basierend auf der Ausfallrate dynamisch angepasst. Je mehr abweichende Daten im Netzwerk auftreten, desto schwieriger wird es, einen Konsens zu erzielen und gleichzeitig die Chancen der Mehrheit zu erhöhen. Bei einer organisierten Korruptionsrate von 40% (gleiche falsche Werte) kann das Netzwerk bei einer großen Anzahl von Knoten (~ 10.000) immer noch Erfolgsraten von über 99% erreichen. Bei einem Drittel Korruption (BFT) handelt es sich um 100%.

# 2. Data Requests
## 2.1 Consumers
## 2.2 Adapters
# 3. Competition
## 3.1 Advantages
## 3.2 Disadvantages
## 3.3 MVP
# 4. Monetization

## 4.1 Registration

Für die Registrierung von Knoten und Adaptern wird eine Gebühr erhoben.

## 4.2 MergePay

MergePay wird das erste experimentelle Projekt sein, das das SimplOr-Netzwerk verwendet.
Als dezentraler Zahlungs- und Spendendienst für die Software-Zusammenarbeit
Für die Plattform GitHub werden Informationen zu Beiträgen und Konten benötigt, für die SimplOr-Adapter erforderlich sind, die auf diese Anforderungen zugeschnitten sind.
Dadurch wird ein reales Szenario für das zu testende Oracle-Netzwerk hinzugefügt.

MergePay wird nach Bedarf gleichzeitig entwickelt und fertiggestellt und gestartet
nach einem erfolgreichen Start von SimplOr. Es ermöglicht Benutzern, Geld einzuzahlen, das automatisch an die empfangende Partei freigegeben werden kann, sobald bestimmte Bedingungen auf GitHub erfüllt sind, oder einfach Wert zwischen GitHub-Konten zu übertragen, ohne ihre Adresse zu kennen.

Die Monetarisierung erfolgt in Form eines einfachen Gebührenmodells und automatisierter Marketingdienste.

Prototyp verfügbar unter: https://mergepay.uber.space

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
    - (loose dependency, optional/replaceable)
    - can vote on other oracles to become trusted
    - earn more fees
    -
