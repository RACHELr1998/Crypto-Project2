//  Array variable for storing all the coins 
let arrCoins = [];

// Array variable of the client's coins
const listCoins = [];

let progressBar = document.getElementById("divProgressBar");

// fetch api crypto
function apiCoins() {
   
    listCoins.map(coin => listCoins.splice(coin) )
    
    let nav = document.getElementById("ulNav");
    nav.innerHTML =
        `<li class="nav-item">
            <button class="nav-link active btn btn primary" aria-current="page" id="btnNav" onclick="apiCoins()">Home</button>
        </li>
        <li class="nav-item">
            <button class="nav-link btn btn primary" aria-current="page" onclick="showAboutMe()">About</button>
            </li>`

    progressBar.innerHTML = `<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressBar" aria-valueNow="100" aria-valuemin="0" aria-valuemax="100" ></div>
    </div>`

    const main = document.getElementById("mainCrypto");
    main.innerHTML = ``;

    const div = document.getElementById("divAbout");
    div.innerHTML = ``;

    fetch('https://api.coingecko.com/api/v3/coins')
        .then(res => res.json())
        .then(data => {
            progressBar.innerHTML = ``;
            arrCoins = data;
            mapArrayCoins(arrCoins);
        })

}

apiCoins();


// Map crypto Array
function mapArrayCoins(arrCoins) {

    arrCoins.map((element) => {

        showCoin(element);

    })
}


// Show all the crypto-coins by Bootstrap cards
function showCoin(coin) {

    let main = document.getElementById("mainCrypto");

    main.innerHTML +=
        `<div class="card col-sm-12 col-md-3" id="cryptoCards">
            <div class="card-body">
                   
                <div class="form-check form-switch" id="divSwitch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked${coin.id}" 
                    onclick="addCoin('${coin.id}', '${coin.symbol}')">
                    <label class="form-check-label" for="flexSwitchCheckChecked${coin.id}"></label>
                </div>
               
                <h4 class="card-title">${coin.symbol}</h4>
                <p class="card-text">${coin.id}</p>
                <button id="btnCollapse" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${coin.id}" 
                aria-expanded="false" aria-controls="collapseExample${coin.id}" onclick="detailsCrypto('${coin.id}')">
                More info</button>
    
                <div class="collapse" id="collapseExample${coin.id}"></div>

            </div>
        </div>`
        
}


// CACHE variable for storing coins information
const coinsCache = {};

// 'More info' on-click and save in the CACHE variable
function detailsCrypto(id) {

    const symbol = id;

    if (!coinsCache[symbol]) {

        progressBar.innerHTML = `<div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressBar" aria-valueNow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`

        fetch(`https://api.coingecko.com/api/v3/coins/${symbol}`)
            .then(res => res.json())
            .then(data => {

                progressBar.innerHTML = ``;

                coinsCache[symbol] = data;

                showCollapse(coinsCache[symbol], symbol);

                setTimeout(() => {
                    delete coinsCache[symbol];
                }, 1000 * 60 * 2);

            });

    } else {

        showCollapse(coinsCache[symbol], symbol);
    }
}


// show collapse with details of the coin
function showCollapse(detailsOfCrypto, symbol) {

    let htmlStr = ``;
  
    htmlStr =
        `<div class="card card-body">
        <p >
        <img src="${detailsOfCrypto.image.thumb}" width="20%"/>
        <h6> The exchange rates according to the following coins: </h6>
        <span>USD: $ ${detailsOfCrypto.market_data.current_price.usd} </span>
        <span>EURO: € ${detailsOfCrypto.market_data.current_price.eur} </span>
        <span>NIS: ₪ ${detailsOfCrypto.market_data.current_price.ils} </span>
        </p>
        </div>`

    let div = document.getElementById(`collapseExample${symbol}`);
    div.innerHTML = htmlStr;
}


// search button on-click
function searchCrypto() {

    const symbolToSearch = searchInput.value;

    let coin;

    if (coin = arrCoins.find(c => { return c.symbol === symbolToSearch })) {

        let main = document.getElementById("mainCrypto");
        main.innerHTML = ``;

        const div = document.getElementById("divAbout");
        div.innerHTML = ``;

        const divReports = document.getElementById("chartContainer");
        divReports.innerHTML = ``; 

        showCoin(coin);

    }else{

        if(searchInput.value === '') {
            const warning = document.getElementById("searchWarning")
            warning.innerHTML = `You didn't enter a search symbol !`
            setTimeout(() => {
                warning.innerHTML = ``
            }, 3000)
        }else{
            const warning = document.getElementById("searchWarning")
            warning.innerHTML = `You must look for the correct symbol of the coin !`
            setTimeout(() => {
                warning.innerHTML = ``
            }, 3000)
        }
    } 

    searchInput.value = '';

}


// 'toggle' on-click
function addCoin(id, symbol) {

    let switchInputToAddCoin = document.getElementById(`flexSwitchCheckChecked${id}`);

    const coin = { id, symbol };
    
    if (switchInputToAddCoin.checked) {

        if(listCoins.length === 5){

            switchInputToAddCoin.checked = !switchInputToAddCoin.checked;
            
            let coinSixIndex = coin;
            
            showModal(listCoins, coinSixIndex);

        }else {

            listCoins.push(coin);
    
        }
      
    } else {

        const index = listCoins.findIndex(c => c.id === id);

        if (index >= 0)

            listCoins.splice(index, 1);
    }

}


let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
const modalBodyCoins = document.getElementById("modalBodyCoins");
const modalFooter = document.getElementById("modalFooter");

// show modal when the client push into an array of more than five coins 
function showModal(listCoins, coinSixIndex) {

    const idCoin =  listCoins.find(coin => coin.id);

    modalBodyCoins.innerHTML = ``;

    listCoins.map(coin => {
      
        modalBodyCoins.innerHTML += ` 
            <div id="cryptoCardsModal" class="card col-6"> 
            <div class="card-body" >
    
            <div class="form-check form-switch" id="divSwitchModal">
                <input class="form-check-input" type="checkbox" id="flexSwitchChecked${coin.id}, ${coinSixIndex.id}" 
                onclick="removeCoin('${coin.id}', '${coin.symbol}', '${coinSixIndex.id}', '${coinSixIndex.symbol}')" checked>
                <label class="form-check-label" for="flexSwitchChecked${coin.id}"></label>
            </div>
    
            <h4 class="card-title">${coin.symbol}</h4>
            <p class="card-text">${coin.id}</p>
            
            </div>
            </div>`

            
        modalFooter.innerHTML = 
            `<button type="button" class="btn btn-secondary" 
            data-bs-dismiss="modal" >
            Cancel</button>`

        myModal.toggle();

    })

}

// remove coin from the array by `toggle`in the 'modal' and push the six coin into array.
function removeCoin(id, symbol, idSixIndex, symbolSixIndex) {
   
    let switchInputToRemoveCoin = document.getElementById(`flexSwitchCheckChecked${id}`);
    let switchInputToRemoveSixCoin = document.getElementById(`flexSwitchCheckChecked${idSixIndex}`);

    const sixCoin = {id: idSixIndex, symbol:symbolSixIndex};
    const coin = { id, symbol };

    if (switchInputToRemoveCoin.checked) {

        const index = listCoins.findIndex(c => c.id === id);

        if (index >= 0){ 

            listCoins.splice(index, 1, sixCoin);
            switchInputToRemoveCoin.checked = !switchInputToRemoveCoin.checked;
            switchInputToRemoveSixCoin.checked = !switchInputToRemoveSixCoin.checked;

        }  
        
    } else {

        listCoins.push(coin);
        switchInputToRemoveCoin.checked = !switchInputToRemoveCoin.checked;
   
    }

    myModal.hide();
}







