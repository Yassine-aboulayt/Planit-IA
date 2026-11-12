let projets = [];
let projetActuel = null;
let tacheActuelle = null;
let chargement = false;
let formulaire = document.getElementById("project-form");

function ouvrirFenetre(id) {
    document.getElementById(id).classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function fermerFenetre(id) {
    document.getElementById(id).classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

function lireFormulaire() {
    let infos = {};
    for (let i = 0; i < champsProjet.length; i++) {
        let nom = champsProjet[i];
        infos[nom] = document.getElementById(nom).value.trim();
    }
    return infos;
}

function verifierFormulaire(afficherErreurs) {
    let infos = lireFormulaire();
    for (let i = 0; i < champsProjet.length; i++) {
        let nom = champsProjet[i];
        if (afficherErreurs) {
            document.getElementById(nom + "-help").textContent = erreurChamp(nom, infos[nom]);
        }
    }
    let valide = formulaireValide(infos);
    document.getElementById("generate-plan").disabled = true;
    document.getElementById("reessayer").disabled = !valide || chargement;
    return valide;
}

document.getElementById("ouvrir-settings").onclick = function() {
    document.getElementById("settings-message").textContent = "";
    try {
        document.getElementById("api-key").value = sessionStorage.getItem("planit-api-key") || "";
    } catch (erreur) {
        document.getElementById("settings-message").textContent = "Le stockage de session est indisponible.";
    }
    ouvrirFenetre("settings-modal");
    document.getElementById("api-key").focus();
};
document.getElementById("fermer-settings").onclick = function() {
    fermerFenetre("settings-modal");
    document.getElementById("ouvrir-settings").focus();
};
document.getElementById("save-key").onclick = function() {
    try {
        let cle = document.getElementById("api-key").value.trim();
        if (cle === "") {
            sessionStorage.removeItem("planit-api-key");
        } else {
            sessionStorage.setItem("planit-api-key", cle);
        }
        document.getElementById("settings-message").textContent = "Clé conservée dans cet onglet uniquement. Elle n'est pas utilisée en mode démo.";
    } catch (erreur) {
        document.getElementById("settings-message").textContent = "Impossible d'enregistrer la clé dans cette session.";
    }
};
document.getElementById("settings-modal").onclick = function(evenement) {
    if (evenement.target === this) {
        fermerFenetre("settings-modal");
    }
};
document.addEventListener("keydown", function(evenement) {
    if (evenement.key === "Escape") {
        fermerFenetre("settings-modal");
        if (document.getElementById("task-modal") !== null) {
            fermerFenetre("task-modal");
        }
    }
});


if (formulaire !== null) {
    for (let i = 0; i < champsProjet.length; i++) {
        let nom = champsProjet[i];
        document.getElementById(nom).addEventListener("input", function() {
            document.getElementById(nom + "-help").textContent = erreurChamp(nom, this.value);
            verifierFormulaire(false);
        });
        document.getElementById(nom).addEventListener("change", function() {
            document.getElementById(nom + "-help").textContent = erreurChamp(nom, this.value);
            verifierFormulaire(false);
        });
    }
    formulaire.addEventListener("submit", function(evenement) {
        evenement.preventDefault();
    });
    document.getElementById("reessayer").onclick = function() {
        formulaire.requestSubmit();
    };
    verifierFormulaire(false);
}

try {
    projets = chargerProjets();
    if (document.getElementById("project-list") !== null) {
        afficherDashboard(projets);
    }
    if (document.getElementById("project-board") !== null) {
        let parametres = new URLSearchParams(location.search);
        projetActuel = trouverProjet(projets, parametres.get("id"));
        if (projetActuel === null) {
            document.getElementById("projet-introuvable").hidden = false;
        } else {
            document.getElementById("project-board").hidden = false;
            afficherBoard(projetActuel);
        }



    }
} catch (erreur) {
    afficherMessage(erreur.message);
}
