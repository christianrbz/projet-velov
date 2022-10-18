class Timer {
    constructor () {
        this.id = document.querySelector('#reservationTimer');

        /* temps du timer */
        this.interval = 0;
        this.min = 0;
        this.sec = 0;
        
        /*cela signifie que c'est egale aux informations de web storage de l'id du html (phrase, nom, prenom) et le temps restant avant fin de reservation */
        this.endTime = sessionStorage.getItem(this.id+'endTime');

        if (this.endTime) {
            this.startTimer(this.endTime);
        }

    }


    /* Mise en route du timer */
    startTimer(duration) {
        this.endTime = duration;

        /* dès qu'il y'a les min et sec supérieurs à 0 on annule le timer précédent*/
        if (this.min>=0 && this.sec>0) {
            this.stopTimer();
        } else {
            this.countDown();  /* sinon on lance un nouveau décompte */
        }

        /* Le décompte se fera toutes les secondes (1seconde=1000ms) */
        this.interval = setInterval(e => this.countDown(), 1000);

        /* On affiche le bouton annuler la reservation */
        document.querySelector('#cancelReservation').style.visibility = 'visible';
    }


    stopTimer() {
        clearInterval(this.interval);
        this.id.innerHTML = 'La réservation est annulée.';

        sessionStorage.removeItem(this.id+'endTime');

        /*Le bouton annuler la reservation disparait */
        document.querySelector('#cancelReservation').style.visibility = 'hidden';
        
    }


    endTimer() {
        clearInterval(this.interval);
        sessionStorage.clear();
        this.id.innerHTML = 'Le temps est écoulé. Votre réservation est annulée. Veuillez faire une nouvelle réservation';

        /* le bouton annuler la reservation disparait */
        document.querySelector('#cancelReservation').style.visibility = 'hidden';
    }


    countDown() {     
        /*Math.ceil(a/1000) permet de récupérer l'entier supérieur en secondes pour éviter un décalage  de récup sur les ms.*/   
        let timeNow = new Date(Math.ceil((this.endTime - Date.now()) / 1000) * 1000); 
        this.min = timeNow.getMinutes();
        this.sec = timeNow.getSeconds();

        /*Si le chiffre des minutes et secondes est inférieur à 10 on ajoute un 0 devant*/
        let m = this.min;
        let s = this.sec;
        if (m<10) {
            m = '0' + m;
        }
        if (s<10) {
            s = '0' + s;
        }

        this.id.innerHTML = 'La réservation de '   + localStorage.getItem('firstname') + '  ' + localStorage.getItem('name') + ' à la station ' + sessionStorage.getItem('nameStation') + ' prendra fin dans ' + m + 'min' + s + 's.';

        /* On envoie le décompte au session storage */
        sessionStorage.setItem(this.id+'endTime', this.endTime);

        /*si le temps est terminé alors on arrête le timer */
        if (this.min === 0 && this.sec === 0) {
            this.endTimer();
        }
    }

}