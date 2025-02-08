document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Form submission for job applications
    const applyButtons = document.querySelectorAll(".apply-btn")
    applyButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const jobTitle = this.closest(".card").querySelector("h3").textContent
        alert(`Merci de votre intérêt pour le poste de ${jobTitle}. Votre candidature a été enregistrée.`)
      })
    })
  
    // Contact button functionality
    const contactBtn = document.querySelector(".contact-btn")
    contactBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact")
      contactSection.scrollIntoView({ behavior: "smooth" })
    })

    let saisie = `
        <h2>Détails de l'Offre</h2>
        <div class="job-details">
      Opérateur(trice) de Saisie de Données</h3>
          <p>Akamai Groupe recherche un(e) opérateur(trice) de saisie de données pour intégrer l’équipe administrative. Vous serez chargé(e) de saisir, traiter et mettre à jour les informations comptables et administratives, assurant ainsi la fiabilité des données indispensables au bon fonctionnement de nos services.</p>
          <h4>Missions Principales</h4>
          <ul>
            <li> Enregistrer avec précision les données comptables et administratives.</li>
            <li>  Vérifier et corriger les informations saisies pour éviter les erreurs.  </li>
            <li>Mettre à jour régulièrement les bases de données.</li>
          </ul>
        </div>
        <button type="button" class="btn-next">Continuer</button>
        ` ;

    let comptable = `
  <h2>Détails de l'Offre</h2>
  <div class="job-details">
    <h3>Assistant(e) Comptable</h3>
    <p>Akamai Groupe recherche un(e) assistant(e) comptable pour rejoindre notre équipe. Vous serez chargé(e) d'assister dans la gestion comptable et financière de l'entreprise, notamment dans le rapprochement bancaire, le suivi des factures et la préparation des déclarations fiscales et sociales.</p>
    <h4>Missions Principales</h4>
    <ul>
      <li>Assister dans la gestion comptable et financière.</li>
      <li>Effectuer le rapprochement bancaire et le suivi des factures.</li>
      <li>Préparer les déclarations fiscales et sociales.</li>
    </ul>
  </div>
  <button type="button" class="btn-next">Continuer</button>
`;

let community =`
  <h2>Détails de l'Offre</h2>
  <div class="job-details">
    <h3>Community Manager</h3>
    <p>Akamai Groupe recherche un(e) community manager pour animer et gérer notre présence sur les réseaux sociaux. Vous serez chargé(e) de créer et planifier des contenus, d'engager notre communauté en ligne et d'analyser les performances des publications.</p>
    <h4>Missions Principales</h4>
    <ul>
      <li>Créer et gérer les contenus pour les réseaux sociaux.</li>
      <li>Planifier et publier les posts sur les différentes plateformes.</li>
      <li>Analyser les performances des publications pour optimiser la stratégie digitale.</li>
    </ul>
  </div>
  <button type="button" class="btn-next">Continuer</button>
`;

let assistant = `
  <h2>Détails de l'Offre</h2>
  <div class="job-details">
    <h3>Assistant(e) Administratif(ve)</h3>
    <p>Akamai Groupe recherche un(e) assistant(e) administratif(ve) pour soutenir nos équipes dans la gestion administrative. Vous serez responsable de la gestion des courriers, de l'organisation des réunions et du suivi des dossiers internes.</p>
    <h4>Missions Principales</h4>
    <ul>
      <li>Gérer les courriers et documents administratifs.</li>
      <li>Organiser et planifier les réunions.</li>
      <li>Assurer le suivi et la mise à jour des dossiers internes.</li>
    </ul>
  </div>
  <button type="button" class="btn-next">Continuer</button>

`;
localStorage.setItem("saisie", saisie)
localStorage.setItem("comptable", comptable)
localStorage.setItem("assistant", assistant)
localStorage.setItem("community", community)

  })
  
  