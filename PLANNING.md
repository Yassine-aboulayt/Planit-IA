# Planification PLANIT AI

Le planning couvre le brief complet. Le premier livrable du 13 novembre fonctionne avec le fichier JSON, sans appel IA.

## 1. Préparer le projet — 9 novembre
User story : en tant que développeur, je veux organiser mes fichiers pour construire les trois pages.
- [x] KAN-5 : créer la structure, les pages et le dépôt.
- [x] KAN-7 : ajouter le logo et le plan exemple JSON.
- [x] KAN-6 : séparer les fichiers JavaScript par rôle.

## 2. Construire les pages — 9 au 10 novembre
User story : en tant qu’utilisateur, je veux naviguer entre mes projets, le formulaire et le tableau de tâches.
- [x] KAN-18 : header, navigation, Dashboard et état vide.
- [x] KAN-10 : formulaire avec les sept champs demandés.
- [x] KAN-20 : résumé du projet et trois colonnes Kanban.
- [x] KAN-22 : fenêtres des paramètres et du détail d’une tâche.
- [x] KAN-28 : mise en page utilisable sur téléphone et ordinateur.

## 3. Charger et conserver un plan démo — 11 au 12 novembre
User story : en tant qu’utilisateur, je veux essayer l’application sans clé API et retrouver mes projets après actualisation.
- [x] KAN-15 : vérifier les champs, les statuts, les dépendances et les deadlines du JSON.
- [x] KAN-8 : enregistrer les projets dans localStorage.
- [x] KAN-10 : afficher les erreurs du formulaire en temps réel et bloquer l’envoi invalide.
- [x] KAN-13 : paramètres, clé dans sessionStorage et Fetch GET du fichier démo.
- [x] KAN-16 : enregistrer un projet valide puis ouvrir son Task Board.
- [x] KAN-26 : calculer la progression avec les tâches Done uniquement.

## 4. Gérer les tâches — 12 novembre
User story : en tant qu’utilisateur, je veux adapter mon plan sans perdre mes changements ni casser ses dépendances.
- [x] KAN-20 : classer les cartes selon leur statut et afficher leurs informations.
- [x] KAN-22 : consulter et modifier une tâche, puis sauvegarder.
- [x] KAN-23 : refuser Done si un prérequis n’est pas terminé.
- [x] KAN-25 : supprimer une tâche ou un projet après confirmation et nettoyer les dépendances.

## 5. Remettre le premier livrable — 13 novembre
User story : en tant qu’apprenant, je veux partager une version démo testée et expliquée.
- [x] KAN-29 : vérifier les parcours démo, validation, édition, suppression et actualisation.
- [x] KAN-30 : écrire le README et préparer la configuration Vercel.
- [ ] KAN-30 : vérifier la publication réelle et le lien Vercel.

## 6. Connecter l’IA — 16 au 18 novembre
User story : en tant qu’utilisateur, je veux obtenir un plan adapté à mon brief grâce à un service IA.
- [ ] KAN-11 : construire le prompt avec les informations du formulaire.
- [ ] KAN-14 : envoyer une requête POST au service IA avec la clé de session.
- [ ] KAN-14 : gérer chargement, succès, erreur, quota, délai et nouvel essai.
- [ ] KAN-15 : parser puis valider la réponse IA avant tout affichage ou enregistrement.
- [ ] KAN-16 : conserver le projet généré et ouvrir le bon tableau.
Critères : une réponse invalide est refusée ; aucun secret dans Git ; l’application revient à un état utilisable après une erreur.

## 7. Vérifier le brief complet et remettre — 19 au 20 novembre
User story : en tant qu’apprenant, je veux livrer et expliquer l’application complète.
- [ ] KAN-28 : terminer les vérifications clavier, focus des fenêtres et HTML.
- [ ] KAN-29 : tester la génération réelle, les erreurs du service et le parcours complet.
- [ ] KAN-30 : mettre à jour la documentation, publier et vérifier la version complète.
- [ ] KAN-31 : préparer la présentation et les liens de remise.
Échéance finale prévue : 20 novembre 2026 à 11 h 59, heure de Casablanca.
