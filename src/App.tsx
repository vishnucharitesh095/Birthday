import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CreateGreeting from './pages/CreateGreeting';
import GreetingPage from './pages/GreetingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create" element={<CreateGreeting />} />
        <Route path="/wish" element={<GreetingPage />} />
        <Route path="/wish/:id" element={<GreetingPage />} />
        <Route path="/wish/demo" element={<GreetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
