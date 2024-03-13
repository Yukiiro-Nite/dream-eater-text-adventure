import { useEffect } from "react"
import { useMenuStore } from "../../store/useMenuStore"
import { useStoryStore } from "../../store/useStoryStore"
import classNames from "classnames"

export const Menu = () => {
  const statementId = useStoryStore(state => state.statementId)
  const newStory = useStoryStore(state => state.newStory)
  const showMenu = useMenuStore(state => state.showMenu)
  const setShowMenu = useMenuStore(state => state.setShowMenu)
  const visible = (!!statementId) || showMenu
  
  useEffect(() => {
    const toggleMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setShowMenu(!showMenu)
    }

    document.addEventListener('keydown', toggleMenu)

    return () => {
      document.removeEventListener('keydown', toggleMenu)
    }
  }, [setShowMenu, showMenu])

  const menuClasses = classNames('MenuWrapper', { visible })

  return (
    <div className={menuClasses}>
      <button onClick={() => newStory() }>Menu</button>
    </div>
  )
}