import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import PlaceholderPage from './pages/PlaceholderPage';
import AIAssistant from './components/AIAssistant';
import NewProjectsPage from './components/NewProjectsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FloatingSocials from './components/FloatingSocials';

// Admin Imports
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProperties from './pages/Admin/Properties';
import AddProperty from './pages/Admin/AddProperty';
import AdminInquiries from './pages/Admin/Inquiries';
import Leads from './pages/Admin/Leads';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CurrencyProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/new-projects" element={<NewProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } />
            
            <Route path="/admin/properties" element={
              <AdminLayout>
                <AdminProperties />
              </AdminLayout>
            } />
            
            <Route path="/admin/properties/add" element={
              <AdminLayout>
                <AddProperty />
              </AdminLayout>
            } />
            
            <Route path="/admin/inquiries" element={
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            } />
            
            <Route path="/admin/leads" element={
              <AdminLayout>
                <Leads />
              </AdminLayout>
            } />

            {/* Fallback */}
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
          </Routes>
          <FloatingSocials />
          <AIAssistant />
        </CurrencyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
