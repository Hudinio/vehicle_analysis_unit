import './App.css';
import VehicleList from './components/VehicleList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vehicle Analysis Unit</h1>
        <div className="logos">
          <img src="/images/mcac_logo.png" alt="MCAC Logo" className="logo"/>
          <img src="/images/msp_logo_trans.png" alt="MSP Logo" className="logo"/>
        </div>
      </header>
      <main className="App-content">
        <h2>What Features Can You See?</h2>

        <VehicleList />
        <div className="results">
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2023 Maryland Coordination and Analysis Center - Vehicle Analysis Unit</p>
        <p>(410) 281-2403</p>
        <p>vehicle.analysis@mcac.maryland.gov</p>
      </footer>
    </div>
  );
}


export default App;
