import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/buy" element={<PlaceholderPage title="Buy Property" />} />
        <Route path="/rent" element={<PlaceholderPage title="Rent Property" />} />
        <Route path="/new-projects" element={<PlaceholderPage title="New Projects" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
