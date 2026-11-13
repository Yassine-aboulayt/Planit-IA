const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

for (const fichier of ["state", "storage", "utils", "api", "prompt"]) {
    vm.runInThisContext(fs.readFileSync("Js/modules/" + fichier + ".js", "utf8"));
}
const exemple = JSON.parse(fs.readFileSync("data/sample-plan.json", "utf8"));
const infos = {
    name: "Mon projet",
    description: "Un projet de test",
    brief: "Créer un tableau de tâches.",
    duration: "3",
    developers: "2",
    technologies: "HTML, Tailwind, JavaScript",
    difficulty: "Beginner"
};

assert.equal(formulaireValide(infos), true);
for (const nom of champsProjet) {
    const copie = JSON.parse(JSON.stringify(infos));
    copie[nom] = "   ";
    assert.equal(formulaireValide(copie), false);
}
for (const nom of ["duration", "developers"]) {
    for (const valeur of ["", "0", "-1", "1.5", "1e2", "abc", "9007199254740992"]) {
        assert.notEqual(erreurChamp(nom, valeur), "");
    }
}
assert.notEqual(erreurChamp("difficulty", "Expert"), "");
assert.notEqual(erreurChamp("name", "a".repeat(101)), "");
assert.equal(verifierPlan(exemple).tasks.length, 7);
assert.equal(calculerProgression(exemple), 0);
assert.equal(calculerHeures(exemple), 34);

const modification = {
    title: "Nouveau titre",
    description: "Description modifiée",
    priority: "High",
    size: "S",
    deadline: "Day 1",
    status: "Done"
};
let refus = false;
try {
    modifierTache(exemple, "TASK-002", modification);
} catch (erreur) {
    refus = /Terminez TASK-001/.test(erreur.message);
}
assert.equal(refus, true);
const termine = modifierTache(exemple, "TASK-001", modification);
assert.equal(calculerProgression(termine), 14);
assert.equal(exemple.tasks[0].status, "To Do");
assert.equal(termine.tasks[0].title, "Nouveau titre");
const deuxTerminees = modifierTache(termine, "TASK-002", modification);
assert.throws(function() {
    const changement = JSON.parse(JSON.stringify(modification));
    changement.status = "To Do";
    modifierTache(deuxTerminees, "TASK-001", changement);
}, /Terminez TASK-001/);
assert.throws(function() {
    const changement = JSON.parse(JSON.stringify(modification));
    changement.deadline = "Day 8";
    modifierTache(exemple, "TASK-001", changement);
}, /deadline/i);

const supprime = retirerTache(exemple, "TASK-001");
assert.equal(supprime.tasks.length, 6);
for (const tache of supprime.tasks) {
    assert.equal(tache.dependencies.indexOf("TASK-001"), -1);
}
for (const phase of supprime.phases) {
    assert.equal(phase.taskIds.indexOf("TASK-001"), -1);
}
let vide = exemple;
for (const tache of exemple.tasks) {
    vide = retirerTache(vide, tache.id);
}
assert.equal(calculerProgression(vide), 0);
assert.equal(vide.tasks.length, 0);
for (const changement of ["id", "priority", "importance", "size", "status", "deadline", "estimatedTime", "dependencies", "userStories", "acceptanceCriteria", "description"]) {
    const mauvais = JSON.parse(JSON.stringify(exemple));
    mauvais.tasks[0][changement] = null;
    assert.throws(function() { verifierPlan(mauvais); }, changement);
}
const inconnu = JSON.parse(JSON.stringify(exemple));
inconnu.tasks[1].dependencies = ["TASK-999"];
assert.throws(function() { verifierPlan(inconnu); }, /Dépendance/);
const doublon = JSON.parse(JSON.stringify(exemple));
doublon.tasks[1].id = doublon.tasks[0].id;
assert.throws(function() { verifierPlan(doublon); }, /double/);

let texte = "[]";
global.localStorage = {
    getItem: function() { return texte; },
    setItem: function(cle, valeur) { texte = valeur; }
};
termine.id = "test";
enregistrerProjet(termine);
assert.equal(chargerProjets()[0].tasks[0].title, "Nouveau titre");
assert.equal(chargerProjets()[0].tasks[0].status, "Done");
assert.equal(texte.indexOf("api-key"), -1);
supprimerProjet("test");
assert.equal(chargerProjets().length, 0);
texte = "JSON cassé";
assert.throws(function() { chargerProjets(); }, /illisible/);
assert.equal(texte, "JSON cassé");

const personnalise = preparerProjetDemo(JSON.parse(JSON.stringify(exemple)), infos);
assert.equal(personnalise.projectName, "Mon projet");
assert.equal(personnalise.duration, 3);
for (const tache of personnalise.tasks) {
    assert.ok(Number(tache.deadline.replace("Day ", "")) <= 3);
}

async function testerChargement() {
    global.location = {protocol: "http:"};
    let demande;
    global.fetch = async function(url, options) {
        demande = {url: url, method: options.method};
        return {ok: true, json: async function() { return exemple; }};
    };
    assert.equal((await chargerPlanDemo()).tasks.length, 7);
    assert.deepEqual(demande, {url: "data/sample-plan.json", method: "GET"});
    global.fetch = async function() { return {ok: false, status: 404}; };
    await assert.rejects(chargerPlanDemo, /HTTP 404/);
    global.fetch = async function() {
        return {ok: true, json: async function() { throw new SyntaxError("JSON"); }};
    };
    await assert.rejects(chargerPlanDemo, /JSON valide/);
    global.fetch = async function() { const e = new Error(); e.name = "AbortError"; throw e; };
    await assert.rejects(chargerPlanDemo, /trop long/);
    global.location.protocol = "file:";
    await assert.rejects(chargerPlanDemo, /Live Server/);
    console.log("OK : validation, progression, dépendances, modification, suppression, sauvegarde et chargement JSON démo.");
}
testerChargement().catch(function(erreur) {
    console.error(erreur);
    process.exitCode = 1;
});
