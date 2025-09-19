import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import { Route, Routes } from 'react-router'
// import toast from 'react-hot-toast'

const App = () => {
  return (
    <div className="relative w-full h-full" data-theme="light">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/notes/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
