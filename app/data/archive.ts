import archiveMessages from "./archive-messages.json"

export interface ArchiveMessage {
  id: string
  name: string
  message: string
  created_at: string
  photo_path?: string
  size: "small" | "medium" | "large"
}

export const messages = archiveMessages as ArchiveMessage[]
export const totalMessages = messages.length
