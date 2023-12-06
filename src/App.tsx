import { useEffect, useState } from "react";

import Company from "./components/Company";
import Graphic from "./components/Graphic";
import eth from "./assets/eth.png";

function App() {
  const [ethBrlValue, setEthBrlValue] = useState<number>();
  const [companies, setCompanies] = useState([
    {
      id: 0,
      name: "CryptoVerse ",
      bidValue: "10000-50000",
    },
    {
      id: 1,
      name: "DigitalCoin",
      bidValue: "3250-4000",
    },
    {
      id: 2,
      name: "BlockTech",
      bidValue: "10000-20000",
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://crypto-guardian-api.onrender.com/api/v1/transaction"
      );
      const responseBody = await response.json();
      setEthBrlValue(parseFloat(responseBody));
    } catch (error) {
      console.error(`Error trying fetch data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCompanyBidValueChange = (
    companyID: number,
    newBidValue: string
  ) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyID
          ? { ...company, bidValue: newBidValue }
          : company
      )
    );
  };

  return (
    <div className="home">
      <div className="current-value">
        <img src={eth} alt="" />
        <span>
          <p>Valor Atual (tempo real)</p>
          <p>R${ethBrlValue?.toFixed(2)}</p>
        </span>
        
      </div>
      <div className="logo">
         <h1 >CriptoGuardian</h1>
      </div>
         
      <Graphic />
      <div className="company-content">
        {companies.map((element, index) => (
          <Company
            key={index}
            name={element.name}
            bidValue={element.bidValue}
            companyID={element.id}
            onBidValueChange={handleCompanyBidValueChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
