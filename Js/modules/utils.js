let champsProjet = ["name", "description", "brief", "duration", "developers", "technologies", "difficulty"];

function erreurChamp(nom, valeur) {
    valeur = valeur.trim();
    if (valeur === "") {
        return "Ce champ est obligatoire.";
    }
    if (nom === "duration" || nom === "developers") {
        if (!/^[1-9][0-9]*$/.test(valeur) || !Number.isSafeInteger(Number(valeur))) {
            return "Saisissez un entier supérieur ou égal à 1, sans décimales.";
        }
    }
    if (nom === "difficulty") {
        if (valeur !== "Beginner" && valeur !== "Intermediate" && valeur !== "Advanced") {
            return "Choisissez un niveau dans la liste.";
        }
    }
    let limite = 0;
    if (nom === "name") {
        limite = 100;
    }
    if (nom === "description" || nom === "technologies") {
        limite = 300;
    }
    if (nom === "brief") {
        limite = 10000;
    }
    if (limite > 0 && valeur.length > limite) {
        return "Maximum " + limite + " caractères.";
    }
    return "";
}

function formulaireValide(infos) {
    for (let i = 0; i < champsProjet.length; i++) {
        let nom = champsProjet[i];
        if (erreurChamp(nom, infos[nom]) !== "") {
            return false;
        }
    }
    return true;
}
