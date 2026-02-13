import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Phases from './pages/Phases';
import Sessions from './pages/Sessions';
import Architecture from './pages/Architecture';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/phases" element={<Phases />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/architecture" element={<Architecture />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
