import './App.css';
import Header from './components/Header';
import Home from './components/Home';

const App = () => (
  <div className="App">
    <div className="App-header">
      <Header />
    </div>
    <div className="App-body">
      <Home />
    </div>
  </div>
);

export default App;
