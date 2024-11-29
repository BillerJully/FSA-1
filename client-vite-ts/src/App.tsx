import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import Main from './components/main/Main'
import Welcome from './pages/welcome/Welcome.tsx'
import AuthPage from './pages/auth/AuthPage.tsx'
import NotFound from './pages/notfound/NotFound.tsx'
import Platform from './pages/platform/Platform.tsx'

function App() {
    return (
        <Router>
            <div className="app">
                <Main>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/platform/*" element={<Platform />} />
                        <Route path="/auth/*" element={<AuthPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Main>
            </div>
        </Router>
    )
}

export default App
