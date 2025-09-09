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
    id: 1,
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
//   {
//     id: 8,
//     title: "",
//     yesNoQuestion: "",
//     checkboxLabel: "Moyens(Comment et propositions de réponse)",
//     checkboxOptions: [
//       "",
//       "",
//     ],
//     fileUploadLabel: "Chargée un Fichier (facultatif)",
//   },
];