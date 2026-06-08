"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, Globe2, Headphones, ShoppingBag, Star } from "lucide-react";

import authorPhoto from "@/src/assets/en/author.png";
import bookCover from "@/src/assets/en/ebook-bg.jpeg";

const digitalLinks = [
  ["🌐", "Read Book + Audiobook", "English edition • Instant access", "https://www.gilberto-souza.com/en"],
  ["🌎", "Leer Libro + Audiolibro", "Spanish edition • Instant access", "https://www.gilberto-souza.com/es"],
  ["🇧🇷", "Ler Livro + Audiobook", "Portuguese edition • Instant access", "https://www.gilberto-souza.com"],
];

const amazonLinks = [
  ["🇺🇸", "Amazon", "English paperback", "https://www.amazon.com/dp/B0H2LXHCH4"],
  ["🇪🇸", "Amazon", "Spanish paperback", "https://www.amazon.com/dp/B0H2LHZT7X"],
  ["🇧🇷", "Amazon", "Portuguese paperback", "https://www.amazon.com/dp/B0H2LM4TXH"],
];

const barnesLinks = [
  ["🇺🇸", "Barnes & Noble", "English edition", "https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504"],
  ["🇪🇸", "Barnes & Noble", "Spanish edition", "https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050"],
  ["🇧🇷", "Barnes & Noble", "Portuguese edition", "https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542"],
];

function LinkButton({ item, small = false }) {
  return (
    <a className={small ? "retailCard" : "mainButton"} href={item[3]} target="_blank" rel="noopener noreferrer">
      <span className="icon">{item[0]}</span>
      <span className="linkText">
        <strong>{item[1]}</strong>
        <small>{item[2]}</small>
      </span>
      <ArrowUpRight className="arrow" />
    </a>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="sectionTitle">
      <span />
      <h2>{children}</h2>
      <span />
    </div>
  );
}

export default function LinksPage() {
  return (
    <main className="linksPage">
      <section className="hero">
        <div className="authorWrap">
          <Image src={authorPhoto} alt="Gilberto Souza" className="authorImg" priority />
        </div>

        <div className="heroText">
          <p className="name">Gilberto Souza</p>
          <p className="role">Author</p>

          <h1>
            She chose <br />
            someone else. <br />
            <span>I wrote about what happened next.</span>
          </h1>

          <p className="subtitle">
            A book for the man who was replaced, betrayed, rejected — and is ready to get back up.
          </p>

          <div className="formats">
            <span><BookOpen size={18} /> Ebook</span>
            <span><Headphones size={18} /> Audiobook</span>
            <span><ShoppingBag size={18} /> Paperback</span>
          </div>
        </div>

        <div className="bookWrap">
          <Image src={bookCover} alt="Gilberto Souza book" className="bookImg" priority />
        </div>
      </section>

      <section className="content">
        <SectionTitle>Read The Book + Audiobook</SectionTitle>

        <div className="mainLinks">
          {digitalLinks.map((item) => <LinkButton key={item[3]} item={item} />)}
        </div>

        <SectionTitle>Paperback — Amazon</SectionTitle>

        <div className="retailGrid">
          {amazonLinks.map((item) => <LinkButton key={item[3]} item={item} small />)}
        </div>

        <SectionTitle>Paperback — Barnes & Noble</SectionTitle>

        <div className="retailGrid">
          {barnesLinks.map((item) => <LinkButton key={item[3]} item={item} small />)}
        </div>

        <div className="quote">
          <div className="stars">
            {[1,2,3,4,5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
          </div>
          <p>“I didn’t write this book because I had all the answers. I wrote it because I was trying to survive the pain myself.”</p>
          <strong>— Gilberto Souza</strong>
        </div>

        <footer>
          <span><Globe2 size={18} /> Available worldwide</span>
          <span><BookOpen size={18} /> Ebook • Audiobook • Paperback</span>
          <span>Gilberto Souza • Author</span>
        </footer>
      </section>

      <style jsx>{`
        .linksPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 10%, rgba(56,189,248,.22), transparent 32%),
            radial-gradient(circle at 90% 12%, rgba(14,165,233,.16), transparent 30%),
            linear-gradient(180deg, #f8fcff 0%, #eef8ff 48%, #ffffff 100%);
          color: #08162d;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 64px 28px 52px;
          display: grid;
          grid-template-columns: 0.9fr 1.25fr 0.95fr;
          gap: 42px;
          align-items: center;
        }

        .authorWrap, .bookWrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .authorImg {
          width: 100%;
          max-width: 310px;
          height: auto;
          border-radius: 34px;
          box-shadow: 0 35px 90px rgba(15, 23, 42, .18);
          object-fit: cover;
        }

        .bookImg {
          width: 100%;
          max-width: 310px;
          height: auto;
          filter: drop-shadow(0 34px 44px rgba(14, 165, 233, .25));
        }

        .heroText {
          text-align: center;
        }

        .name {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: .5em;
          font-size: 15px;
          font-weight: 900;
        }

        .role {
          margin: 14px 0 0;
          text-transform: uppercase;
          letter-spacing: .32em;
          font-size: 12px;
          font-weight: 800;
          color: #0284c7;
        }

        .heroText h1 {
          margin: 34px 0 0;
          font-family: Georgia, serif;
          font-size: clamp(42px, 5vw, 72px);
          line-height: .98;
          letter-spacing: -0.04em;
          color: #061126;
        }

        .heroText h1 span {
          color: #149ee7;
        }

        .subtitle {
          max-width: 560px;
          margin: 28px auto 0;
          font-size: 19px;
          line-height: 1.7;
          color: #334155;
        }

        .formats {
          margin-top: 28px;
          display: flex;
          justify-content: center;
          gap: 22px;
          flex-wrap: wrap;
          text-transform: uppercase;
          letter-spacing: .14em;
          font-size: 12px;
          font-weight: 800;
          color: #0f2748;
        }

        .formats span, footer span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 0 22px 56px;
        }

        .sectionTitle {
          margin: 38px 0 26px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .sectionTitle span {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, transparent, #7dd3fc, transparent);
        }

        .sectionTitle h2 {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: .3em;
          font-size: 13px;
          font-weight: 950;
          color: #08162d;
          text-align: center;
        }

        .mainLinks {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }

        .mainButton, .retailCard {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 18px;
          border: 1px solid rgba(14, 165, 233, .22);
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          box-shadow: 0 18px 54px rgba(15, 23, 42, .09);
          transition: .25s ease;
          color: #08162d;
        }

        .mainButton {
          padding: 20px 24px;
        }

        .retailCard {
          padding: 20px;
        }

        .mainButton:hover, .retailCard:hover {
          transform: translateY(-4px);
          border-color: rgba(14, 165, 233, .65);
          box-shadow: 0 24px 70px rgba(14, 165, 233, .18);
        }

        .icon {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: #eff9ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          flex: 0 0 auto;
        }

        .linkText {
          display: grid;
          gap: 5px;
          flex: 1;
          min-width: 0;
        }

        .linkText strong {
          font-size: 19px;
          line-height: 1.2;
        }

        .linkText small {
          text-transform: uppercase;
          letter-spacing: .16em;
          color: #0284c7;
          font-size: 11px;
          font-weight: 900;
        }

        .arrow {
          color: #0284c7;
          flex: 0 0 auto;
        }

        .retailGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .quote {
          margin-top: 44px;
          border: 1px solid rgba(14,165,233,.18);
          background: linear-gradient(135deg, rgba(240,249,255,.95), rgba(255,255,255,.92));
          border-radius: 28px;
          padding: 40px 28px;
          text-align: center;
          box-shadow: 0 18px 60px rgba(15, 23, 42, .08);
        }

        .stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          color: #0284c7;
        }

        .quote p {
          max-width: 760px;
          margin: 22px auto 0;
          font-family: Georgia, serif;
          font-size: 25px;
          line-height: 1.6;
          color: #08162d;
        }

        .quote strong {
          display: block;
          margin-top: 22px;
          text-transform: uppercase;
          letter-spacing: .22em;
          color: #0284c7;
          font-size: 12px;
        }

        footer {
          margin-top: 34px;
          padding-top: 24px;
          border-top: 1px solid rgba(14,165,233,.16);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: .14em;
          font-size: 11px;
          font-weight: 850;
          color: #475569;
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding-top: 34px;
            gap: 24px;
          }

          .authorWrap {
            order: 2;
          }

          .heroText {
            order: 1;
          }

          .bookWrap {
            order: 3;
          }

          .authorImg {
            max-width: 220px;
            border-radius: 28px;
          }

          .bookImg {
            max-width: 230px;
          }

          .retailGrid {
            grid-template-columns: 1fr;
          }

          footer {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .hero {
            padding: 28px 18px 34px;
          }

          .name {
            font-size: 12px;
            letter-spacing: .36em;
          }

          .heroText h1 {
            font-size: 43px;
          }

          .subtitle {
            font-size: 16px;
          }

          .sectionTitle h2 {
            font-size: 11px;
            letter-spacing: .2em;
          }

          .mainButton, .retailCard {
            padding: 17px;
            border-radius: 20px;
          }

          .icon {
            width: 48px;
            height: 48px;
            font-size: 26px;
          }

          .linkText strong {
            font-size: 16px;
          }

          .linkText small {
            font-size: 10px;
          }

          .quote p {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  );
}
