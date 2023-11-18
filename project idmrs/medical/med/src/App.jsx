import React from 'react';
import './App.css';
import TsunamiHealthPredictor from './components/TsunamiHealthPredictor';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Health Predictor</h1>
                <p>Stay prepared and get quick health check during tsunami with our health-predictor. Just select your symptoms from our dropdown menus and get instant predictions for potential diseases as well as recommended remedies. </p>
            </header>
            <TsunamiHealthPredictor />
        </div>
    );
}

export default App;
