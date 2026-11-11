// Le plan exemple garde ses tâches et prend les informations du formulaire.
function preparerProjetDemo(plan, infos) {
    let dureeExemple = plan.duration;
    plan.projectName = infos.name;
    plan.description = infos.description;
    plan.brief = infos.brief;
    plan.duration = Number(infos.duration);
    plan.developers = Number(infos.developers);
    plan.technologies = infos.technologies;
    plan.difficulty = infos.difficulty;
    plan.id = "projet-" + Date.now();

    for (let i = 0; i < plan.tasks.length; i++) {
        let jour = Number(plan.tasks[i].deadline.replace("Day ", ""));
        let nouveauJour = Math.ceil(jour * plan.duration / dureeExemple);
        plan.tasks[i].deadline = "Day " + nouveauJour;
    }
    verifierPlan(plan);
    return plan;
}
