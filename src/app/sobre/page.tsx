import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça Martin Chao - engenheiro, criador de conteúdo e empreendedor.",
};

const experience = [
  {
    company: "Settle",
    role: "Founding Team",
    period: "Novembro 2024 - Presente",
    description: "Membro da equipe fundadora.",
  },
  {
    company: "Oliver Wyman",
    role: "Consultor",
    period: "Dezembro 2022 - Outubro 2024",
    description: "Consultoria de gestão estratégica.",
  },
  {
    company: "Pier",
    role: "Product Manager",
    period: "Janeiro 2021 - Novembro 2022",
    description: "Gerente de produto em insurtech.",
  },
  {
    company: "Vela",
    role: "Treinador de Vela",
    period: "Janeiro 2019 - Novembro 2019",
    description: "Treinador de equipes de vela competitiva.",
  },
];

const education = [
  {
    institution: "Universidade de São Paulo (USP)",
    degree: "Bacharelado em Engenharia de Produção",
  },
  {
    institution: "Colégio Santa Cruz",
    degree: "Ensino Médio",
  },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@martingchao",
    icon: FaYoutube,
    label: "YouTube",
    color: "text-red-500 hover:bg-red-50",
  },
  {
    href: "https://www.linkedin.com/in/martingarciachao/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "text-blue-600 hover:bg-blue-50",
  },
  {
    href: "https://github.com/martingchao",
    icon: FaGithub,
    label: "GitHub",
    color: "text-gray-800 hover:bg-gray-50",
  },
  {
    href: "https://martinchao.substack.com/",
    icon: SiSubstack,
    label: "Substack",
    color: "text-orange-500 hover:bg-orange-50",
  },
  {
    href: "#",
    icon: FaInstagram,
    label: "Instagram",
    color: "text-pink-500 hover:bg-pink-50",
  },
  {
    href: "#",
    icon: FaTiktok,
    label: "TikTok",
    color: "text-gray-800 hover:bg-gray-50",
  },
  {
    href: "#",
    icon: FaXTwitter,
    label: "X / Twitter",
    color: "text-gray-800 hover:bg-gray-50",
  },
];

export default function SobrePage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Bio */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
              MC
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Martin Chao
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Engenheiro de Produção formado pela USP, criador de conteúdo no
              YouTube e empreendedor. Apaixonado por finanças, tecnologia e
              construir coisas novas.
            </p>
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-secondary mb-8">
            Experiência
          </h2>
          <div className="space-y-6 mb-20">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="sm:w-48 shrink-0">
                  <p className="text-sm text-gray-400">{exp.period}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary">
                    {exp.company}
                  </h3>
                  <p className="text-primary font-medium">{exp.role}</p>
                  <p className="text-gray-500 mt-1">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-secondary mb-8">Educação</h2>
          <div className="space-y-4 mb-20">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-secondary">
                  {edu.institution}
                </h3>
                <p className="text-gray-500">{edu.degree}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Social Links */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-secondary mb-8">
            Redes Sociais
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 rounded-2xl border border-gray-100 transition-all duration-200 ${social.color}`}
              >
                <social.icon size={24} />
                <span className="font-medium text-secondary">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
