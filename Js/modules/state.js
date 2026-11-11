let priorites = ["Low", "Medium", "High", "Critical"];
let importances = ["Low", "Medium", "High"];
let tailles = ["XS", "S", "M", "L", "XL"];
let statuts = ["To Do", "In Progress", "Done"];

function trouverTache(projet, id) {
    for (let i = 0; i < projet.tasks.length; i++) {
        if (projet.tasks[i].id === id) {
            return projet.tasks[i];
        }
    }
    return null;
}

function compterTerminees(projet) {
    let nombre = 0;
    for (let i = 0; i < projet.tasks.length; i++) {
        if (projet.tasks[i].status === "Done") {
            nombre = nombre + 1;
        }
    }
    return nombre;
}

function calculerProgression(projet) {
    if (projet.tasks.length === 0) {
        return 0;
    }
    return Math.round(compterTerminees(projet) * 100 / projet.tasks.length);
}

function calculerHeures(projet) {
    let total = 0;
    for (let i = 0; i < projet.tasks.length; i++) {
        total = total + projet.tasks[i].estimatedTime;
    }
    return total;
}

function verifierListe(liste, obligatoire) {
    if (!Array.isArray(liste)) {
        throw new Error("Une liste du plan est invalide.");
    }
    if (obligatoire && liste.length === 0) {
        throw new Error("Les user stories et les critères ne doivent pas être vides.");
    }
    for (let i = 0; i < liste.length; i++) {
        if (typeof liste[i] !== "string" || liste[i].trim() === "") {
            throw new Error("Une liste contient une valeur vide ou invalide.");
        }
    }
}

function verifierDependances(projet, tache) {
    for (let i = 0; i < tache.dependencies.length; i++) {
        let autre = trouverTache(projet, tache.dependencies[i]);
        if (autre === null || autre.id === tache.id) {
            throw new Error("Dépendance invalide pour " + tache.id + ".");
        }
        if (tache.status === "Done" && autre.status !== "Done") {
            throw new Error("Terminez " + autre.id + " avant " + tache.id + ".");
        }
    }
}

function verifierPlan(projet) {
    if (!projet || typeof projet.projectName !== "string" || projet.projectName.trim() === "") {
        throw new Error("Le nom du projet est manquant dans le JSON.");
    }
    if (!Number.isSafeInteger(projet.duration) || projet.duration < 1) {
        throw new Error("La durée du projet est invalide.");
    }
    if (!Number.isSafeInteger(projet.developers) || projet.developers < 1) {
        throw new Error("Le nombre de développeurs est invalide.");
    }
    if (!Array.isArray(projet.tasks)) {
        throw new Error("Le plan doit contenir une liste de tâches.");
    }

    let ids = [];
    for (let i = 0; i < projet.tasks.length; i++) {
        let tache = projet.tasks[i];
        if (!tache || typeof tache.id !== "string" || !/^TASK-[0-9]+$/.test(tache.id)) {
            throw new Error("Un identifiant de tâche est invalide.");
        }
        if (ids.indexOf(tache.id) !== -1) {
            throw new Error("Identifiant en double : " + tache.id + ".");
        }
        ids.push(tache.id);
        if (typeof tache.title !== "string" || tache.title.trim() === "") {
            throw new Error("Titre manquant pour " + tache.id + ".");
        }
        if (typeof tache.description !== "string" || tache.description.trim() === "") {
            throw new Error("Description manquante pour " + tache.id + ".");
        }
        verifierListe(tache.userStories, true);
        verifierListe(tache.acceptanceCriteria, true);
        verifierListe(tache.dependencies, false);
        if (priorites.indexOf(tache.priority) === -1 || importances.indexOf(tache.importance) === -1) {
            throw new Error("Priorité ou importance invalide pour " + tache.id + ".");
        }
        if (tailles.indexOf(tache.size) === -1 || statuts.indexOf(tache.status) === -1) {
            throw new Error("Taille ou statut invalide pour " + tache.id + ".");
        }
        if (typeof tache.estimatedTime !== "number" || !Number.isFinite(tache.estimatedTime) || tache.estimatedTime <= 0) {
            throw new Error("Estimation invalide pour " + tache.id + ".");
        }
        if (typeof tache.deadline !== "string" || !/^Day [1-9][0-9]*$/.test(tache.deadline)) {
            throw new Error("Deadline invalide pour " + tache.id + ".");
        }
        let jour = Number(tache.deadline.replace("Day ", ""));
        if (!Number.isSafeInteger(jour) || jour > projet.duration) {
            throw new Error("La deadline dépasse la durée du projet : " + tache.id + ".");
        }
    }
    for (let i = 0; i < projet.tasks.length; i++) {
        verifierDependances(projet, projet.tasks[i]);
    }
    return projet;
}
