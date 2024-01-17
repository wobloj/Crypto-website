async function fetchData(){
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2c319d3103msh1390d1fcb76c01ep105b1bjsn65e39beb8989',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayStatsData(result.data.stats);
        displayCoinsInTable(result.data.coins);
    } catch (error) {
        console.error(error);
    }
}
fetchData();

function displayStatsData(stats){
    mainDiv.innerHTML += 
    `
        <div class="stats">
            <span><b>Cryptos:</b> ${stats.total}</span>
            <span><b>Total coins:</b> ${stats.totalCoins}</span>
            <span><b>Markets:</b> ${stats.totalMarkets}</span>
            <span><b>Exchanges:</b> ${stats.totalExchanges}</span>
            <span><b>Market cap:</b> ${stats.totalMarketCap}</span>
            <span><b>24h vol:</b> ${stats.total24hVolume}</span>
        </div>
    `
}

const mainDiv = document.getElementById("main");

function displayCoinsInTable(coins){
    mainDiv.innerHTML +=
    `
        <table id="coinsTable">
            <thead>
                <th>Rank</th>
                <th></th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
            </thead>
            <tbody id="coinsData">
                
            </tbody>
        </table>
    `;

    coinsDataElement = document.getElementById("coinsData")
    coins.forEach(coin => {
        coinsDataElement.innerHTML += 
        `
            <tr id="${coin.uuid}">
                <td>${coin.rank}</td>
                <td><img src="${coin.iconUrl}" alt="Icon of ${coin.name}"></td>
                <td><div class="fullName">${coin.name} <span style="color:#757575;font-size:14px">${coin.symbol}</span></div></td>
                <td>$${parseFloat(coin.price).toFixed(4)}</td>
                <td class="${setColor(coin.change)}">${coin.change}%</td>
            </tr>
        `
    });
}

function setColor(value){
    value = parseFloat(value);
    if(value > 0)
        return "textGreen"
    else if(value < 0)
        return "textRed"
    else
        return ""
}