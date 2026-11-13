# PLANIT AI

PLANIT AI permet de créer un projet et de suivre ses tâches dans un tableau Kanban.

## Premier livrable

Cette version utilise `data/sample-plan.json`. Elle ne fait aucun appel à une API IA.

- Dashboard : voir les projets, leur progression et les supprimer après confirmation.
- Nouveau projet : remplir le formulaire et charger le plan démo avec ses informations.
- Task Board : consulter les tâches dans To Do, In Progress et Done.
- Détail : modifier une tâche ou la supprimer après confirmation.
- Paramètres : charger la démo et garder une clé dans sessionStorage pour la prochaine étape.

## Technologies

HTML, Tailwind CSS par CDN et JavaScript. Les données sont en JSON. Les projets et les modifications sont gardés dans localStorage.

## Utiliser le projet

Ouvrir le dossier dans VS Code puis lancer `index.html` avec Live Server. Une connexion Internet est nécessaire pour charger Tailwind.

Cliquer sur Mode démo, ouvrir une tâche et modifier son statut. On peut aussi remplir le formulaire pour créer un autre projet à partir du même exemple.

## Règles

La progression correspond au nombre de tâches Done divisé par le nombre total. Une tâche ne peut pas passer à Done si ses dépendances ne sont pas terminées. Une tâche supprimée est aussi retirée des dépendances des autres tâches.

La capacité affichée utilise 6 heures par jour et par développeur. Le plan démo contient toujours les tâches du JSON : le brief saisi ne génère pas de nouvelles tâches IA.

## Fichiers

- `index.html`, `new-project.html`, `project.html` : les trois pages.
- `css/style.css` : quelques styles complémentaires.
- `Js/main.js` : les clics, les formulaires et le démarrage des pages.
- `Js/modules/` : affichage, données, validation, stockage et chargement du JSON.
- `data/sample-plan.json` : le plan exemple.
- `tests/rules.test.cjs` : vérification des règles avec `node tests/rules.test.cjs`.

## Planning

Le [planning complet](PLANNING.md) distingue la version démo et la prochaine intégration IA.

[Dépôt GitHub](https://github.com/Yassine-aboulayt/Planit-IA)
