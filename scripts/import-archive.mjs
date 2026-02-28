#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const args = process.argv.slice(2)

function getArg(flag) {
  const index = args.indexOf(flag)
  if (index === -1 || index === args.length - 1) {
    return null
  }

  return args[index + 1]
}

const dumpPath = getArg("--dump")
const photosPath = getArg("--photos")

if (!dumpPath || !photosPath) {
  console.error("Usage: node scripts/import-archive.mjs --dump <path> --photos <path>")
  process.exit(1)
}

const projectRoot = process.cwd()
const outputDataPath = path.join(projectRoot, "app", "data", "archive-messages.json")
const outputPhotosDir = path.join(projectRoot, "public", "archive", "photos")

function unescapeCopyValue(value) {
  if (value === "\\N") {
    return null
  }

  return value.replace(/\\([\\btnrfv])/g, (_, escaped) => {
    switch (escaped) {
      case "\\":
        return "\\"
      case "b":
        return "\b"
      case "t":
        return "\t"
      case "n":
        return "\n"
      case "r":
        return "\r"
      case "f":
        return "\f"
      case "v":
        return "\v"
      default:
        return escaped
    }
  })
}

function readMessagesFromDump(filePath) {
  const dump = fs.readFileSync(filePath, "utf8")
  const lines = dump.split("\n")
  const startIndex = lines.findIndex((line) => line.startsWith("COPY public.messages "))

  if (startIndex === -1) {
    throw new Error("Could not find COPY public.messages block in dump")
  }

  const rows = []

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]

    if (line === "\\.") {
      break
    }

    const columns = line.split("\t").map(unescapeCopyValue)

    if (columns.length !== 6) {
      throw new Error(`Unexpected messages row format at line ${index + 1}`)
    }

    const [id, name, message, photoUrl, approved, createdAt] = columns

    rows.push({
      id,
      name,
      message,
      photoUrl: photoUrl || null,
      approved: approved === "t",
      createdAt,
    })
  }

  return rows
}

function getSize(message) {
  if (message.length > 200) {
    return "large"
  }

  if (message.length > 100) {
    return "medium"
  }

  return "small"
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true })
}

function emptyDirectory(directory) {
  if (!fs.existsSync(directory)) {
    return
  }

  for (const entry of fs.readdirSync(directory)) {
    fs.rmSync(path.join(directory, entry), { recursive: true, force: true })
  }
}

function importArchive() {
  const messages = readMessagesFromDump(dumpPath)
    .filter((message) => message.approved)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())

  ensureDir(path.dirname(outputDataPath))
  ensureDir(outputPhotosDir)
  emptyDirectory(outputPhotosDir)

  const archiveMessages = messages.map((message) => {
    let photoPath

    if (message.photoUrl) {
      const filename = message.photoUrl.split("/").pop()

      if (!filename) {
        throw new Error(`Could not determine photo filename for message ${message.id}`)
      }

      const sourcePath = path.join(photosPath, filename)

      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Missing photo file for message ${message.id}: ${filename}`)
      }

      const destinationPath = path.join(outputPhotosDir, filename)
      fs.copyFileSync(sourcePath, destinationPath)
      photoPath = `/archive/photos/${filename}`
    }

    return {
      id: message.id,
      name: message.name,
      message: message.message,
      created_at: message.createdAt,
      photo_path: photoPath,
      size: getSize(message.message),
    }
  })

  fs.writeFileSync(outputDataPath, `${JSON.stringify(archiveMessages, null, 2)}\n`)

  const withPhotos = archiveMessages.filter((message) => message.photo_path).length
  console.log(`Imported ${archiveMessages.length} approved messages`)
  console.log(`Copied ${withPhotos} photos to ${outputPhotosDir}`)
  console.log(`Wrote archive data to ${outputDataPath}`)
}

try {
  importArchive()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
