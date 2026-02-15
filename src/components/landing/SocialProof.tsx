import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const highlights = [
  {
    icon: FaYoutube,
    label: "YouTube",
    description: "Conteúdo sobre finanças e tecnologia",
    href: "https://www.youtube.com/@martingchao",
    color: "text-red-500",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    description: "Networking e experiência profissional",
    href: "https://www.linkedin.com/in/martingarciachao/",
    color: "text-blue-600",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    description: "Projetos open source e código",
    href: "https://github.com/martingchao",
    color: "text-gray-800",
  },
  {
    icon: SiSubstack,
    label: "Substack",
    description: "Newsletter sobre negócios e tech",
    href: "https://martinchao.substack.com/",
    color: "text-orange-500",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-secondary">
            Me acompanhe
          </h2>
          <p className="text-gray-500 text-center text-lg mb-16 max-w-2xl mx-auto">
            Conteúdo sobre finanças, tecnologia, negócios e muito mais.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <AnimatedSection key={item.label} delay={index * 0.1}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <item.icon className={`mx-auto mb-4 ${item.color}`} size={40} />
                <h3 className="text-lg font-semibold text-secondary mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
