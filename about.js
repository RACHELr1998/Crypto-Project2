// show 'About' tab
function showAboutMe(){

    let nav = document.getElementById("ulNav");
    nav.innerHTML=
    `<li class="nav-item">
	<button class="nav-link  btn btn primary" aria-current="page" id="btnNav" onclick="apiCoins()">Home</button>
	</li>
	<li class="nav-item">
		<button class="nav-link active btn btn primary" aria-current="page" onclick="showAboutMe()">About</button>
	</li>`

    const main = document.getElementById("mainCrypto");
    main.innerHTML = ``; 
    
    let div = document.getElementById("divAbout")

    div.innerHTML =
    `<div class="card mb-3 styleCardAbout">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="assets/images/SCHINDLER_09_RACHEL_230.jpg" class="img-fluid rounded-start imgAbout">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">About Me</h5>
                    <br/>
                    <h6 class="card-text">My name is Rachel Rozental.<br/>
                    I work for a high-tech finance company.<br/>
                    I started at the end 21' studying at the 'John Bryce' College a Full-Stuck course in web technology.<br/>
                    I am very interested in this field and find my self successful.</h6>
                    <br/>
                    <p>
                    In this project I was required to develop an application That deals with crypto coins.<br/> 
                    The main page has a server call to the API that returns an array of objects <br/> 
                    that contain the name and symbol of the crypto coins.<br/>
                    In each card you can click on the 'More info' button and get information about<br/>
                    the currency exchange rates in Dollar, Euro and NIS.<br/>
                    You can also click on the 'Toggle' button on the top right of the card, and add up to five coins to your report.<br/>
                    Click on currency number six will open a 'modal' that allows you to remove one of the five coins you selected.
                    and put in its index the sixth currency chosen. If you regret, 
                    click the Cancel button and you will return to the previous screen of all the coins and see the five coins you selected,<br/>
                    and continue to remove or add more coins.<br/>
                    </p>
                </div>
            </div>
        </div>
    </div>`
}
