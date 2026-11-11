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
