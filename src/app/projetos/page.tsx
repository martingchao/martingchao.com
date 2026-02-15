import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos pessoais de Martin Chao - websites e aplicações.",
};

export default function ProjetosPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">
            Projetos
          </h1>
          <p className="text-gray-500 text-center text-lg mb-16 max-w-2xl mx-auto">
            Websites e aplicações que estou construindo.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center py-20">
            <p className="text-6xl mb-6">🚀</p>
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              Em breve novos projetos!
            </h2>
            <p className="text-gray-500">
              Estou trabalhando em alguns projetos interessantes. Volte em breve
              para conferir.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
