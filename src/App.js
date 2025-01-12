import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import My from './my/My'
import Saved from './saved/Saved'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 각 경로 설정 */}
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/my" element={<My />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;