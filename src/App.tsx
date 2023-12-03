import { useEffect, useState } from "react";
import axios from "axios";

import Company from "./components/Company";
import Graphic from "./components/Graphic";
import eth from "./assets/eth.png";

function App() {
  const [ethBrlValue, setEthBrlValue] = useState<number>();

  const companies = [
    {
      id: 0,
      name: "CryptoVerse ",
      bidValue: 1,
    },
    {
      id: 1,
      name: "DigitalCoin",
      bidValue: 1,
    },
    {
      id: 2,
      name: "BlockTech",
      bidValue: 0,
    },
  ];

  useEffect(() => {
    (async () => {
      //TODO: Mudar pra fetch
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
      {/* TODO: tirar o css-in-js e colocar no sass */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {companies.map((element, index) => (
          <Company
            key={index}
            name={element.name}
            bidValue={element.bidValue}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
