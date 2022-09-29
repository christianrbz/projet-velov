class Signature {
    constructor () { 
        this.html = document.getElementById('signatureClient');  /* id du canvas, zone ou le client signe */
        this.radius = 2;  /* taille du rayon du tracé de la signature */

        this.context = this.html.getContext('2d');  /* 2d signifie deux dimensions */
        this.draw = false;

        this.touchX;    /* Cela correspond aux coordonnées de tracé */
        this.touchY;

        this.html.width = this.html.clientWidth; 
        this.html.height = this.html.clientHeight; 

        this.html.addEventListener('mousedown', this.drawSign.bind(this));
        this.html.addEventListener('touchstart', this.drawSign.bind(this));

        this.html.addEventListener('mousemove', this.sign.bind(this));
        this.html.addEventListener('touchmove', this.signTactile.bind(this));

        this.html.addEventListener('mouseup', this.stopSign.bind(this));
        this.html.addEventListener('touchend', this.stopSign.bind(this));

        this.checkSign = false;
    }

    
    /* Activation du tracé de la signature*/
    drawSign() {
        this.draw = true;
    }
    
    /*signature pour ordinateur donc tracé avec souris */      
    sign(e) {
        this.touchX = e.offsetX;
        this.touchY = e.offsetY;
        this.drawPoint();
    }

    /* signature pour tablette mobile donc tracé en tactile */
    signTactile(e) {
        e.preventDefault();
        this.touchX = e.changedTouches[0].clientX - this.html.getBoundingClientRect().left;
        this.touchY = e.changedTouches[0].clientY - this.html.getBoundingClientRect().top;
        this.drawPoint();
    }

    /* Le point du tracé */
    drawPoint () {
        if(this.draw) {
            this.context.fillStyle = 'black';  /*couleur du tracé de la signature, fill=forme remplie */
            this.context.strokeStyle = 'black'; /*couleur contour du tracé, stroke= forme vide pourvue d'un contour*/
            this.context.lineWidth = this.radius*2; /*epaisseur du trait*/
            this.context.lineTo(this.touchX, this.touchY);/*connecte le dernier point en cours aux coordonnées x et y */
            this.context.stroke(); /*rendre le tracé visible*/
            
            //1er chemin
            this.context.beginPath(); 
            /* arc(x,y, angleDepart, angleFin) les angles sont en radians d'ou le calcul (math.pi*2) qui correspond à l'angle pour le cercle du tracé */
            this.context.arc(this.touchX, this.touchY, this.radius, 0, Math.PI*2); 
            this.context.fill(); /*remplit le chemin courant ou donné avec la couleur de fond en cours*/

            //2nd chemin
            this.context.beginPath();
            this.context.moveTo(this.touchX, this.touchY); 
        }
    }

      
    /*Effacement de la signature*/ 
    clearSign() {
        this.context.clearRect(0, 0, this.html.width, this.html.height);
        this.checkSign = false;
        /*Les boutons effacer et valider disparaisse car la signature est effacée */
        document.getElementById('clear').style.visibility = 'hidden';
        document.getElementById('submitButton').style.visibility = 'hidden';
    }

      /* Arret du tracé de la signature */
    stopSign() {
        this.draw = false;
        this.context.beginPath();
        this.checkSign = true;
        /*Des qu'on commence à signer, les boutons effacer et valider apparaisse dans le formulaire*/
        document.getElementById('clear').style.visibility = 'visible';
        document.getElementById('submitButton').style.visibility = 'visible';
    }
}

