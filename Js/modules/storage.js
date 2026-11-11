function chargerProjets() {
    let texte = localStorage.getItem("planit-projects");
    if (texte === null) {
        return [];
    }
    let projets;
    try {
        projets = JSON.parse(texte);
    } catch (erreur) {
        throw new Error("La sauvegarde des projets est illisible. Elle n'a pas été remplacée.");
    }
    if (!Array.isArray(projets)) {
        throw new Error("La sauvegarde des projets est invalide.");
    }
    for (let i = 0; i < projets.length; i++) {
        verifierPlan(projets[i]);
        if (typeof projets[i].id !== "string" || projets[i].id === "") {
            throw new Error("Un projet sauvegardé n'a pas d'identifiant.");
        }
    }
    return projets;
}

function trouverProjet(projets, id) {
    for (let i = 0; i < projets.length; i++) {
        if (projets[i].id === id) {
            return projets[i];
        }
    }
    return null;
}

function enregistrerProjets(projets) {
    try {
        localStorage.setItem("planit-projects", JSON.stringify(projets));
    } catch (erreur) {
        throw new Error("Impossible d'enregistrer. Vérifiez que le stockage du navigateur est autorisé.");
    }
}

function enregistrerProjet(projet) {
    verifierPlan(projet);
    let projets = chargerProjets();
    let position = -1;
    for (let i = 0; i < projets.length; i++) {
        if (projets[i].id === projet.id) {
            position = i;
        }
    }
    if (position === -1) {
        projets.push(projet);
    } else {
        projets[position] = projet;
    }
    enregistrerProjets(projets);
}
