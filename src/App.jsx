import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

const ABOUT_PATHS = ['/about-us', '/about', '/aboutus', '/aboutUs'];
const CONTACT_PATHS = ['/contact', '/contact-us', '/contactus', '/contactUs'];

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    {ABOUT_PATHS.map((path) => (
                        <Route key={path} path={path} element={<AboutUs />} />
                    ))}
                    {CONTACT_PATHS.map((path) => (
                        <Route key={path} path={path} element={<Contact />} />
                    ))}
                    <Route path="*" element={<Landing />} />
                </Routes>
            </Layout>
            <Analytics />
        </BrowserRouter>
    );
}

export default App;
