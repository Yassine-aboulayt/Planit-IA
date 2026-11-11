// Pour ce livrable, on charge seulement le fichier JSON local.
async function chargerPlanDemo() {
    if (location.protocol === "file:") {
        throw new Error("Ouvrez le projet avec Live Server pour charger le fichier JSON.");
    }
    let controle = new AbortController();
    let delai = setTimeout(function() {
        controle.abort();
    }, 10000);
    try {
        let reponse = await fetch("data/sample-plan.json", {
            method: "GET",
            signal: controle.signal
        });
        if (!reponse.ok) {
            throw new Error("Impossible de charger le plan exemple (HTTP " + reponse.status + ").");
        }
        let plan = await reponse.json();
        verifierPlan(plan);
        return plan;
    } catch (erreur) {
        if (erreur.name === "AbortError") {
            throw new Error("Chargement trop long. Vérifiez Live Server puis réessayez.");
        }
        if (erreur.name === "SyntaxError") {
            throw new Error("Le fichier sample-plan.json n'est pas un JSON valide.");
        }
        if (erreur.name === "TypeError") {
            throw new Error("Connexion impossible. Vérifiez que Live Server fonctionne.");
        }
        throw erreur;
    } finally {
        clearTimeout(delai);
    }
}
