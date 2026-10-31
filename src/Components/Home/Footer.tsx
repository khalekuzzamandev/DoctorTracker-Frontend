"use client"
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';
import { usePathname } from 'next/navigation';

const Footer = () => {
   const pathname = usePathname()
    if (pathname.includes('dashboard')) {
      return null
    }
  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">

        {/* Brand */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="DoctorTraker Logo"
              width={55}
              height={55}
              className="object-contain"
            />

            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Doctor<span className="text-blue-500">Traker</span>
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
                Healthcare Management
              </p>
            </div>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Simplifying healthcare management with smart technology.
            Manage doctors, organize patient records, and make healthcare
            administration easier.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: FaFacebook, href: 'https://facebook.com' },
              { icon: FaGithub, href: 'https://github.com' },
              { icon: LiaLinkedin, href: 'https://linkedin.com' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Social media"
                className="rounded-xl border border-slate-800 p-3 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <social.icon size={19} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              ['Home', '/'],
              ['About Us', '/about'],
              ['Doctors', '/doctors'],
              ['Patients', '/patients'],
              ['Contact', '/contact'],
            ].map(([name, href]) => (
              <li key={name}>
                <Link
                  href={href}
                  className="flex items-center gap-2 transition hover:translate-x-1 hover:text-blue-400"
                >
                  <ArrowRight size={14} className="text-blue-500" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Our Services
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              'Doctor Management',
              'Patient Management',
              'Medical Records',
              'Healthcare Dashboard',
              'Secure Administration',
            ].map((service) => (
              <li key={service} className="flex items-center gap-2">
                <Heart size={14} className="text-blue-500" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Get In Touch
          </h3>

          <div className="space-y-5 text-sm">

            <div className="flex items-start gap-3">
              <Mail className="shrink-0 text-blue-500" size={19} />
              <span>support@doctortraker.com</span>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="shrink-0 text-blue-500" size={19} />
              <span>+880 1XXXXXXXXX</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="shrink-0 text-blue-500" size={19} />
              <span>Bangladesh</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm sm:flex-row lg:px-12">

          <p className="text-slate-400">
            © DoctorTraker. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-blue-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-blue-400">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
