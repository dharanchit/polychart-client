import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Overview from './pages/Overview';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/overview' element={<Overview />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
