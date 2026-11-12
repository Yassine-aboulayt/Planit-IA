function afficherMessage(texte) {
    document.getElementById("demo-message").textContent = texte;
}

function afficherDashboard(projets) {
    let liste = document.getElementById("project-list");
    liste.innerHTML = "";
    let terminees = 0;
    let total = 0;
    for (let i = 0; i < projets.length; i++) {
        total = total + projets[i].tasks.length;
        terminees = terminees + compterTerminees(projets[i]);
    }
    document.getElementById("nombre-projets").textContent = projets.length;
    document.getElementById("nombre-terminees").textContent = terminees;
    document.getElementById("nombre-restantes").textContent = total - terminees;
    document.getElementById("etat-vide").hidden = projets.length !== 0;

    for (let i = 0; i < projets.length; i++) {
        let projet = projets[i];
        let carte = document.createElement("article");
        carte.className = "w-full md:w-96 flex-grow bg-white border border-gray-200 rounded-xl p-6";
        carte.innerHTML =
            '<p class="text-xs text-purple-600 font-bold mb-3">PROJET</p>' +
            '<h3 class="nom-projet text-xl font-bold break-words"></h3>' +
            '<p class="description-projet text-gray-500 mt-3 break-words"></p>' +
            '<p class="compteur text-sm text-gray-600 mt-5"></p>' +
            '<progress class="w-full mt-4" max="100"></progress>' +
            '<p class="pourcentage text-sm text-purple-600 mt-2"></p>' +
            '<div class="flex flex-wrap items-center gap-4 mt-6">' +
                '<a class="ouvrir bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg">Ouvrir le Task Board</a>' +
                '<button type="button" class="supprimer text-red-600 text-sm">Supprimer</button>' +
            '</div>';
        let fait = compterTerminees(projet);
        let pourcentage = calculerProgression(projet);
        carte.querySelector(".nom-projet").textContent = projet.projectName;
        carte.querySelector(".description-projet").textContent = projet.description;
        carte.querySelector(".compteur").textContent = projet.tasks.length + " tâches · " + fait + " terminées · " + (projet.tasks.length - fait) + " restantes";
        carte.querySelector("progress").value = pourcentage;
        carte.querySelector("progress").setAttribute("aria-label", "Progression de " + projet.projectName);
        carte.querySelector(".pourcentage").textContent = pourcentage + " % terminé";
        carte.querySelector(".ouvrir").href = "project.html?id=" + encodeURIComponent(projet.id);
        carte.querySelector(".supprimer").disabled = true;
        liste.appendChild(carte);
    }
}

function afficherBoard(projet) {
    document.getElementById("project-name").textContent = projet.projectName;
    document.getElementById("project-description").textContent = projet.description;
    document.getElementById("project-duration").textContent = projet.duration + " jours";
    document.getElementById("project-team").textContent = projet.developers + " développeur(s)";
    document.getElementById("project-hours").textContent = calculerHeures(projet) + " h estimées / " + (projet.duration * projet.developers * 6) + " h disponibles";
    document.getElementById("project-progress").textContent = calculerProgression(projet) + " %";
    document.getElementById("board-progress").value = calculerProgression(projet);

    let colonnes = ["todo-list", "progress-list", "done-list"];
    for (let i = 0; i < colonnes.length; i++) {
        let zone = document.getElementById(colonnes[i]);
        zone.innerHTML = "";
        let nombre = 0;
        for (let j = 0; j < projet.tasks.length; j++) {
            let tache = projet.tasks[j];
            if (tache.status === statuts[i]) {
                let carte = document.createElement("button");
                carte.type = "button";
                carte.className = "w-full text-left bg-white border border-gray-200 hover:border-purple-400 rounded-lg p-4";
                carte.innerHTML =
                    '<p class="id-tache text-xs font-bold text-purple-600"></p>' +
                    '<h3 class="titre-tache font-bold mt-2 break-words"></h3>' +
                    '<div class="flex flex-wrap gap-2 mt-4">' +
                        '<span class="priorite text-xs bg-purple-100 text-purple-700 p-1 rounded"></span>' +
                        '<span class="taille text-xs bg-gray-100 text-gray-600 p-1 rounded"></span>' +
                    '</div>' +
                    '<p class="estimation text-sm text-gray-500 mt-3"></p>' +
                    '<p class="deadline text-sm text-gray-600 mt-2"></p>' +
                    '<p class="dependances text-xs text-gray-500 mt-3 break-words"></p>';
                carte.querySelector(".id-tache").textContent = tache.id;
                carte.querySelector(".titre-tache").textContent = tache.title;
                carte.querySelector(".priorite").textContent = tache.priority;
                if (tache.priority === "Critical") {
                    carte.querySelector(".priorite").className = "priorite text-xs bg-red-100 text-red-700 p-1 rounded";
                } else if (tache.priority === "High") {
                    carte.querySelector(".priorite").className = "priorite text-xs bg-yellow-100 text-yellow-800 p-1 rounded";
                }
                carte.querySelector(".taille").textContent = tache.size;
                carte.querySelector(".estimation").textContent = tache.estimatedTime + " h estimées";
                carte.querySelector(".deadline").textContent = "Échéance : " + tache.deadline;
                if (tache.dependencies.length === 0) {
                    carte.querySelector(".dependances").textContent = "Aucune dépendance";
                } else {
                    carte.querySelector(".dependances").textContent = "Dépend de : " + tache.dependencies.join(", ");
                }
                carte.disabled = true;
                zone.appendChild(carte);
                nombre = nombre + 1;
            }
        }
        document.getElementById(colonnes[i] + "-count").textContent = nombre;
        if (nombre === 0) {
            let vide = document.createElement("p");
            vide.className = "text-sm text-gray-500 p-4 text-center";
            vide.textContent = "Aucune tâche pour le moment.";
            zone.appendChild(vide);
        }
    }
}
