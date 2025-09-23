// lib/pdfMake.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// TS doesn't know one will always exist → assert it
pdfMake.vfs = (pdfFonts.pdfMake?.vfs ?? pdfFonts.vfs)!;

export default pdfMake;
