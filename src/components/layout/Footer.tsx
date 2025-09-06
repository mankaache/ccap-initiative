
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
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
              Climate Change Action Platform promotes transparency and accountability 
              in climate finance and environmental initiatives across Cameroon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-background/80 hover:text-primary transition-colors">
                  About CCAP
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-background/80 hover:text-primary transition-colors">
                  Climate Projects
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-background/80 hover:text-primary transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-background/80 hover:text-primary transition-colors">
                  Climate Documents
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-background/80 hover:text-primary transition-colors">
                  Project Transparency
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">
                  Yaoundé, Cameroon
                </span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">
                  +237 XXX XXX XXX
                </span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">
                  info@ccap-cameroon.org
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-background/60 text-sm">
            © 2025 CCAP - Climate Change Action Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-background/60 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;