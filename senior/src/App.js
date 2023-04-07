
import './App.css';
import QiblaDirection from './components/qibla';
import React from 'react';


function App() {
  return (
    <div>
      <QiblaDirection latitude={40.7128} longitude={-74.0060} />
    </div>
  );
}

export default App;

