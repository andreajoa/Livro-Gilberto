import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Headphones,
  Globe2,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import bookCover from "@/src/assets/book-front.jpg";
import authorPhoto from "@/src/assets/author/gilberto-perfil.jpeg";

export const metadata = {
  title: "Gilberto Souza | Official Book Links",
  description:
    "Official links to Gilberto Souza's book. Available in English, Spanish and Portuguese. Ebook, Audiobook and Paperback.",
};

const digitalLinks = [
  {
    label: "Read the Book + Audiobook",
    detail: "English edition • Instant access",
    href: "https://www.gilberto-souza.com/en",
    icon: "🌐",
    featured: true,
  },
  {
    label: "Leer Libro + Audiolibro",
    detail: "Spanish edition • Acceso inmediato",
    href: "https://www.gilberto-souza.com/es",
    icon: "🌎",
  },
  {
    label: "Ler Livro + Audiobook",
    detail: "Portuguese edition • Acesso imediato",
    href: "https://www.gilberto-souza.com",
    icon: "🇧🇷",
  },
];

const amazonLinks = [
  {
    label: "Amazon",
    detail: "English paperback",
    href: "https://www.amazon.com/dp/B0H2LXHCH4",
    flag: "🇺🇸",
  },
  {
    label: "Amazon",
    detail: "Spanish paperback",
    href: "https://www.amazon.com/dp/B0H2LHZT7X",
    flag: "🇪🇸",
  },
  {
    label: "Amazon",
    detail: "Portuguese paperback",
    href: "https://www.amazon.com/dp/B0H2LM4TXH",
    flag: "🇧🇷",
  },
];

const barnesLinks = [
  {
    label: "Barnes & Noble",
    detail: "English edition",
    href: "https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504",
    flag: "🇺🇸",
  },
  {
    label: "Barnes & Noble",
    detail: "Spanish edition",
    href: "https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050",
    flag: "🇪🇸",
  },
  {
    label: "Barnes & Noble",
    detail: "Portuguese edition",
    href: "https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542",
    flag: "🇧🇷",
  },
];

function MainButton({ item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-3xl border bg-white/85 px-5 py-5 shadow-[0_18px_50px_rgba(13,42,85,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-[0_22px_70px_rgba(14,165,233,0.22)] ${
        item.featured ? "border-sky-300 ring-1 ring-sky-100" : "border-slate-200"
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-3xl ring-1 ring-sky-100">
        {item.icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-lg font-semibold tracking-tight text-slate-950">
          {item.label}
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
          {item.detail}
        </p>
      </div>

      <ArrowUpRight className="h-6 w-6 text-sky-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function RetailButton({ item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 shadow-[0_14px_40px_rgba(13,42,85,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-[0_18px_55px_rgba(14,165,233,0.18)]"
    >
      <div className="text-4xl">{item.flag}</div>
      <div className="flex-1">
        <p className="text-lg font-bold text-slate-950">{item.label}</p>
        <p className="text-sm text-slate-600">{item.detail}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-sky-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="my-10 flex items-center gap-5">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-200 to-sky-200" />
      <h2 className="text-center text-xs font-black uppercase tracking-[0.34em] text-slate-900">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-sky-200 to-sky-200" />
    </div>
  );
}

export default function LinksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-18%] top-[-10%] h-[520px] w-[520px] rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute right-[-14%] top-[8%] h-[480px] w-[480px] rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[20%] h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr_0.9fr]">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="relative h-[330px] w-[250px] sm:h-[390px] sm:w-[295px]">
              <div className="absolute inset-0 rounded-[2rem] bg-sky-300/30 blur-3xl" />
              <Image
                src={authorPhoto}
                alt="Gilberto Souza"
                fill
                priority
                className="rounded-[2rem] object-cover object-top shadow-[0_30px_90px_rgba(15,23,42,0.20)]"
              />
            </div>
          </div>

          <div className="order-1 text-center lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.55em] text-slate-900">
              Gilberto Souza
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.34em] text-sky-600">
              Author
            </p>

            <div className="mx-auto mt-5 h-px w-16 bg-sky-400" />

            <h1 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-slate-950 sm:text-6xl">
              She chose
              <br />
              someone else.
              <br />
              <span className="text-sky-500">
                I wrote about
                <br />
                what happened next.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-slate-650">
              A book for the man who was replaced, rejected, betrayed — and is
              ready to get back up.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-sky-500" /> Ebook
              </span>
              <span className="h-5 w-px bg-slate-300" />
              <span className="inline-flex items-center gap-2">
                <Headphones className="h-5 w-5 text-sky-500" /> Audiobook
              </span>
              <span className="h-5 w-px bg-slate-300" />
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-sky-500" /> Paperback
              </span>
            </div>
          </div>

          <div className="order-3 flex justify-center lg:justify-end">
            <div className="relative h-[330px] w-[245px] sm:h-[390px] sm:w-[290px]">
              <div className="absolute inset-0 translate-y-6 rounded-[2rem] bg-sky-300/35 blur-3xl" />
              <Image
                src={bookCover}
                alt="How to Overcome the Pain of Being Replaced by Someone Else"
                fill
                priority
                className="object-contain drop-shadow-[0_35px_55px_rgba(2,132,199,0.26)]"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-sky-100 bg-white/70 p-4 shadow-[0_18px_70px_rgba(13,42,85,0.08)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-sm font-semibold text-slate-700">
            <Sparkles className="h-5 w-5 text-sky-500" />
            Official links only • Available worldwide • Instant digital access
          </div>
        </div>

        <SectionTitle>Read The Book + Audiobook</SectionTitle>

        <div className="mx-auto grid max-w-3xl gap-5">
          {digitalLinks.map((item) => (
            <MainButton key={item.href} item={item} />
          ))}
        </div>

        <SectionTitle>Paperback — Amazon</SectionTitle>

        <div className="grid gap-5 md:grid-cols-3">
          {amazonLinks.map((item) => (
            <RetailButton key={item.href} item={item} />
          ))}
        </div>

        <SectionTitle>Paperback — Barnes & Noble</SectionTitle>

        <div className="grid gap-5 md:grid-cols-3">
          {barnesLinks.map((item) => (
            <RetailButton key={item.href} item={item} />
          ))}
        </div>

        <section className="mt-12 overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 text-center shadow-[0_18px_70px_rgba(13,42,85,0.08)] sm:p-12">
          <div className="mx-auto flex justify-center gap-1 text-sky-500">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>

          <p className="mx-auto mt-6 max-w-3xl font-serif text-2xl leading-10 text-slate-900 sm:text-3xl">
            “I didn’t write this book because I had all the answers. I wrote it
            because I was trying to survive the pain myself.”
          </p>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-sky-600">
            — Gilberto Souza
          </p>
        </section>

        <footer className="mt-12 grid gap-6 border-t border-sky-100 pt-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500 md:grid-cols-3">
          <div className="flex items-center justify-center gap-3">
            <Globe2 className="h-5 w-5 text-sky-500" />
            Available worldwide
          </div>
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="h-5 w-5 text-sky-500" />
            Ebook • Audiobook • Paperback
          </div>
          <div className="text-sky-600">Gilberto Souza • Author</div>
        </footer>
      </section>
    </main>
  );
}
