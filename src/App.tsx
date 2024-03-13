import './App.css'
import { Background } from './components/Background/Background'
import { Menu } from './components/Menu/Menu'
import { Replies } from './components/Replies/Replies'
import { Statement } from './components/Statement/Statement'
import { Title } from './components/Title/Title'

function App() {
  return (
    <main>
      <Background />
      <Title />
      <Statement />
      <Replies />
      <Menu />
    </main>
  )
}

export default App
