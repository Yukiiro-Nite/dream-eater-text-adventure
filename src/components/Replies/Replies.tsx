import classNames from 'classnames'
import { getReplies } from '../../data/gameConfig'
import { useStoryStore } from '../../store/useStoryStore'

export const Replies = () => {
  const statementId = useStoryStore(state => state.statementId)
  const selectReply = useStoryStore(state => state.selectReply)
  const replies = getReplies(statementId)

  if (!replies || replies.length === 0) {
    return null
  }

  return (
    <ul className="replyWrapper">
      {
        replies.map((reply, index) => {
          const replyClasses = classNames('Reply', reply.className)
          const show = reply.condition === undefined || reply.condition?.()

          if (!show) return

          return (
            <li key={`${reply.id}_${index}`} className={replyClasses} style={reply.style}>
              <button
                onClick={() => selectReply(reply.id, index)}
              >{reply.content}</button>
            </li>
          )
        })
      }
    </ul>
  )
}