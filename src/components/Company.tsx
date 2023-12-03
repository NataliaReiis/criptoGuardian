import { useState } from "react";
import eth from "../assets/eth.png";

interface CompanyProps {
  name: string;
  bidValue?: number;
}

export default function Company(props: CompanyProps) {
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      rangeBidValue: minValue + "-" + maxValue,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      "https://crypto-guardian-api.onrender.com/api/v1/transaction",
      options
    );
    const responseBody = await response.json();
    if (responseBody.message === "Valid") {
      //TODO: Adicionar popup positivo
      console.log("valid");
    } else {
      //TODO: Adicionar popup negavito
      console.log("invalid");
    }
  };

  return (
    <div className="companies-container">
      <div className="companies">
        <span>
          <img src={eth} alt="" />
          <h1>{props.name}</h1>
        </span>
        <div className="infos">
          <p>Raio de compra:</p>
          {props.bidValue ? (
            <div>
              <p>{props.bidValue}</p>
              <button>Alterar Valor</button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="number"
                placeholder="min"
                onChange={(e) => setMinValue(parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="max"
                onChange={(e) => setMaxValue(parseInt(e.target.value))}
              />
              <button type="submit">Enviar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
