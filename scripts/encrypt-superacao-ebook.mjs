import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

function loadEnvironment() {
  const result = {}

  for (const filename of [
    ".env",
    ".env.local",
    ".env.production"
  ]) {
    if (!fs.existsSync(filename)) {
      continue
    }

    const lines = fs
      .readFileSync(filename, "utf8")
      .split(/\r?\n/)

    for (const rawLine of lines) {
      const line = rawLine.trim()

      if (
        !line ||
        line.startsWith("#") ||
        !line.includes("=")
      ) {
        continue
      }

      const separator = line.indexOf("=")
      const key = line.slice(0, separator).trim()
      let value = line.slice(separator + 1).trim()

      if (
        value.length >= 2 &&
        (
          (
            value.startsWith('"') &&
            value.endsWith('"')
          ) ||
          (
            value.startsWith("'") &&
            value.endsWith("'")
          )
        )
      ) {
        value = value.slice(1, -1)
      }

      result[key] = value
    }
  }

  return result
}

const inputPath = process.argv[2]
const outputPath = process.argv[3]
const environment = loadEnvironment()

const secret =
  process.env.STRIPE_WEBHOOK_SECRET ||
  environment.STRIPE_WEBHOOK_SECRET

if (!inputPath || !outputPath) {
  throw new Error("Entrada ou saída ausente.")
}

if (!secret) {
  throw new Error(
    "STRIPE_WEBHOOK_SECRET não configurado."
  )
}

const pdf = fs.readFileSync(inputPath)

if (
  pdf.subarray(0, 5).toString("ascii") !==
  "%PDF-"
) {
  throw new Error("Entrada não é PDF.")
}

const key = crypto
  .createHash("sha256")
  .update(
    `${secret}|superacao-ebook-v1`,
    "utf8"
  )
  .digest()

const iv = crypto.randomBytes(12)

const cipher = crypto.createCipheriv(
  "aes-256-gcm",
  key,
  iv
)

const encrypted = Buffer.concat([
  cipher.update(pdf),
  cipher.final()
])

const tag = cipher.getAuthTag()

const output = Buffer.concat([
  Buffer.from(
    "SUPERACAO_EBOOK_AES_GCM_V1\n",
    "utf8"
  ),
  iv,
  tag,
  encrypted
])

fs.mkdirSync(
  path.dirname(outputPath),
  {
    recursive: true
  }
)

fs.writeFileSync(
  outputPath,
  output
)

console.log("PDF original:", pdf.length)
console.log("Arquivo criptografado:", output.length)
console.log("Algoritmo: AES-256-GCM")
