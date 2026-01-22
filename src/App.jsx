import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contactUs" element={<Contact />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
