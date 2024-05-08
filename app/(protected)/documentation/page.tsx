import React from 'react';

const DocumentationPage = () => {
  return (
    <div>
      <h1>Documentation du Monitoring en Temps Réel et de l'Enregistrement des Cuissons</h1>
      
      <h2>1. Monitoring en Temps Réel</h2>
      <p>
        La fonctionnalité de monitoring en temps réel vous permet de visualiser les données en direct à l'aide de graphiques dynamiques.
      </p>
      <h3>Graphique en Direct</h3>
      <p>
        Le graphique en direct affiche les données de monitoring en temps réel. Vous pouvez choisir la durée que vous souhaitez afficher.
      </p>
      <h4>Sélection de la Durée</h4>
      <p>
        Utilisez les boutons pour choisir entre la dernière heure, les dernières 24 heures ou la dernière semaine.
      </p>
      
      <h2>2. Enregistrement des Cuissons</h2>
      <p>
        Dans cette section, vous pouvez enregistrer les temps de cuisson pour chaque plat.
      </p>
      <h3>Ajouter un Enregistrement de Cuisson</h3>
      <p>
        Vous pouvez entrer l'heure de début et de fin de la cuisson ainsi que sélectionner le plat à partir du menu déroulant.
      </p>
      
      <h2>3. Analyse des Données Historiques</h2>
      <p>
        L'analyse des données historiques vous permet d'analyser les données de cuisson précédentes en fonction du plat et de l'heure.
      </p>
      <h3>Sélection du Plat et de l'Heure</h3>
      <p>
        Utilisez les menus déroulants pour choisir le plat et l'heure que vous souhaitez analyser.
      </p>
    </div>
  );
}


export default DocumentationPage