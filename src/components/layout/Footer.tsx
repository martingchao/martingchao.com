import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

const socialLinks = [
  {
    href: "https://www.youtube.com/@martingchao",
    icon: FaYoutube,
    label: "YouTube",
    color: "hover:text-red-500",
  },
  {
    href: "https://www.linkedin.com/in/martingarciachao/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
  {
    href: "https://github.com/martingchao",
    icon: FaGithub,
    label: "GitHub",
    color: "hover:text-gray-900",
  },
  {
    href: "https://martinchao.substack.com/",
    icon: SiSubstack,
    label: "Substack",
    color: "hover:text-orange-500",
  },
  {
    href: "#",
    icon: FaInstagram,
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    href: "#",
    icon: FaTiktok,
    label: "TikTok",
    color: "hover:text-gray-900",
  },
  {
    href: "#",
    icon: FaXTwitter,
    label: "X / Twitter",
    color: "hover:text-gray-900",
  },
];

export default function Footer() {
  return (
    <footer className="bg-accent border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Martin Chao. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
