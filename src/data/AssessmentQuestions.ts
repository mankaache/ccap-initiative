export interface QuestionData {
  id: number;
  title: string;
  yesNoQuestion: string;
  checkboxLabel: string;
  checkboxOptions: string[];
  fileUploadLabel?: string;
}

export const sampleQuestions: QuestionData[] = [
  
  {
    id: 2,
    title: "Participation",
    yesNoQuestion: "Est-ce que le projet s’assure de la participation des personnes vulnérables (Femmes, jeunes, personnes handicapées) dans les processus décisionnel du projet (conception, la mise en œuvre et le suivi des projets).  Au moins un membre du groupe cible doit être représenté dans le processus de prise de décision?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
        "réunion de consultation",
        "dialogue",
        "réunion de concertation",
        "focus group discussions"

    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 3,
    title: "Participation",
    yesNoQuestion: "Est-ce que le projet s’assure de la prise en compte des avis, suggestions et propositions des parties prenantes ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
        "enquêtes auprès des cibles",

    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 4,
    title: "Contribution face aux changements climatiques ",
    yesNoQuestion: "Est-ce que le projet contribue aux réductions d'émissions de gaz à effet de serre ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Séquestration de carbone",
    "gestion des déchets (recyclage, réutilisation des déchets, valorisation des déchets)",
    "valorisation de chaine de la valeur des produit bio",
    "protection et restauration des forêts"
,
      "Public consultation sessions",
      "Dedicated stakeholder communication channels",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)"
  },
  {
    id: 6,
    title: "Contribution face aux changements climatiques",
    yesNoQuestion: "Est-ce que le projet contribue à l’amélioration de la résilience des cibles face aux effets des CC ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "renforcement de capacités des cibles sur les actions de résilience aux CC",
        "actions de résilience mise en œuvre auprès des cibles",
      
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 7,
    title: "Contribution face aux changements climatiques",
    yesNoQuestion: "Est-ce que le projet contribue à la réduction de la vulnérabilité des cibles face aux CC ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "renforcement de capacités des cibles",
        "sensibilisation",
      
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 8,
    title: "Contribution face aux changements climatiques",
    yesNoQuestion: "Comment est-ce que le projet contribue à l’accroissement de capacités d’adaptation aux CC des cibles ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "renforcement de capacités des cibles sur les actions d’adaptation aux CC",
      "actions d’adaptation mise en œuvre auprès des cibles",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 9,
    title: "Contribution face aux changements climatiques",
    yesNoQuestion: "Est-ce que le projet conduit aux changements dans les comportements des citoyens ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "renforcement de capacités",
      "formation",
      "sensibilisation",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 10,
    title: "Contribution face aux changements climatiques",
    yesNoQuestion: "Est-ce que le projet permet d’atténuer les effets des changement climatiques ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "agroforesterie",
      "sylviculture",
      "gestion des déchets",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 11,
    title: "Cohérence (Cadre de référence)",
    yesNoQuestion: "Est -ce que le projet s’assure de sa cohérence avec les politiques/stratégies de lutte contre le changement climatique en vigueur?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Objectifs du projets en lien avec ceux de la SND30",
      "Objectifs du projets en lien avec ceux du Plan National Climat",
      "Objectifs du projets en lien avec ceux de la CDN",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 12,
    title: "Partage de benefices ",
    yesNoQuestion: "Est-ce que les communautés locales/femme/peuple autochtones bénéficient de la mise en œuvre du projet ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "activité génératrices de revenu",
      "matériel agricole",
      "formations",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 13,
    title: "Inclusivité",
    yesNoQuestion: "9)	Est-ce que le projet s’assure que toutes les couches de la société et groupe vulnérables tel que les communautés locales, peuple autochtones, femmes et jeunes sont impliqués dans sa mise en œuvre.",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "",
      "",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 14,
    title: "Appropriation des projets par les bénéficiaires ",
    yesNoQuestion: "Les groupe cibles du projet mettent-elle en œuvre le projet de manière autonome ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "formation/sensibilisation par les relais communautaire",
      
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 15,
    title: "Communication",
    yesNoQuestion: "les actions sur la mise en œuvre de votre projet sont-elles communiquées ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Post sur site web",
      "Post sur réseaux sociaux ",
      "Publication Images",
      "Publication des rapports",
      "Partage de support de communication (flyers, brochures)",
      "Documentaires",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 16,
    title: "Communication",
    yesNoQuestion: "Informations communiques sont-elles adaptées et accessibles aux cibles?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Existence d’une stratégie de communication adaptée",
      "Enquêtes",
      "Publication sur les pages réseaux sociaux",
      
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 17,
    title: "Communication",
    yesNoQuestion: "Informations communiques sont-elles claires, et compréhensibles ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
   
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 18,
    title: "Contribution à la de réduction des GES",
    yesNoQuestion: "Est-ce que le projet contribue à la réduction des GES",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
     
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 19,
    title: "Reddition des comptes",
    yesNoQuestion: "Est-ce que les fonds allouer pour le projet sont utiliser pour atteindre les objectifs du projet ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Elaboration et publication des rapports annuel financier",
      "audits financiers",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 20,
    title: "Responsabilité",
    yesNoQuestion: "Les parties prenantes sont-elles clairement identifiées ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Existence d’une cartographie des acteurs",
      
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 21,
    title: "Responsabilité",
    yesNoQuestion: "Les parties prenantes assument-elles réellement leurs rôles ?	Le compte rendu des réunions",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "Le compte rendu des réunions",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 22,
    title: "Partage des données climatiques",
    yesNoQuestion: "Mise à disposition des résultats en lien avec le CC",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
  
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 23,
    title: "Reporting",
    yesNoQuestion: "Comment les informations sont-elles capitalisé ?",
    checkboxLabel: "Moyens(Comment et propositions de réponse)",
    checkboxOptions: [
      "les articles de référence",
      "Rapport annuel",
    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
  {
    id: 24,
    title: "Genre",
    yesNoQuestion:
      "Est-ce que le projet intègre l’aspect genre dans sa mise en œuvre?",
    checkboxLabel: "Moyens(Comment et propositions de réponse) de gestion du genre",
    checkboxOptions: [
        "stratégie genre",
        "politique genre",
        "Liste de présence "

    ],
    fileUploadLabel: "Chargée un Fichier (facultatif)",
  },
];