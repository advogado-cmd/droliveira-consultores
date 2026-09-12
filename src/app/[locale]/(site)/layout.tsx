import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import FloatingActions from "@/components/FloatingActions";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-navy">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </>
  );
}
