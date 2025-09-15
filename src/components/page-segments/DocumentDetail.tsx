"use client";

import React, { useRef, useState } from "react";

import {
  ArrowLeft,
  Download,
  Eye,
  Calendar,
  FileText,
  Lock,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/firebase/useAuth";
// import { useAuth } from '../contexts/AuthContext';`



const mockDocuments = {
  international: [
    {
      id: 1,
      title:
        "CONVENTION-CADRE DES NATIONS UNIES SUR LES CHANGEMENTS CLIMATIQUES ",
      description:
        "Conscientes que les changements du climat de la planËte et leurs effets nÈfastes sont un sujet de prÈoccupation pour líhumanitÈ tout entiËre",
      type: "Policy Document",
      pages: 45,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
    Conscientes que les changements du climat de la planËte et leurs effets nÈfastes sont un 
sujet de prÈoccupation pour líhumanitÈ tout entiËre, 
 PrÈoccupÈes par le fait que líactivitÈ humaine a augmentÈ sensiblement les concentrations 
de gaz ‡ effet de serre dans líatmosphËre, que cette augmentation renforce líeffet de serre naturel 
et quíil en rÈsultera en moyenne un rÈchauffement supplÈmentaire de la surface terrestre et de 
líatmosphËre, ce dont risquent de souffrir les ÈcosystËmes naturels et líhumanitÈ, 
 Notant que la majeure partie des gaz ‡ effet de serre Èmis dans le monde par le passÈ et ‡ 
líheure actuelle ont leur origine dans les pays dÈveloppÈs, que les Èmissions par habitant dans les 
pays en dÈveloppement sont encore relativement faibles et que la part des Èmissions totales 
imputable aux pays en dÈveloppement ira en augmentant pour leur permettre de satisfaire leurs 
besoins sociaux et leurs besoins de dÈveloppement, 
 Conscientes du rÙle et de líimportance des puits et rÈservoirs de gaz ‡ effet de serre dans 
les ÈcosystËmes terrestres et marins,
      `,
      author: "CNUCC",
      language: "French",
      document: "/documents/international/CCNUCC.pdf",
    },
    {
      id: 2,
      title: "COMPTE RENDU DE LA MISSION DE CGLU AFRIQUE A LA COP 26 ",
      description:
        "La Conférence des Parties de la Convention-Cadre des Nations Unies sur les Changements Climatiques s’est réunie du 1 au 12 Novembre 2021 à Glasgow, Ecosse, Royaume Uni (COP 26) après un an de report en raison de la pandémie mondiale de COVID-19.",
      type: "Policy Document",
      pages: 45,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
      Du fait de ce contexte particulier, la COP 26 était considérée comme la COP de la dernière chance pour démontrer que
       l‘Accord de Paris pouvait encore apporter une réponse efficace à la crise climatique, et que l’action climatique devrait 
       participer à une relance mondiale post-COVID-19 plus bas-carbone, plus verte, et plus résiliente. C’est également, une COP 
       à forts enjeux stratégiques pour l’Afrique comme, l’ont été la COP 21 à Paris et la COP 22 à Marrakech, puisque l’Afrique
        accueillera à nouveau le rendez-vous mondial du climat en 2022 en Egypte. Dans cette perspective et au-delà de la 
        responsabilité de gérer la mise en œuvre des résultats de la COP26. La COP 27 est tenue de faire progresser véritablement 
        les priorités de l’Afrique, notamment dans le domaine de la mobilisation de la finance climat et de l’adaptation au 
        changement climatique qui reste un défi très largement territorial.`,
      author: "CGLU",
      language: "French",
      document: "/documents/international/Compte-rendu-COP-26-Glasgow-2021.pdf",
    },
    {
      id: 3,
      title: "Conférence sur les changements climatiques (COP 24) à Katowice ",
      description:
        "La  conférence  sur  les  changements  climatiques  (COP 24)  qui  aura  lieu  à  Katowice,  en  Pologne,  du  3  au  14 décembre 2018, se concentrera sur la mise en œuvre complète de l’accord de Paris et sur la phase politique du dialogue de Talanoa, visant à soutenir la mise en œuvre des engagements nationaux.",
      type: "Conference",
      pages: 2,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `La  24e  conférence  des  parties  (COP 24)  à  la  convention-cadre  des  Nations  unies  sur  les  changements  
climatiques  (CCNUCC)  se  concentrera  sur  la  mise  en  œuvre  de  l’accord  de  Paris.  Elle  devrait  finaliser  un  
ensemble de décisions sur les modalités de mise en œuvre de l’accord de Paris dans un large éventail de 
domaines, notamment en ce qui concerne la transparence, l’adaptation, la réduction des émissions, l’octroi 
de ressources financières, le renforcement des capacités et les technologies. La présidence fidjienne de la 
COP 23 a lancé le dialogue de Talanoa, dans le cadre duquel les parties à la CCNUCC et les parties prenantes 
se concentrent sur les questions suivantes: où en sommes-nous, où voulons-nous aller et comment y arriver? 
Dans la phase politique du dialogue de Talanoa, qui aura lieu lors de la COP 24, des représentants de haut 
niveau des parties feront le point sur les efforts collectifs déployés pour atteindre les objectifs à long terme 
de l’accord de Paris et se consacreront à la préparation du prochain cycle de contributions déterminées au 
niveau  national.  `,
      author: "COP 24",
      language: "French",
      document: "/documents/international/COP 24 à Kartowise.pdf",
    },
    {
      id: 4,
      title: "ACCORD  DE  PARIS ",

      description:
        "Étant Parties  à  la  Convention-cadre  des  Nations  Unies  sur  les  changements  climatiques,  ci-après  dénommée  « la  Convention  »,  ",
      type: "Agreement",
      pages: 28,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `Étant Parties  à  la  Convention-cadre  des  Nations  Unies  sur  les  changements  
climatiques,  ci-après  dénommée  « la  Convention  »,  
Agissant en application de la plateforme de Durban pour une action 
renforcée adoptée par la décision 1/CP.17 de la Conférence des Parties à la 
Convention  à  sa  dix-septième  session,  
Soucieuses d'atteindre l'objectif de la Convention, et guidées par ses 
principes,  y  compris  le  principe  de  l'équité  et  des  responsabilités  communes  mais  
différenciées et des capacités respectives, eu égard aux différentes situations 
nationales, 
Reconnaissant la nécessité  d'une  riposte  efficace et  progressive  à  la  menace  
pressante des changements climatiques en se fondant sur les meilleures 
connaissances  scientifiques  disponibles,  
Reconnaissant aussi les  besoins  spécifiques  et  la  situation  particulière  des  
pays en développement Parties, surtout de ceux qui sont particulièrement 
vulnérables  aux  effets néfastes  des  changements  climatiques,  comme  le  prévoit  la  
Convention, 
Tenant pleinement compte des besoins spécifiques et de la situation 
particulière  des  pays  les  moins  avancés  en  ce  qui  concerne  le  financement  et  le  
transfert  de  technologies,  
Reconnaissant que  les  Parties  peuvent  être  touchées  non  seulement  par  les  
changements  climatiques,  mais  aussi  par  les  effets  des  mesures  de  riposte  à  ces  
changements, 
Soulignant que  l'action  et  la  riposte  face  aux  changements  climatiques  et  
les effets des changements climatiques sont intrinsèquement liés à un accès 
équitable  au  développement  durable  et  à  l'élimination  de  la  pauvreté,  
`,
      author: "",
      language: "French",
      document: "/documents/international/COP 24 à Kartowise.pdf",
    },
    {
      id: 5,
      title:
        "PROTOCOLE DE KYOTO LA CONVENTION-CADRE DES NATIONS UNIES SUR LES CHANGEMENTS CLIMATIQUES",
      description:
        "Chacune des Parties visÈes ‡ líannexe I, pour síacquitter de ses engagements chiffrÈs en matiËre de limitation et de rÈduction prÈvus ‡ líarticle 3, de faÁon ‡ promouvoir le dÈveloppement durable",
      type: "Protocol",
      pages: 24,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
        CoopËre avec les autres Parties visÈes pour renforcer líefficacitÈ individuelle et 
globale des politiques et mesures adoptÈes au titre du prÈsent article, conformÈment au 
sous-alinÈa
 i) de líalinÈa 
 e) du paragraphe 2 de líarticle 4 de la Convention. 
 cette fin, ces Parties prennent des dispositions en vue de partager le fruit de leur expÈrience et díÈchanger des 
informations sur ces politiques et mesures, notamment en mettant au point des moyens díamÈliorer leur comparabilitÈ, leur transparence et leur efficacitÈ. ¿ sa premiËre session ou dËs 
quíelle le peut par la suite, la ConfÈrence des Parties agissant comme rÈunion des Parties 
au prÈsent Protocole Ètudie les moyens de faciliter cette coopÈration en tenant compte de toutes 
les informations pertinentes. 
2. Les Parties visÈes ‡ líannexe I cherchent ‡ limiter ou rÈduire les Èmissions de gaz ‡ effet de 
serre non rÈglementÈs par le Protocole de MontrÈal provenant des combustibles de soute utilisÈs 
dans les transports aÈriens et maritimes, en passant par líintermÈdiaire de líOrganisation de 
líaviation civile internationale et de líOrganisation maritime internationale, respectivement. 
3. Les Parties visÈes ‡ líannexe I síefforcent díappliquer les politiques et les mesures prÈvues 
dans le prÈsent article de maniËre ‡ rÈduire au minimum les effets nÈgatifs, notamment les effets 
nÈfastes des changements climatiques, les rÈpercussions sur le commerce international et les 
consÈquences sociales, environnementales et Èconomiques pour les autres Parties, surtout les 
pays en dÈveloppement Parties et plus particuliËrement ceux qui sont dÈsignÈs aux paragraphes 8 
et 9 de líarticle 4 de la Convention, compte tenu de líarticle 3 de celle-ci. La ConfÈrence des 
Parties agissant comme rÈunion des Parties au prÈsent Protocole pourra prendre, selon quíil 
conviendra, díautres mesures propres ‡ faciliter líapplication des dispositions du prÈsent 
paragraphe. `,
      author: "",
      language: "French",
      document: "/documents/international/protocole de Kyoto.pdf",
    },
    {
      id: 6,
      title: "Convention-cadre sur les changements climatiques",

      description:
        "Rapport de la Conférence des Parties sur sa seizième session, tenue à Cancún du 29 novembre au 10 décembre 2010",
      type: "Conference",
      pages: 34,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `S’efforçant  d’obtenir  des  avancées  de  manière  équilibrée,  étant  entendu  que,  par  la  
présente  décision,  tous  les  aspects  des  travaux  du  Groupe  de  travail  spécial  de  l’action  
concertée  à  long  terme  au  titre  de  la  Convention  ne  sont  pas  résolus  et  que  rien  dans  la  
présente  décision  ne  préjuge  de  la  possibilité  d’aboutir  à  terme  à  un  texte  juridiquement  
contraignant ou du contenu de ce texte,  
Réaffirmant l’engagement de permettre l’application intégrale, effective et continue 
de  la  Convention  par une  action  concertée à  long  terme,  dès  à présent, d’ici  à 2012  et  au-
delà, afin d’atteindre l’objectif ultime de la Convention, 
Rappelant les principes, dispositions et engagements énoncés dans la Convention, en 
particulier aux articles 3 et 4,  
Reconnaissant que les changements climatiques représentent une menace immédiate 
et  potentiellement  irréversible  pour  les  sociétés  humaines  et  la  planète,  et  que  toutes  les  
Parties doivent donc y faire face d’urgence, 
Affirmant la nécessité légitime, pour les pays en développement parties, de parvenir 
à une croissance économique soutenue et d’éliminer la pauvreté pour pouvoir faire face aux 
changements climatiques, 
Prenant note de la résolution 10/4 du Conseil des droits de l’homme de 
l’Organisation des Nations Unies intitulée «Droits de l’homme et changements 
climatiques»,  dans  laquelle  le  Conseil  constate  que  les  effets  néfastes  des  changements  
climatiques ont une série d’incidences, tant directes qu’indirectes, sur l’exercice effectif des 
droits  de  l’homme  et  que  les  groupes  de  population  déjà  en  situation  de  vulnérabilité  à  
cause  de  facteurs  comme  la  situation  géographique,  le  sexe,  l’âge,  le  statut  d’autochtone,  
l’appartenance à une minorité ou le handicap seront les plus durement touchés,`,
      author: "COP",
      language: "French",
      document: "/documents/international/rapport de la COP a cancun.pdf",
    },
  ],
  regulation: [],
  national: [
    {
      id: 1,
      title: "PREMIER RAPPORT BIENNAL ACTUALISE DU CAMEROUN",
      description:
        "DANS LE CADRE DE  LA CONVENTION CADRE DES NATIONS UNIES SUR LES CHANGEMENTS CLIMATIQUES",
      type: "Report",
      pages: 211,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `Le Cameroun  est un pays de l’Afrique Centrale et  du  Bassin  du  Congo  qui  bénéficie  d’une position  avantageuse  unique  au  cœur  de 
l’Afrique ce qui lui a valu le titre d’Afrique en 
miniature.  C’est un pays d’environ 475 000km² 
qui  présente  la  forme  grossière  d’un  triangle 
équilatéral  étiré  sur  plus  1500km  du  Sud  au 
Nord (2-13°N) et plus de 800km d’Ouest en Est 
(9-16°E). le Cameroun est bordé au nord-ouest 
par le Nigeria (sur 1 720 km), au nord par le 
Tchad  (1  122  km),  à  l’est  par  la  République 
Centrafricaine (822 km), au sud par le Congo 
(520  km),  le  Gabon  (298  km)  et  la  Guinée 
équatoriale (183 km). Il dispose à l’ouest d’une 
ouverture d’environ 400 km de côte sur l’océan 
Atlantique. 
Le Cameroun de par sa situation sa situation au-
dessus du craton du Congo et son ouverture sur 
l’Atlantique  occupe  une  position  charnière 
morphologique  particulière  sur  le  continent 
africain,  notamment  avec  au  nord  le  bassin 
endoréique du Lac Tchad et le fossé de Doba, à 
l’ouest le fossé crétacé de la Bénoué, au Sud Est 
la cuvette du Congo, au Sud-Ouest la cuvette de 
Mamfe et le bassin côtier de Douala.  
 
Au plan topographique, Le Cameroun est un 
territoire  constitué à 63%  de  hautes  terres et 
comptant  trois  grandes  unités  de  relief.  Les 
montagnes  qui  prennent  en  écharpe  toute  la 
partie  occidentale  du  pays  et  qui  culmine  au 
Mont Cameroun (4100m). Le mont Cameroun 
représente le plus haut sommet du Cameroun et 
d’Afrique Centrale et s’allonge sur plus de 70km 
du  nord  au  Sud  et  35km  d’est  en  ouest.  Les 
plateaux  constituent  la  seconde  unité 
topographique  du  Cameroun  occupent  la 
majeure partie du territoire Camerounais (plus 
de 80%) et se situent à des altitudes moyennes 
variables  allant  de  500  à  2000  m  d’altitude. 
Enfin  les  plaines  représentent  le  troisième 
élément  de  la  diversité  topographique  du 
Cameroun.  Elles    s’étendent  sur  de  vastes 
portions  du  territoire  notamment    le long du 
littoral  atlantique  (plaines  côtières)  ou  à 
l’intérieur  du  Pays  en  allant  vers  le  Nord 
(plaines de la Bénoué du Tchad). 
Les  études  géologiques      s’accordent    à  
subdiviser  le  Cameroun  en  plusieurs grands 
domaines  géologiques  partant  du  craton  du 
Congo jusqu’au Lac Tchad. Ainsi, cinq grands`,
      author: "",
      language: "French",
      document: "/documents/national/BUR1_CMR FINAL.pdf",
    },
    {
      id: 2,
      title: "GUIDE D'INTÉGRATION CAMEROUN JUIN 2017",
      description:
        "GUIDE MÉTHODOLOGIQUE D’INTÉGRATION DE L’ADAPTATION AU CHANGEMENT CLIMATIQUE (ACC) ET GESTION DES RISQUES DE CATASTROPHES (GRC) DANS LA PLANIFICATION DU DÉVELOPPEMENT AU CAMEROUN",
      type: "Guide",
      pages: 74,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
        
Le  présent  Guide  est  l’aboutissement  d’un  partenariat  actif  entre  le  Cameroun  et  la  Banque 
mondiale  déterminés  à  co-construire  un  développement  durable  reposant  sur  une  économie  plus 
résiliente  et  une  société  moins  vulnérable  aux  effets  du  changement  climatique.  Au  regard  d’une 
mobilisation internationale plus forte en matière d’adaptation aux effets du changement 
climatique et à la réduction des risques y afférents et compte tenu des engagements 
internationaux  pris  par  notre  pays,  le  processus  actuel  vient  à  point  nommé.  Il  s’inscrit  en  droite 
ligne des missions assignées à l’ONACC et à la DPC et son opportunité, quant à la mise en œuvre du 
PNACC et du respect de nos engagements pris dans le cadre de la CPDN, ne fait aucun doute. 
En  réaction  à  la  main  tendue  de  la  Banque  mondiale  de  soutenir  plus  que  par  la  passé,  les  pays 
désireux  de  prendre  en  compte  les  effets  du  changement  climatique  dans  la  planification  du 
développement,  le  Cameroun  a  fait  le  choix  de  disposer  d’un  guide  méthodologique  pour  y 
parvenir.  Pour  réussir  ce  challenge,  nous  avons  créé  un  Groupe  de  Travail  qui  a  orienté  et 
accompagné le travail des experts à toutes les étapes.  
L’élaboration de ce document s’est appuyée sur un état des lieux exhaustifs des aléas climatiques 
et des vulnérabilités subséquentes sur l’ensemble des dix régions du pays. Ce diagnostic 
systémique a concerné quatre secteurs sensibles (Agro pastoral, énergie, transport et 
développement urbain) et est arrivé au constat selon lequel, si rien n’est entrepris pour inverser la 
tendance  constatée,  les  impacts  des  aléas  exacerberaient  les  vulnérabilités  de  nos  sociétés  et 
notre environnement et affecteraient la résilience de notre économie au point de porter atteinte à 
certains des objectifs de la vision 2035 de notre pays.`,
      author: "",
      language: "French",
      document:
        "/documents/national/Cameroun-Climate Change Adaptation Mainstreaming Guidelines 2017.pdf",
    },

    {
      id: 3,
      title:
        "CONTRIBUTION DETERMINEE AU NIVEAU NATIONAL - ACTUALISEE (CDN) - NATIONALLY DETERMINED CONTRIBUTION- UPDATED (NDC)",
      description:
        " De  fait,  ce  document  est considéré  comme  la  première  CDN  du  Cameroun,  décrivant  les  objectifs  de réduction des émissions de Gaz à Effet de Serre (GES) accompagnés de propositions de mesures d’adaptation. ",
      type: "Report",
      pages: 64,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
        Le Cameroun a soumis sa CPDN auprès du Secrétariat de la CCNUCC en octobre 
2015  et  ratifié  l’Accord  de  Paris  en  janvier  2016.      De  fait,  ce  document  est 
considéré  comme  la  première  CDN  du  Cameroun,  décrivant  les  objectifs  de 
réduction des émissions de Gaz à Effet de Serre (GES) accompagnés de 
propositions de mesures d’adaptation. 
A  travers  le  présent  document,  le  Gouvernement  du  Cameroun  présente  une 
actualisation de sa première Contribution Déterminée au niveau National 
(atténuation et adaptation), pour la période 2020  - 2030 et conformément aux 
articles 4.2, 4.9 et 4.11 de l’Accord de Paris et autres dispositions pertinentes de 
l’Accord. 
Le contenu de cette soumission s'appuie sur l’examen des progrès réalisés au titre 
de  la  première  CDN,  les  nouvelles  politiques  telles  que  la  SND30,  les  plans 
nationaux et sectoriels, et reflètent les travaux ultérieurs concernant l'élaboration 
d’objectifs quantifiables d'atténuation et  d'adaptation.  Ce document  représente 
une synthèse robuste  qualifiée par  des évaluations détaillées  et pertinentes des 
mesures d'atténuation et des mesures d'adaptation. Ces évaluations sont 
complétées  et  soutenues  par  une  analyse  approfondie,  des  informations  et 
données contextualisées, un processus inclusif de consultation des parties 
prenantes, en ciblant une ambition climatique accrue. 
A travers la révision de sa CDN, le Cameroun entend réduire l’empreinte carbone 
de  son  développement  35%  à  l’horizon  2030,  avec  2010  comme  année  de 
référence, sans pour autant ralentir sa croissance, tout en privilégiant des options 
d’atténuation présentant des cobénéfices élevés,  en  renforçant  la  résilience  du 
pays  aux  changements  climatiques,  et  en  mettant  en  cohérence  ses  politiques 
sectorielles, y compris le renforcement de son dispositif et des outils de mise en 
œuvre, afin de faciliter l’atteinte de ces objectifs. 
             `,
      author: "",
      language: "French",
      document: "/documents/national/CDN rÃ©visÃ©e CMR finale sept 2021.pdf",
    },
    {
      id: 4,
      title: "Communication National du Cameroun",
      description:
        "La  Commission  des  Nations  Unies  pour  l’Environnement  (CNUE)  a  clairement  mis  en  évidence  la  dégradation  de  l’environnement tant  au niveau  mondial qu’au niveau régional en liaison avec l’activité économique",
      type: "Report",
      pages: 160,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `
        La  Commission  des  Nations  Unies  pour  l’Environnement  (CNUE)  a  clairement  mis  en  évidence  la  
dégradation  de  l’environnement tant  au niveau  mondial qu’au niveau régional en liaison avec l’activité 
économique. Cette prise de conscience s’est renforcée au Sommet de Rio encore dénommé « Sommet de 
la  Terre »  par  l’acceptation  du  concept  de  Développement  Durable  par  l’ensemble  de  la  communauté  
internationale.  Parmi  les  actes  concrets  de  cette  conférence  figure  en  bonne  place  l’adoption  de  la  
Convention  Cadre  des  Nations  Unies  sur  les  Changements  Climatiques  (CCNUCC),  convention  que  le  
Cameroun a ratifiée en 1994. 
 
La Convention Cadre des Nations Unies sur les Changements Climatiques engage les pays signataires à 
stabiliser  les  concentrations  des  GES  dans  l’atmosphère  à  un  niveau  qui  préviendrait  une  interférence  
dangereuse  anthropique  avec  le  système  climatique  global.  Dans  le  cadre  de  la  mise  en  œuvre  de  cette  
convention, le Cameroun a été choisi avec trois autres pays ( le Pakistan, l’Antigua et l’Estonie) pour la 
réalisation d’une étude pilote destinée à mettre en application la méthodologie du Groupement 
Intergouvernemental d’Experts sur l’Evolution du Climat (GIEC) de 1990, à l’effet d’évaluer les impacts 
des changements climatiques et les mesures d’adaptation nécessaires. 
             `,
      author: "",
      language: "French",
      document: "/documents/national/communication nationale du cameroun.pdf",
    },
    {
      id: 5,
      title:
        "STRATÉGIE NATIONALE DE RÉDUCTION DES ÉMISSIONS ISSUES DE LA DÉFORESTATION ET DE LA DÉGRADATION DES FORÊTS, GESTION DURABLE DES FORÊTS, CONSERVATION DES FORÊTS ET AUGMENTATION DES STOCKS DE CARBONE ",
      description:
        "Le processus d’élaboration  de  la  stratégie  nationale  de  réduction  des émissions  issues  de  la  déforestation  et  de  la  dégradation  des  forêts, gestion  durable  des  forêts,  conservation  des  forêts  et  augmentation  des stocks  de  carbone,  (Stratégie  Nationale  REDD+),  ",
      type: "Report",
      pages: 74,
      size: "2.3 MB",
      date: "2024-02-15",
      restricted: true,
      content: `Les forêts occupent plus de deux tiers de la superficie du territoire national camerounais1 et jouent de ce 
fait  plusieurs  rôles  :  économique,  social  et  environnemental.  Ces  forêts  constituent  une  réserve  foncière 
pour  l’agriculture,  la  principale  base  de  subsistance  pour  une  frange  importante  de  la  population 
camerounaise et servent d’habitat aux communautés locales et peuples autochtones. Sur le plan 
environnemental, les écosystèmes forestiers camerounais sont le refuge d’une très grande biodiversité et 
jouent un rôle d’atténuation des Gaz à Effet de Serre (GES) par leur fort potentiel de stockage de carbone. 
Malgré cela, ces forêts sont menacées à cause de la déforestation et la dégradation anthropiques. Le taux 
moyen annuel de perte du couvert végétal entre 2000 et 2014 est estimé à 0.12% (Hansen et al., 2013). Les 
projections de la déforestation indiquent que ce taux pourrait tripler dans certaines zones agro-écologiques 
(ZAE) d'ici 2035. Les principales causes directes de la déforestation et de la dégradation forestière sont : 
l’extension  de  l’agriculture  (itinérante  et  permanente)  ;  l’extraction  du  bois  (commercial,  bois-énergie, 
charbon de bois) ; extension des infrastructures (transport, habitat, entreprises privées et services publics). 
Ces causes varient au sein et entre les différentes zones agro-écologiques du pays.`,
      author: "REDD+",
      language: "French",
      document: "/documents/national/strategie nationale REDD+.pdf",
    },
  ],
};

const DocumentDetail = () => {
  const param = useParams();
  const { category } = param;
  const [isAuthenticated] = useState(false);
  const [isDownloading] = useState(false);
 const {  loading, user } = useAuth();
  const categoryDocuments =
    mockDocuments[param.category as keyof typeof mockDocuments] || [];
  const documentData = categoryDocuments.find(
    (doc) => doc.id.toString() === param.id
  );

  const handleDownload = () => {
    if (!documentData) return;

    const link = document.createElement("a");
    link.href = documentData.document;
    link.download = documentData.title.replace(/[^a-z0-9]/gi, "_") + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!documentData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested document could not be found.
          </p>
          <Link href="/documents">
            <Button>Back to Documents</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Agreement: "bg-primary/10 text-primary",
      Report: "bg-secondary/10 text-secondary",
      Guidance: "bg-accent text-accent-foreground",
      Policy: "bg-muted text-muted-foreground",
      Amendment: "bg-destructive/10 text-destructive",
      Framework: "bg-primary/20 text-primary",
      Protocol: "bg-purple-100 text-purple-800",
      Conference: "bg-blue-100 text-blue-800",
      Guide: "bg-green-100 text-green-800",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/documents/${category}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {category} documents
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <FileText className="h-10 w-10 text-orange-500 mr-4" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {documentData && documentData.title}
                  </h1>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {documentData && documentData.type}
                  </span>
                </div>
              </div>
              {!user && (
                <Lock className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <p className="text-gray-600 text-lg mb-6">
              {documentData && documentData.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.pages}
                </div>
                <div className="text-sm text-gray-600">Pages</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.size}
                </div>
                <div className="text-sm text-gray-600">File Size</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.language}
                </div>
                <div className="text-sm text-gray-600">Language</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Published on{" "}
                {
                  //@ts-ignore
                  formatDate(documentData && documentData.date)
                }
                {documentData && documentData.author && (
                  <span className="ml-4">
                    By {documentData && documentData.author}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {!user ? (
                  <div>
                    <button
                      disabled
                      className="flex items-center px-4 text-sm py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Login to Download
                    </button>
                    <p className="text-xs text-red-600">
                      Login required to download this document
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Document Preview
            </h2>
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              //@ts-ignore
              dangerouslySetInnerHTML={{__html: documentData && documentData.content,
              }}
            />

            {!user && (
              <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-orange-500 mr-2" />
                  <p className="text-orange-700 font-medium">
                    Full document access requires login
                  </p>
                </div>
                <p className="text-orange-600 text-sm mt-2">
                  Please{" "}
                  <Link
                    href="/auth/signin"
                    className="underline hover:no-underline"
                  >
                    sign in
                  </Link>{" "}
                  to download and access the complete document.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
