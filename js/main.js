/*slider.js*/
let diapo = new Slider();



/*map.js*/
const lyon = new Map ('map', [45.764043,4.835659], 10, 18, "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=1b1917b6ec33bb3941fb1fad202ec1123e8170d9");


/*canvas.js*/
const canvasLyon = new Signature ();

/* Lancer la map et les marqueurs */
window.addEventListener('load', () => { 
    lyon.displayMarkers()  /*chargement de la map*/
});


/*GLOBAL LISTENER */

/*Quand on clique sur le bouton "Réserver" le formulaire s'affiche*/
document.querySelector('#reservationButton').addEventListener('click', e => {
	/*si il y'a déjà une reservation, on affichera un message */
	if (timerLyon.min>=0 && timerLyon.sec>0) {
        let confirmNewBooking = confirm("Attention une réservation est déjà en cours ! Cliquez sur OK pour effectuer une nouvelle réservation et écraser la première. Cliquez sur annuler pour conserver votre réservation en cours.");
	        if (confirmNewBooking == true) {
	            document.querySelector('#formulaire').style.visibility = 'visible';;
	        } else {};
	    	}
    else { 
    	document.querySelector('#formulaire').style.visibility = 'visible';}

});

/*Quand on clique sur le bouton annuler le formulaire disparait*/
document.querySelector('#cancelButton').addEventListener('click', e => {
	document.querySelector('#formulaire').style.visibility = 'hidden';
});


/*Effacement de la signature selon 3 options */
document.querySelector('#clear').addEventListener('click', e => canvasLyon.clearSign());  /* avec le bouton effacer */
document.querySelector('#cancelButton').addEventListener('click', e => canvasLyon.clearSign()); /* avec le bouton annuler */
document.querySelector('#reservationButton').addEventListener('click', e => canvasLyon.clearSign()); /*avec le bouton reserver*/


/*Validation de la réservation*/
document.querySelector('#submitButton').addEventListener('click', e => {

	if (document.querySelector('#name').value == "" || document.querySelector('#firstname').value =="") {
		alert("Veuillez entrer notre nom et prénom")
		return;}

	// if (canvasLyon.checkSign == false) {
	// 	alert("Veuillez signer pour valider votre réservation")
	// 	return;}

	if (canvasLyon.checkSign) {

		if (document.querySelector('#name').value !== "" && document.querySelector('#firstname').value !== "") {

			/* on envoie à localStorage les informations du nom et prénom du client qui vient de signer*/
		    localStorage.setItem('name', document.querySelector('#name').value);
		    localStorage.setItem('firstname', document.querySelector('#firstname').value);


		    /* on envoie à sessionStorage les informations du noms de la stations choisi*/
		    sessionStorage.setItem('nameStation', document.querySelector('#nameStation').innerHTML);
		    sessionStorage.setItem('availableBikes', document.querySelector('#availableBikes').innerHTML);

		    /*on enleve un velo dans l'information "velos disponibles" des qu'on valide la reservation */
		    document.querySelector('#availableBikes').innerHTML = sessionStorage.getItem('availableBikes') - 1;

		    /* on fait disparaitre le formulaire ainsi que ses boutons */
			document.querySelector('#formulaire').style.visibility = 'hidden';
		    document.querySelector('#clear').style.visibility='hidden';
		    document.querySelector('#submitButton').style.visibility='hidden'; }

		    /* On afffiche et active le timer */
		   	timerLyon.startTimer(Date.now() + 20*60*1000); 
		    } else{
		    	alert("Veuillez signer pour valider votre réservation");
		    }
});

/*Annulation de la réservation*/
document.querySelector('#cancelReservation').addEventListener('click', e => {
	
	 let confirmCancel = confirm("Attention la map et les données en cours seront rafraichies ! Vous devrez à nouveau chercher votre station. Cliquez sur ok pour confirmer votre annulation.");
	        if (confirmCancel == true) {
	           timerLyon.stopTimer();
	           location.reload();
	        } else {};
});


/*timer.js*/
const timerLyon = new Timer ();


/*Nom et Prénom sont conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé.*/
/*si il y'a un nom et prenom deja enregistré dans l'API Web Storage, on préremplit dans l'espace nom et prenom du formulaire */
if (localStorage.getItem('name')!== "" && localStorage.getItem('firstname') !== "") {
	document.querySelector('#name').value = localStorage.getItem('name');
	document.querySelector('#firstname').value = localStorage.getItem('firstname');
} 
