// Exécute un appel AJAX GET
class Ajax {
    ajaxGet(url, callback) {  /*Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès*/
        let req = new XMLHttpRequest(); /*nouvel objet Ajax qui permet de créer et envoyer la requête*/
        req.open("GET", url);  /*ouvrir une connexion vers un service web*/
        req.addEventListener("load", () => { 
            if (req.status >= 200 && req.status < 400) { 
                callback(req.responseText);  /*Appelle la fonction callback en lui passant la réponse de la requête*/
            } else {
                console.error(req.status + " " + req.statusText + " " + url); 
            }
        });
        req.addEventListener("error", function () { 
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null); /*J'envoie la requête au service web*/
    };
}
  
