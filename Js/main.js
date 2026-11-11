let projets = [];
let projetActuel = null;
let tacheActuelle = null;
let chargement = false;
let formulaire = document.getElementById("project-form");

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
