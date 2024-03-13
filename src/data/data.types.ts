export interface Title {
  content: string
  image?: string
  backgroundImage?: string
  style?: React.CSSProperties
  className?: string
}

export interface Statement {
  id: string
  title: Title
  content: string
  replyId: string
  action?: () => void
  style?: React.CSSProperties
  className?: string
}

export interface Reply {
  id: string
  nextStatementId: string
  content: string
  condition?: () => boolean
  action?: () => void
  style?: React.CSSProperties
  className?: string
}

export interface GameConfig {
  start: string
  statements: Record<string, Statement>
  replies: Record<string, Reply[]>
}

export interface StatementChunk {
  title: Title
  content: string
  replyId: string
  replies: ReplyChunk[]
  action?: () => void
}

export interface ReplyChunk {
  nextStatementId: string
  content: string
  condition?: () => boolean
  action?: () => void
}