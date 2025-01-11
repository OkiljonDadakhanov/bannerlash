import { BannerEditor } from "@/components/banner-editor";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-end">
          <Button variant="ghost" className="text-white">
            Bannerla
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            O`zingizga{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              moslashtirilgan
            </span>{" "}
            ijtimoiy banneringizni yarating.
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300">
            Professionallar uchun.
          </p>
        </div>
        <BannerEditor />
      </main>
    </div>
  );
}
