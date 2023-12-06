import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import eth from "/assets/eth.png";

interface CompanyProps {
  name: string;
  bidValue: string | number;
  companyID: number;
  onBidValueChange: (companyID: number, newBidValue: string) => void;
}

export default function Company(props: CompanyProps) {
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

    if (responseBody.message === "valid") {
      toast.success("Transação Concluída com Sucesso!");
    }
    if (responseBody.message === "invalid") {
      toast.error("Com o valor inserido não foi possível fazer a transação.");
    }

    setIsEditing(false);
    props.onBidValueChange(props.companyID, payload.rangeBidValue);
  };

  return (
    <>
      <div className="companies-container">
        <div className="companies">
          <span>
            <img src={eth} alt="" />
            <h1>{props.name}</h1>
          </span>
          <div className="infos">
            <p>Raio de compra:</p>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  placeholder="min"
                  onChange={(e) => setMinValue(parseInt(e.target.value))}
                  required
                />
                <input
                  type="number"
                  placeholder="max"
                  onChange={(e) => setMaxValue(parseInt(e.target.value))}
                  required
                />
                <button type="submit">Enviar</button>
              </form>
            ) : (
              <div>
                <p>{props.bidValue}</p>
                <button onClick={() => setIsEditing(true)}>
                  Alterar Valor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        closeOnClick
        autoClose={1000}
      />
    </>
  );
}
