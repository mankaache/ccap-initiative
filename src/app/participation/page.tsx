import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'

const CarteDeParticipation = () => {
    return (
        <main className='max-w-[1250px]  mx-auto px-4 py-10 sm:px-6 lg:px-8'>

            <h1 className='text-4xl font-bold py-10 mt-7 text-center'>CHARTE DE PARTICIPATION A LA PLATEFORME CLIMATE CHANGE ACTION PORTAL
            </h1>
            <div className='space-y-4'>
                <p>
                    La présente charte définit les règles de participation, les droits et responsabilités des utilisateurs, les modalités de gestion des données et les cookies sur la plateforme Climate Change Action Portal (CCAP).
                    Elle précise la politique de confidentialité des données, les conditions d’utilisation de la plateforme, la gestion des cookies et les modalités d’adhésion à la plateforme.
                </p>


                <h2 className='text-2xl font-semibold mt-8 mb-4'> I. DE LA CONFIDENTIALITE DES DONNEES</h2>
                <p>Nous, le Réseau pour la Promotion de l’Agroécologie au Cameroun (REPAC) basé à 1087 Rue Mengue Tsogo Elig Essono district, 11955 Yaoundé Cameroun (« nous », « notre », « la Plateforme ») et représenté par son Secrétariat technique le Service d’Appui aux Initiatives Locales de Développement (SAILD), accordons une haute importance à la protection de vos données personnelles.

                </p>
                <p>
                    A cet effet, nous collectons et utilisons vos données personnelles lorsque vous utilisez notre site et nos services dans le respect des règles de confidentialité, et nous respectons vos droits relatifs aux données personnelles.
                </p>

                <p>
                    Notre politique de confidentialité s’applique à tous les utilisateurs de la plateforme (visiteurs, membres inscrits, contributeurs).


                </p>


                <p>
                    Le REPAC et ses membres ne vendent, ne partagent ni n'échangent les noms ou les informations personnelles des utilisateurs de la plateforme avec d'autres entités et n'envoient pas de courriers au nom d'autres organisations. Avec votre permission, nous pouvons parfois partager des informations avec des organisations apparentées dans le cadre d'un projet ou d'une campagne particulière. Par exemple, si nous coorganisons un événement avec une organisation partenaire et que vous vous inscrivez pour y participer, nous pouvons vous demander la permission de partager vos coordonnées avec notre partenaire.

                </p>
            </div>

            <div className='mb-4 mt-5'>

                <h3 className='text-xl font-semibold mb-4'> 1. Identité du responsable de traitement</h3>
                <ul className='pl-7 space-y-3'>
                    <li>
                        • Nom : REPAC
                    </li>
                    <li>
                        • Adresse : 1087 rue Mengue Tsogo Elig Essono district, 11955 Yaoundé-Cameroun

                    </li>
                    <li>
                        • Adresse électronique de contact : <Link href={'#'}>info@agroecology-cmr.org</Link>
                    </li>
                    <li>
                        • Dans les pays où elle est applicable, l’autorité de protection des données est celle prévue par la <strong>loi n° 2024/017 du 23 décembre 2024 relative à la protection des données personnelles au Cameroun.</strong>
                    </li>
                </ul>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>  2. Données collectées</h3>


                Nous pouvons collecter les catégories de données suivantes :

                <ul className='pl-7 space-y-3 mt-4'>
                    <ol> <strong> 1. Données d’identité / d’enregistrement :</strong> nom, prénom, pseudo, mot de passe (crypté), adresse électronique.
                    </ol>
                    <ol> <strong> 2. Données de contact :</strong> adresse postale, numéro de téléphone (si fourni).
                    </ol>
                    <ol><strong> 3. Données de profil / de rôle :</strong> rôle, affinités (OSC, chercheur, citoyen, administration), préférences de langue.
                    </ol>
                    <ol> <strong> 4. Données d’usage / de navigation :</strong> pages visitées, date et heure d’accès, temps passé, interactions (cliques, filtres utilisés), adresse IP, type d’appareil, système d’exploitation.
                    </ol>
                    <ol>
                        <strong> 5. Contributions / Contenus générés par l’utilisateur :</strong> projets climatiques, documents, articles.
                    </ol>
                    <ol> <strong> 6. Données documentaires :</strong> téléchargement de documents, fichiers téléversés, métadonnées associées.
                    </ol>
                    <ol> <strong> 7. Données de sécurité et authentification :</strong> informations liées à l’authentification (tokens, horodatage de connexion, historique d’accès).
                    </ol>
                </ul>

            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>  3. Finalités du traitement</h3>

                Nous utilisons vos données pour :

                <ul className='pl-7 space-y-3 mt-4'>

                    <li>
                        • Gérer votre compte, authentification, rôles et accès ;

                    </li>
                    <li>
                        • Vous fournir les services (évaluation du niveau de transparence et de redevabilité de vos projets climatiques, consultation d’actualité en matière climatique, consultation des projets climatiques mis en œuvre par différents acteurs, chargement de projets climatiques, documents et articles d’actualité sur la plateforme) ;

                    </li>
                    <li>
                        • Personnaliser votre expérience (langue, filtres enregistrés) ;

                    </li>
                    <li>
                        • Assurer la sécurité du site ;

                    </li>
                    <li>
                        • Analyser les données agrégées pour analyser la performance, l’impact et la transparence des projets climatiques ;

                    </li>
                    <li>
                        • Conserver l’historique de vos contributions (projets climatiques soumis, articles, documents) ;

                    </li>
                    <li>
                        • Communiquer avec vous (notifications, newsletters, alertes) ;

                    </li>
                    <li>
                        • Répondre à vos demandes, requêtes, corrections de données.

                    </li>
                </ul>

            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>  4. Base légale du traitement</h3>
                Le traitement des données personnelles soumises dans l’optique de la participation à la plateforme CCAP s’effectue dans le respect des dispositions de la loi n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun. En effet, le traitement des données repose de manière non exhaustive sur les principes suivants :
                <ul className='pl-7 space-y-3 mt-4'>

                    <li>• Respect de la vie privée des utilisateurs ;</li>
                    <li>• Garantie de la confidentialité des données collectées ;
                    </li>
                    <li>• Veille sur la licéité et la probité des données publiées ;</li>
                    <li>• L’obtention d’un consentement préalable libre, éclairé, spécifique et univoque des utilisateurs au moment de la création des comptes ;
                    </li>
                    <li>• Traitement des données pour des finalités déterminées, explicites et légitimes (favoriser l’accessibilité des projets, programmes, politiques, actualités, documents, en matière climatique au Cameroun et contribuer à l’amélioration du niveau de redevabilité et de transparence des projets climatiques à travers une évaluation confidentielle) ;
                    </li>
                    <li> • La conservation des données pour la période nécessaire à leur traitement.
                    </li>
                </ul>

            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    5. Partage / destinataires des données
                </h3>
                Vos données peuvent être partagées avec des :
                <ul className='pl-7 space-y-3 mt-4'>
                    <li> • Membres autorisés du REPAC pour le suivi interne (Field Legality Advisory Group, Service d’Appui aux Initiatives Locales de Développement, Green Development Advocates) ;
                    </li>
                    <li>• Prestataires techniques (hébergement Firebase, services analytiques) ;
                    </li>
                    <li>• Autorités compétentes si requis par la loi ;
                    </li>
                    <li> • Autres utilisateurs (partage de contenu public, forum, commentaires) selon vos réglages.
                    </li>
                </ul>
                Nous exigeons de tous les prestataires des garanties de sécurité appropriées et des clauses de confidentialité.


            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    6. Transferts internationaux

                </h3>
                <p>
                    Certaines données peuvent être hébergées sur des serveurs situés hors du Cameroun ou traitées par des prestataires internationaux (ex. Firebase). Nous prenons des mesures pour assurer un niveau de protection équivalent (clause contractuelle type, cryptage, sécurisation).

                </p>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    7. Conservation des données
                </h3>
                <p> Les données de compte restent conservées tant que votre compte est actif. Après désactivation, les données peuvent être archivées pendant une durée de cinq (05) ans à des fins historiques, statistiques ou de recherche.

                </p>
                <p>    Les projets et programmes climatiques, actualités et documents soumis restent en principe accessibles ou anonymisés selon vos choix, sauf suppression explicite demandée dans le respect des sauvegardes.
                </p>

            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    8. Vos droits
                </h3>
                Vous disposez des droits suivants :
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>• Droit d’accès à vos données</li>
                    <li>• Droit de rectification</li>
                    <li>  • Droit à l’effacement (dans la mesure permise par l’existence d’archives légales)
                    </li>
                    <li>• Droit à la limitation du traitement
                    </li>
                    <li>  • Droit à la portabilité de vos données
                    </li>
                    <li>  • Droit d’opposition
                    </li>
                    <li> • Droit de retirer votre consentement à tout moment
                    </li>
                    <li>  • Droit de porter plainte auprès de l’autorité de protection des données (au Cameroun, celle créée par la loi 2024/017)
                    </li>
                </ul>

                Pour exercer ces droits, vous pouvez contacter <Link href={'#'}>ccapinitiative@gmail.com</Link>

            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    9. Sécurité

                </h3>
                <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles (HTTPS, chiffrement, contrôle d’accès, sauvegardes,) pour limiter les risques d’accès non autorisé, perte, altération ou divulgation des données.

                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    10. Communication
                </h3>
                <p>  Lorsque vous y consentez, nous utilisons vos informations personnelles pour vous transmettre des actualités pertinentes de la plateforme. Nous vous transmettons ces informations par mail.
                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    11. Transparence, mises à jour et modifications


                </h3>
                <p>
                    Cette Politique de Confidentialité peut être mise à jour de temps à autre. Toute modification sera annoncée sur le site, avec mention de la date de la version en vigueur.

                </p>

                Nous vous encourageons à la consulter régulièrement.

            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    12. Contact
                </h3>
                <p>
                    Pour toute question, réclamation ou demande relative à vos données personnelles, contactez <Link href={'#'}>ccapinitiative@gmail.com</Link>
                </p>
            </div>


            <h2 className='text-2xl font-semibold mt-8 mb-4'>   II. DES CONDITIONS GENERALES D’UTILISATION</h2>

            <p>  Les présentes <strong>Conditions Générales d’Utilisation (CGU)</strong> régissent l’usage du site <strong>ccapinitiative.org (la « Plateforme »)</strong>  et de ses services par tout utilisateur (« vous », « utilisateur », « membre »). En accédant au site ou en l’utilisant, vous acceptez ces conditions. Si vous n’y adhérez pas, vous ne devez pas utiliser la Plateforme.
            </p>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    1. Objet et champ d’application

                </h3>
                <p> La Plateforme CCAP permet de consulter des projets/programmes/politiques mis en œuvre ou élaborés pour lutter contre les changements climatiques. Par ailleurs, elle offre la possibilité aux utilisateurs disposant d’un compte d’évaluer le niveau de redevabilité et de transparence de leurs projets climatiques. Enfin, il donne la possibilité aux utilisateurs d’accéder à des actualités pertinentes en matière climatique au Cameroun.
                </p>
                <p>   Les présentes CGU s’appliquent à toutes les fonctionnalités de la Plateforme (inscription, téléversement de projets, d’informations ou de documents, évaluation du niveau de redevabilité et de transparence des projets).
                </p>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    2. Accès, inscription et rôles
                </h3>
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>• L’accès à certaines fonctionnalités nécessite une inscription (nom, e-mail, mot de passe).</li>
                    <li> • Vous êtes responsable de la sécurité de vos identifiants.</li>
                    <li>  • Vous pouvez avoir différents rôles (visiteur, utilisateur avec compte) selon votre statut. Les visiteurs accèdent aux informations disponibles sur la Plateforme et peuvent les consulter librement (Projets climatiques, actualités, Documents). Les utilisateurs avec comptes sont ceux qui se sont inscrit pour participer à la Plateforme par le téléversement d’informations et documents qui seront consultés par les visiteurs à la suite d’un contrôle réalisé par l’administrateur chargé de la gestion de la Plateforme.
                    </li>
                    <li> • Vous garantissez que les informations fournies lors de l’inscription sont exactes, complètes et à jour.
                    </li>
                </ul>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>

                    3. Comportement des utilisateurs
                </h3>

                Vous vous engagez à :
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>• Respecter la législation applicable (notamment en matière de droit d’auteur, diffamation, données personnelles)
                    </li>
                    <li>• Ne pas publier de contenus illégaux, injurieux, diffamatoires ou incitant à la haine
                    </li>
                    <li>  • Ne pas usurper l’identité d’un autre utilisateur
                    </li>
                    <li> • Ne pas attaquer la sécurité du site, tenter de pirater, injecter du code, spammer ou perturber les services
                    </li>
                    <li> • Respecter les espaces de discussion : modération, respect mutuel, pertinence
                    </li>
                </ul>
                Nous nous réservons le droit de supprimer tout contenu non conforme et de suspendre ou supprimer le compte d’un utilisateur fautif.

            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    4. Propriété intellectuelle
                </h3>
                <ul className='pl-7 space-y-3 mt-4'>
                    <li> • La Plateforme (textes, graphiques, cartes, données, code) sont protégés par le droit d’auteur et les droits de propriété intellectuelle.
                    </li>
                    <li>  • Vous conservez les droits sur les contenus que vous produisez (articles, projets climatiques, rapports), mais vous accordez à CCAP Initiative une licence non exclusive pour les utiliser et publier ces contenus dans le cadre des activités de la Plateforme.
                    </li>
                    <li>  • Vous ne devez pas reproduire ou redistribuer les contenus à des fins commerciales non autorisées.
                    </li>
                </ul>

            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    5. Liens externes et contenus tiers
                </h3>
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>   • La Plateforme peut inclure des liens vers des sites tiers. Nous ne contrôlons pas ces sites et ne pouvons garantir leur contenu ou leur conformité.
                    </li>
                    <li> • Vous êtes responsable de vérifier les politiques de ces sites lorsqu’ils sont utilisés.
                    </li>
                </ul>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    6. Responsabilité
                </h3>
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>  • Nous essayons de maintenir la Plateforme à jour, sécurisée et fiable, mais nous ne garantissons pas qu’elle sera exempte d’erreurs, interruptions ou virus.
                    </li>
                    <li> • En aucun cas, CCAP Initiative ou l’organisation porteuse ne pourra être tenue responsable des dommages directs, indirects, spéciaux ou consécutifs résultant de l’utilisation ou de l’impossibilité d’utiliser la Plateforme.
                    </li>
                    <li> • L’utilisateur assume les risques liés à la fiabilité des données fournies et leur usage.
                    </li>
                </ul>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    7. Modification des CGU
                </h3>
                <p>  Nous pouvons mettre à jour ces CGU à tout moment. Les modifications seront annoncées sur la Plateforme, et votre usage continu après modification constitue acceptation des nouvelles conditions.

                </p>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    8. Résiliation / suspension
                </h3>
                <p>
                    Nous pouvons suspendre ou supprimer votre compte, ou restreindre l’accès sans préavis en cas de violation grave des CGU. Vous pouvez également demander la suppression de votre compte à tout moment.
                </p>
            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    9. Dispositions générales
                </h3>
                <ul className='pl-7 space-y-3 mt-4'>
                    <li>    • Nullité partielle : si une disposition de ces CGU est jugée invalide, cela n’affecte pas la validité des autres.
                    </li>
                    <li> • Droit applicable : les CGU sont régies par les lois du Cameroun y compris la loi n°2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel.
                    </li>
                    <li>  • Litiges : tout différend relatif à l’interprétation ou l’exécution des CGU sera réglé à l’amiable. En l’absence d’accord, il sera porté devant les juridictions compétentes du Cameroun.
                    </li>
                    <li>  • L’utilisateur et les gestionnaires de la plateforme peuvent collaborer pour concevoir, rechercher des financements et mettre en œuvre des projets climatiques qui seront renseignés dans la plateforme, dans les conditions qu'ils fixeront spécifiquement.
                    </li>
                </ul>
            </div>

            <h2 className='text-2xl font-semibold mt-8 mb-4'>III. DE LA GESTION DES COOKIES</h2>

            <p> La présente section explique comment la Plateforme <strong>ccapinitiative.org</strong>  utilise les cookies et technologies similaires, et comment vous pouvez contrôler leur usage.

            </p>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    1. Qu’est-ce qu’un cookie ?

                </h3>
                <p>  Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site. Il contient des informations qui peuvent être lues lors de vos visites ultérieures.
                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    2. Types de cookies utilisés
                </h3>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Objectif</TableHead>
                            <TableHead>Exemples / usage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>  Cookies essentiels / strictement nécessaires
                            </TableCell>
                            <TableCell>  Maintenir votre session, sécurité, authentification
                            </TableCell>
                            <TableCell> Cookie de session (login), token d’accès
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Cookies de performance / analytiques
                            </TableCell>
                            <TableCell>    Collecter des données statistiques sur l’usage, améliorer le site
                            </TableCell>
                            <TableCell>    Mesurer pages visitées, temps passé, taux d’erreur
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Cookies fonctionnels / de préférence
                            </TableCell>
                            <TableCell>     Enregistrer vos choix (langue, filtres, préférences)
                            </TableCell>
                            <TableCell>   Cookie de langue, paramétrage utilisateur
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Cookies tiers / publicitaires (optionnels)
                            </TableCell>
                            <TableCell>  Usages analytiques externes ou outils externes (ex. Google Analytics)
                            </TableCell>
                            <TableCell>    Tracking anonymisé, outils de rapport externes
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </div>
            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    3. Consentement
                </h3>
                <p>  À votre première visite, un bandeau vous informera que le site utilise des cookies. Vous pourrez accepter ou refuser les cookies non essentiels. Les cookies essentiels sont toujours actifs.

                </p>
                <p> Vous pouvez modifier ou retirer votre consentement à tout moment via le lien “Paramètres des cookies” dans le pied de page.
                </p>
            </div>


            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    4. Gestion des cookies
                </h3>
                <p>

                    Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies (Chrome, Firefox, Safari, etc.). Toutefois, cela peut limiter certaines fonctionnalités du site.

                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    5. Cookies tiers
                </h3>
                <p>Nous pouvons permettre l’usage de cookies tiers (ex. services analytiques). Ces tiers sont tenus de respecter la confidentialité et les conditions que nous imposons.
                </p>
                <p>Nous ne contrôlons pas les cookies placés par des sites tiers, mais vous devez vérifier leurs politiques séparément.
                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    6. Conservation des cookies
                </h3>
                <p> Les cookies ont des durées de vie variées (session, persistent). Les cookies essentiels sont détruits à la fermeture de votre navigateur ; d’autres peuvent rester de quelques jours à plusieurs mois selon leur usage.
                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    7. Modifications
                </h3>
                <p>
                    Nous pouvons mettre à jour cette Politique des Cookies. Toute modification sera affichée ici avec une date de version. Votre utilisation continue constitue acceptation.

                </p>
            </div>

            <div className='mb-4 mt-5 space-y-4'>
                <h3 className='text-xl font-semibold mb-4'>
                    8. Contact
                </h3>
                <p> Pour toute question relative aux cookies ou à la protection de vos données, contactez-nous à : ccapinitiative@gmail.com
                </p>
            </div>




            <h2 className='text-2xl font-semibold mt-8 mb-4'> IV. MODALITES D’ADHESION A LA CHARTE</h2>
            <p>
                L’adhésion d’un utilisateur à la présente charte est matérialisée par la signature d’une autorisation de publication. Ce document est annexée à la présente charte et fait partie intégrante. Il porte l’entête de l’entité utilisatrice adhérant à la plateforme (logo, adresse,…).
            </p>
            <p>Par ce document, l’utilisateur donne l’autorisation au REPAC de publier les informations qu’ils téléversent et reconnait être responsable de leur fiabilité et de leur exactitude.
            </p>


        </main>
    )
}

export default CarteDeParticipation