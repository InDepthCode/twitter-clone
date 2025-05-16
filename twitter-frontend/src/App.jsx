import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/*" element={<HomePage />} /> {/* This will catch all routes */}
      </Routes>
    </div>
  );
}

export default App;