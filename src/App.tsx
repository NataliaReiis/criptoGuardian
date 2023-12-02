import { useEffect, useState } from "react";
import axios from "axios";

import Company from "./components/Company";
import Graphic from "./components/Graphic";
import eth from "./assets/eth.png";

function App() {
  const [ethBrlValue, setEthBrlValue] = useState<number>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://crypto-guardian-api.onrender.com/api/v1/transaction"
      );
      setEthBrlValue(parseFloat(data));
    })();
  });
  return (
    <div className="home">
      <div className="current-value">
        <img src={eth} alt="" />
        <span>
          <p>Valor Atual (tempo real)</p>
          <p>R${ethBrlValue?.toFixed(2)}</p>
        </span>
      </div>
      <Graphic />
      <Company />
    </div>
  );
}

export default App;
