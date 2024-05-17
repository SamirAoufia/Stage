import React from 'react';

const DocumentationPage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Instructions Utilisateur</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Cuisson en Direct</h2>
        <p className="text-gray-600">
          Pour avoir la cuisson en direct, il faut aller sur cette {' '}
          <a href="/cuisson" className="text-blue-500 hover:underline">page</a> et choisir le temps a afficher puis quelle données.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter une Cuisson</h2>
        <p className="text-gray-600">
          Pour ajouter une cuisson, il faut aller sur cette {' '}
          <a href="/cuisson/ajout" className="text-blue-500 hover:underline">page</a> et remplir le formulaire. Il faut bien remplir les heures et les minutes puis enregistrer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Choix de la cuisson</h2>
        <p className="text-gray-600">
          Pour choisir la date et l'heure, il faut aller sur cette{' '}
          <a href="/cuisson/choix" className="text-blue-500 hover:underline">page</a>. Il y aura une sélection a faire contenant tous les noms des plats enregistrés. Si il n'y a rien  d'affiché, cela signifie qu'il n'y a pas de plats enregistrés et qu'il faut en enregistrer. Après avoir choisi le plat, une autre sélection apparaîtra avec les dates et heures. Après avoir fait votre sélection, une description, des boutons, un graphique et une datatable apparaîtront. Choisissez quelle valeur afficher dans le graphique en appuyant sur les boutons. La datatable affichera toutes les valeurs sans avoir besoin d'appuyer sur un bouton.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Plateau en Direct</h2>
        <p className="text-gray-600">
          Pour avoir le plateau en direct, il faut aller sur cette {' '}
          <a href="/plateau" className="text-blue-500 hover:underline">page</a> et sélectionner quel plateau afficher. Des boutons permettront de choisir la durée à afficher.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter une Personne</h2>
        <p className="text-gray-600">
          Pour ajouter une personne, il faut aller sur cette {' '}
          <a href="/plateau/ajout" className="text-blue-500 hover:underline">page</a> et remplir le formulaire. Il faut d'abord choisir quel plateau, puis bien remplir les heures et les minutes puis enregistrer
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Choix de la personne</h2>
        <p className="text-gray-600">
          Pour voir les valeurs des heures entrées pour une personne, il faut aller sur cette {' '}
          <a href="/plateau/choix" className="text-blue-500 hover:underline">page</a>. Il y aura une sélection pour le plateau, puis une sélection avec les noms des personnes enregistrées. Si rien n'est affiché, cela signifie qu'il n'y a pas de personnes enregistrées. Ensuite, une autre sélection apparaîtra avec les dates et heures. Choisissez celle que vous voulez afficher. Après avoir fait votre sélection, une description, des boutons, un graphique et une datatable apparaîtront.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4"> Bluetooth en Direct</h2>
        <p className="text-gray-600">
          Pour avoir les données de Bluetooth en direct, il faut aller sur cette {' '}
          <a href="/bluetooth" className="text-blue-500 hover:underline">page</a>. Des boutons permettront de choisir la durée à afficher et un graphique sera affiché.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Choix bluetooth</h2>
        <p className="text-gray-600">
          Pour avoir les valeurs de Bluetooth avec une date, il faut aller sur cette {' '}
          <a href="/bluetooth/choix" className="text-blue-500 hover:underline">page</a>. Il y aura un calendrier et deux boutons. Il faut choisir la date précise et appuyer sur "update". Après cela, le graphique s'affichera. Une fois la date choisie, vous pouvez appuyer sur le bouton "afficher le tableau" pour afficher une datatable.
        </p>
      </section>
    </div>
  );
};



export default DocumentationPage