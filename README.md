###LANCER L'APPLICATION

- Lancer la commande `npm install` dans les dossiers suivant :

    `dashboard/src/front`
    
    `dashboard/src/back`
    
- Lancer la command suivante à la racine du projet :

    `docker-compose up --build`
    
    ###EN CAS D'ERREUR :
    
    - Lancer la commande suivante :
        - Sur `Fedora` :
        
        `systemctl stop mongod`
        
        - Sur `Ubuntu` :
        
        `systemctl stop mongodb`
    
    - Puis relancer la commande : `docker-compose up --build`
    
- Entrer dans la bar de recherche d'un navigateur :

    - `localhost:8080`
    
    
###POUR PLUS DE PRÉCISION OU POUR SAVOIR COMMENT FONCTIONNE L'APPLICATION, LIRE LA DOCUMENTATION