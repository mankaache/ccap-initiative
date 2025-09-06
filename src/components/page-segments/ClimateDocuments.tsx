"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Eye, Search, FileText, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";

const ClimateDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated] = useState(false);

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
        author: "CGLU",
        language: "French",
        document:
          "/documents/international/Compte-rendu-COP-26-Glasgow-2021.pdf",
      },
      {
        id: 3,
        title:
          "Conférence sur les changements climatiques (COP 24) à Katowice ",
        description:
          "La  conférence  sur  les  changements  climatiques  (COP 24)  qui  aura  lieu  à  Katowice,  en  Pologne,  du  3  au  14 décembre 2018, se concentrera sur la mise en œuvre complète de l’accord de Paris et sur la phase politique du dialogue de Talanoa, visant à soutenir la mise en œuvre des engagements nationaux.",
        type: "Conference",
        pages: 2,
        size: "2.3 MB",
        date: "2024-02-15",
        restricted: true,
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

        author: "REDD+",
        language: "French",
        document: "/documents/national/strategie nationale REDD+.pdf",
      },
    ],
  };

  const { category } = useParams<{ category: string }>();
  // const  isAuthenticated  = false;
  const documents = mockDocuments[category as keyof typeof mockDocuments] || [];

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "international":
        return "International Policy Documents";
      case "regulation":
        return "Regulation Documents";
      case "national":
        return "National Policy Documents";
      default:
        return "Climate Documents";
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    // doc.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-80 py-5 bg-gradient-to-r flex flex-col justify-center items-center gap-3 from-secondary via-primary/80 to-secondary">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {getCategoryTitle(category || "")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Access comprehensive climate policy and regulatory documents
          </p>
        </div>{" "}
      </div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-4 w-full"
            />
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocuments.map((document, index) => (
              <Card
                key={document.id}
                className="border-border bg-gradient-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getDocumentTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-1" />
                      {document.pages} pages
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                    {document.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {document.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Organization:
                      </span>
                      {/* <span className="font-medium text-foreground">{document.organization}</span> */}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Published:</span>
                      <span className="text-foreground">
                        {formatDate(document.date)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="text-foreground">{document.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/documents/${category}/${document.id}`}
                      className="flex items-center px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>

                    {document.restricted && !isAuthenticated ? (
                      <button
                        disabled
                        className="flex items-center px-3 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed text-sm"
                      >
                        <Lock className="h-4 w-4 mr-1" />
                        Login to Download
                      </button>
                    ) : (
                      <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm">
                        <a href={document.document} download className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </button>
                    )}
                  </div>

                  {!isAuthenticated && (
                    <p className="text-xs text-red-600 text-center mt-2">
                      <Lock className="h-3 w-3 inline mr-1" />
                      login to download this document
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No documents found matching your search criteria.
              </p>
            </div>
          )}

          {filteredDocuments.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Documents
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClimateDocuments;
