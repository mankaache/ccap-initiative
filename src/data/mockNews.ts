import image from "@/assets/vegetation.jpg";
import { StaticImageData } from "next/image";


export interface InewType {
  id: string | number;
  type: "text" | "pdf";
  content?: string | null;
  document: string | null;
  title: string;
  date: string;
  image: StaticImageData;
  category: string;
  link?:string;
  source: string;
  author?:string;
  description:string;
}


export const mockNews: Record<string, InewType[]> = {
  regional: [],
  national: [
    {
      id: '1',
      type: "pdf",
      document: "/art1.pdf",
      description:"Ce texte juridique fondamental au Cameroun est celui qui fixe les règles générales pour la protection de l'environnement et la gestion durable de ses ressources, et est un patrimoine commun national.",
      title:
        "LOI N°96/12 DU 5 août 1996 PORTANT LOI-CADRE RELATIVE À LA GESTION DE L’ENVIRONNEMENT",
      content:null,
      date: "2012-03-14",
      image: image,
      category: "National",
      source: "MINEDEP",
    },
    {
      id: '2',
      source: "L’ONACC ",
      type: "text",
      document: null,
      title: "Cadre institutionnel sur le changement climatique au Cameroun",
      description:
        "L’ONACC crée le 10 déc. 2009, collecter, traiter et diffuser l’information sur l’évolution du Climat ",
      date: "2024-03-11",
      image: image,
      category: "National",
    },
  ],
};