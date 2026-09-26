import { whatsapp } from "@/lib/site";
import { WhatsApp } from "./icons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsapp("Olá! Vim pelo site da Valenza Motors.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-[1.7rem] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-300 hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsApp />
    </a>
  );
}
