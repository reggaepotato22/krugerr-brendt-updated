import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import PlaceholderPage from './pages/PlaceholderPage';
import AIAssistant from './components/AIAssistant';
import NewProjectsPage from './components/NewProjectsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminDashboard from './pages/AdminDashboard';
import TermsConditions from './pages/TermsConditions';
import FloatingSocials from './components/FloatingSocials';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/new-projects" element={<NewProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/crm" element={<AdminDashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
      <FloatingSocials />
      <AIAssistant />
    </Router>
  );
}

export default App;
