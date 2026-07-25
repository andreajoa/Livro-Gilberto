import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const projectRoot =
  process.cwd()

const outputDirectory =
  process.env.SUPERACAO_PREVIEW_DIR ||
  "/tmp/superacao-email-previews"

const templatePath =
  path.join(
    projectRoot,
    "src/lib/email/superacaoMarketingTemplates.js"
  )

const assetSourceDirectory =
  path.join(
    projectRoot,
    "public/images/superacao/email"
  )

const assetPreviewDirectory =
  path.join(
    outputDirectory,
    "assets"
  )

const temporaryModule =
  "/tmp/superacaoMarketingTemplates-preview.mjs"

const siteUrl =
  "https://www.gilberto-souza.com"

const assetNames = [
  "banner-apresentacao.jpg",
  "banner-historia.jpg",
  "banner-amazon-fisico.jpg",
  "banner-amazon-ebook.jpg",
  "banner-website-fisico.jpg",
  "banner-recomeco.jpg",
  "instagram.png",
]

const sourceCode =
  await fs.readFile(
    templatePath,
    "utf8"
  )

await fs.writeFile(
  temporaryModule,
  sourceCode,
  "utf8"
)

const moduleUrl =
  pathToFileURL(
    temporaryModule
  ).href + `?v=${Date.now()}`

const templateModule =
  await import(moduleUrl)

const {
  getSuperacaoEmailHtml,
  getSuperacaoEmailSubject,
} = templateModule

if (
  typeof getSuperacaoEmailHtml !== "function" ||
  typeof getSuperacaoEmailSubject !== "function"
) {
  throw new Error(
    "Funções de Superação não disponíveis."
  )
}

const sequences = [
  {
    group: "Nutrição",
    code: "superacao_lead_pt",
    count: 15,
    productType: "general",
    prefix: "lead",
  },
  {
    group: "Abandono — livro físico",
    code: "superacao_checkout_physical_pt",
    count: 8,
    productType: "physical",
    prefix: "checkout-fisico",
  },
  {
    group: "Abandono — eBook",
    code: "superacao_checkout_digital_pt",
    count: 8,
    productType: "digital",
    prefix: "checkout-ebook",
  },
  {
    group: "Pós-compra — eBook",
    code: "superacao_customer_digital_pt",
    count: 3,
    productType: "digital",
    prefix: "cliente-ebook",
  },
]

await fs.rm(
  outputDirectory,
  {
    recursive: true,
    force: true,
  }
)

await fs.mkdir(
  assetPreviewDirectory,
  {
    recursive: true,
  }
)

for (const assetName of assetNames) {
  await fs.copyFile(
    path.join(
      assetSourceDirectory,
      assetName
    ),
    path.join(
      assetPreviewDirectory,
      assetName
    )
  )
}

function localizeAssets(html) {
  let localized = html

  for (const assetName of assetNames) {
    localized = localized.replaceAll(
      `${siteUrl}/images/superacao/email/${assetName}`,
      `./assets/${assetName}`
    )
  }

  return localized
}

const cards = []

let globalNumber = 0

for (const sequence of sequences) {
  for (
    let emailNumber = 1;
    emailNumber <= sequence.count;
    emailNumber += 1
  ) {
    globalNumber += 1

    const subject =
      getSuperacaoEmailSubject({
        sequenceCode:
          sequence.code,
        emailNumber,
      })

    const productionHtml =
      getSuperacaoEmailHtml({
        sequenceCode:
          sequence.code,
        emailNumber,
        name: "Andrea",
        email:
          "preview-superacao@example.com",
        productType:
          sequence.productType,
      })

    const previewHtml =
      localizeAssets(
        productionHtml
      )

    const filename =
      `${String(globalNumber).padStart(2, "0")}-` +
      `${sequence.prefix}-` +
      `${String(emailNumber).padStart(2, "0")}.html`

    await fs.writeFile(
      path.join(
        outputDirectory,
        filename
      ),
      previewHtml,
      "utf8"
    )

    cards.push({
      filename,
      group: sequence.group,
      emailNumber,
      subject,
    })

    console.log(
      `OK: ${filename}`
    )
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

const cardsHtml =
  cards
    .map(
      (card) => `
        <a
          class="card"
          href="./${escapeHtml(card.filename)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            ${escapeHtml(card.group)}
          </span>

          <strong>
            ${card.emailNumber}.
            ${escapeHtml(card.subject)}
          </strong>

          <small>
            Abrir preview
          </small>
        </a>
      `
    )
    .join("")

const indexHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">

    <meta
      name="viewport"
      content="width=device-width,initial-scale=1"
    >

    <title>
      Previews — Superação
    </title>

    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #F5E9D8;
        color: #18130E;
        font-family: Arial, sans-serif;
      }

      header {
        padding: 54px 24px;
        background: #090806;
        color: #FFF6E7;
        text-align: center;
      }

      header h1 {
        margin: 0 0 10px;
        font-family: Georgia, serif;
        font-size: 58px;
        font-weight: 400;
      }

      header p {
        margin: 0;
        color: #B9AA98;
        line-height: 1.6;
      }

      main {
        width: min(
          1120px,
          calc(100% - 32px)
        );
        margin: 36px auto 70px;
        display: grid;
        grid-template-columns:
          repeat(
            auto-fit,
            minmax(280px, 1fr)
          );
        gap: 16px;
      }

      .card {
        min-height: 170px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        color: #18130E;
        background: #FFF6E7;
        border: 1px solid #E3CDAE;
        border-radius: 16px;
        text-decoration: none;
        box-shadow:
          0 12px 30px
          rgba(33, 21, 10, 0.08);
      }

      .card span {
        color: #9B6942;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .card strong {
        font-family: Georgia, serif;
        font-size: 21px;
        font-weight: 400;
        line-height: 1.35;
      }

      .card small {
        margin-top: auto;
        color: #817465;
      }
    </style>
  </head>

  <body>
    <header>
      <h1>
        Superação
      </h1>

      <p>
        26 textos únicos<br>
        34 combinações visuais
      </p>
    </header>

    <main>
      ${cardsHtml}
    </main>
  </body>
</html>`

await fs.writeFile(
  path.join(
    outputDirectory,
    "index.html"
  ),
  indexHtml,
  "utf8"
)

console.log("")
console.log(
  `Previews criados: ${cards.length}`
)
