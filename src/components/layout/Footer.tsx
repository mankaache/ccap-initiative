"use client";
import { useTranslation } from "@/hooks/useTranslation";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import flag from "@/assets/Nepac.jpg";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-hero text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
                  CCAP
                </div>
                <span className="ml-3 text-sm text-muted-foreground hidden sm:block">
                  {/* {t('header.tagline')} */}
                </span>
              </div>
            </Link>
            <p className="text-background/80 mb-6 max-w-md">
              {t("footer.title")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-7">
              <h2 className=" text-background mb-3 capitalize">
                {t("about.foundersTitle")}
              </h2>
              <div className="flex items-center flex-wrap gap-4 ">
                <div className="relative text-center w-16 h-16 rounded-full ">
                  <Image
                    src={flag}
                    fill
                    alt="Climate action in Cameroon"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* <div className="relative text-center w-12 h-12 rounded-full ">
                  <Image
                    src={said}
                    fill
                    alt="Climate action in Cameroon"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="relative">
                  <Image
                    src={gda}
                    alt="Climate action in Cameroon"
                    className=" h-20 w-40"
                  />
                </div> */}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">
              {t("footer.quick")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {t("footer.climate")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news/national"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {t("footer.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/national"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {t("footer.doc")}
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/Comment utiliser CCAP.pdf"
                  download={true}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {t("footer.trans")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">1087 rue Mengue Tsogo Elig Essono district, 
                  <br />11955 Yaoundé – Cameroon</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">+237 222 234 945 / +237 696 666 132</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">info@agroecology-cmr.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-background/60 text-sm">
            © 2025 CCAP - Plateforme d'action contre le changement climatique. Tous droits réservés..
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-background/60 hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-background/60 hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
            {/* <Link href="/contact" className="text-background/60 hover:text-primary transition-colors">
              Contact
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
