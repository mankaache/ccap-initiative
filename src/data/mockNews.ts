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
  national: [],
};