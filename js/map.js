class Map {
    constructor (html, [x, y], minZoom, maxZoom, url) {
        this.html = html;
        this.xy = [x, y];
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.url = url;

        this.map = L.map(this.html).setView([x, y], 12);
        /* utilisation de Leaflet pour afficher la carte */
        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creative commons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ©',
                            maxZoom: maxZoom,
                            id: 'mapbox.streets',
                            accessToken: 'pk.eyJ1Ijoic2d1aWwiLCJhIjoiY2szZ3l2am1xMDR6MTNlcGhhaXY0c2tmbiJ9.7JfSl1SUoy3A8mkAhQ3eGg'
                        }).addTo(this.map);  
    }

    /* Fonction pour afficher les marqueurs de JC Decaux, le lien api est dans main.js */
    displayMarkers() {
        const requestStations = new Ajax ()

        requestStations.ajaxGet(this.url, (response) => {
            let dataStations = JSON.parse(response);
            let markers = L.markerClusterGroup();


            for  (let i=0; i<dataStations.length; i++) {   /*tant qu'il y a des éléments dans la requête*/
                let station = dataStations[i]  /*recuperation des donnees stations sous forme de tableau*/


                let x = station.position.lat;  
                let y = station.position.lng;

                let name = station.name; 
                let address = station.address; 
                let status = station.status; 
                let bikeStands = station.bike_stands; /*nombre d'emplacements disponibles*/
                let availableBikes = station.available_bikes; /*nombre de vélos disponibles*/

                /*Creation d'une icone pour les markers avec une image png*/ 
                let iconStation = L.icon( {  
                        iconUrl: 'images/iconeVelo.png',  
                        iconSize: [50, 50],
                        iconAnchor: [25, 50], /*Changement de position de l'ancre pour que la pointe arrive sur la rue*/
                        popupAnchor: [0, -50], /*Changement de position du popup en hauteur*/
                });

                /*Affichage des markers*/ 
                let marker = L.marker([x, y], {icon: iconStation}); 
                    markers.addLayer(marker); 

                /*Au click sur un marker d'une station les informations s'afficheront sur le cadre d'informations des stations*/
                marker.addEventListener ('click', function(e) {
                    document.getElementById('infoStations')
                    document.getElementById('nameStation').innerHTML = name;
                    document.getElementById('address_stations').innerHTML = address;
                    document.getElementById('bikeStands').innerHTML = bikeStands;
                    document.getElementById('availableBikes').innerHTML = availableBikes;    
                    
                /*Affichage sous conditions des informations sur le statut de la réservation et le bouton de réservation*/
                if (status === 'CLOSED') {
                    document.getElementById('status').innerHTML = "La station est fermée.<br> Rapprochez-vous d'une autre station.";
                    document.getElementById('reservationButton').style.visibility = 'hidden';
                    document.getElementById('formulaire').style.visibility = 'hidden';

                } if (availableBikes === 0) {
                    document.getElementById('status').innerHTML = "Il n'y a pas de vélos disponibles.<br> Rapprochez-vous d'une autre station.";
                    document.getElementById('reservationButton').style.visibility = 'hidden';
                    document.getElementById('formulaire').style.visibility = 'hidden';
                } else if (status === 'OPEN' & availableBikes > 0) {
                    document.getElementById('status').innerHTML = "Des vélos sont disponibles.<br> Réservez dès maintenant.";
                    document.getElementById('reservationButton').style.visibility = 'visible';
                    document.getElementById('formulaire').style.visibility = 'hidden';
                };

                }); /*fin de marker*/

            };
            /*Affichage des markers sur la map*/
            this.map.addLayer(markers); 
        }); 
    }
}
