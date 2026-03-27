"use client";

import Image from "next/image";

import { useSitePreferences } from "@/components/providers/site-preferences";

type ServiceCard = {
  title: {
    no: string;
    en: string;
  };
  image: string;
  overlayImage: string;
};

const services: ServiceCard[] = [
  {
    title: {
      no: "Kampanjefilm",
      en: "Campaign film",
    },
    image: "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
    overlayImage: "/assets/visuals/cinematic/cinematic-video-camera-closeup.jpg",
  },
  {
    title: {
      no: "Brand stories",
      en: "Brand stories",
    },
    image: "/assets/visuals/section-images/section-film-crew-outdoors.jpg",
    overlayImage: "/assets/visuals/backgrounds/bg-studio-light.jpg",
  },
  {
    title: {
      no: "SoMe-systemer",
      en: "Social systems",
    },
    image: "/assets/visuals/cinematic/cinematic-camera-darkroom.jpg",
    overlayImage: "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
  },
  {
    title: {
      no: "Lansering og distribusjon",
      en: "Launch and distribution",
    },
    image: "/assets/visuals/cinematic/cinematic-video-camera-closeup.jpg",
    overlayImage: "/assets/visuals/section-images/section-film-crew-outdoors.jpg",
  },
];

export default function ServicesSection() {
  const { language } = useSitePreferences();

  return (
    <section className="section-space pt-0">
      <div className="site-container">
        <div className="glass-panel rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {language === "no" ? "Videre samarbeid" : "Next step"}
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
              {language === "no" ? "Hvordan kan vi hjelpe?" : "How can we help?"}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted-2)] sm:text-lg">
              {language === "no"
                ? "Fra kampanjefilm til innholdsløp og lanseringer som bygger videre på arbeidet dere ser her."
                : "From campaign films to content systems and launches that build on the work you see here."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6">
            {services.map((service) => (
              <article
                key={service.title.en}
                className="group relative overflow-hidden rounded-[1.9rem] border border-[color:var(--line)]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_18px_48px_rgba(18,14,10,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)] opacity-70" />
                <div className="relative mb-5 flex h-[17rem] items-center justify-center overflow-hidden rounded-[1.45rem] border border-[color:var(--line)]/70 bg-[#0b0d12] sm:h-[18rem]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                  <div className="relative h-full w-full">
                    <div className="absolute left-[10%] top-[14%] h-[68%] w-[52%] overflow-hidden rounded-[1.15rem] border border-white/10 shadow-[0_18px_36px_rgba(0,0,0,0.26)] transition duration-300 group-hover:-rotate-[8deg] group-hover:scale-[1.03]">
                      <Image
                        src={service.image}
                        alt={`${service.title[language]} base`}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 88vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute right-[12%] top-[18%] h-[68%] w-[52%] overflow-hidden rounded-[1.15rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.28)] transition duration-300 group-hover:rotate-[7deg] group-hover:scale-[1.03]">
                      <Image
                        src={service.overlayImage}
                        alt={`${service.title[language]} overlay`}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 88vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="relative text-left text-[1.02rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-[1.08rem]">
                  {service.title[language]}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
