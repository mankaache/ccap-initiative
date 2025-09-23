// types/pdfmake-vfs.d.ts
declare module "pdfmake/build/vfs_fonts" {
  const pdfFonts: {
    pdfMake?: { vfs: { [filename: string]: string } };
    vfs?: { [filename: string]: string };
  };
  export default pdfFonts;
}
