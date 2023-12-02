import Company from "./components/Company";
import Graphic from "./components/Graphic";
import eth from "./assets/eth.png";

function App() {
  return (
    <div className="home">
      <div className="current-value">
        <img src={eth} alt="" />
        <span>
          <p>Valor Atual (tempo real)</p>
          <p>R$ 10.344</p>
        </span>
      </div>
      <Graphic />
      <Company />
    </div>
  );
}

export default App;
