import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import themeConfig from './theme/themeConfig';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Organizations from './pages/Organizations';
import Services from './pages/Services';
import Admins from './pages/Admins';
import Settings from './pages/Settings';
import Accounting from './pages/Accounting';
import CostSimulator from './pages/CostSimulator';
import CompareLLM from './pages/CompareLLM';
import QuotaTemplates from './pages/QuotaTemplates';
import ROIAnalysis from './pages/ROIAnalysis';

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/services" element={<Services />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/accounting" element={<Accounting />} />
                <Route path="/cost-simulator" element={<CostSimulator />} />
                <Route path="/compare" element={<CompareLLM />} />
                <Route path="/quota-templates" element={<QuotaTemplates />} />
                <Route path="/roi" element={<ROIAnalysis />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;