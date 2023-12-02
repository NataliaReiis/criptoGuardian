import eth from "../assets/eth.png";

export default function Company() {
  const companies = [
    {
      id: 0,
      title: "CryptoVerse ",
      value: "0",
    },
    {
      id: 1,
      title: "DigitalCoin",
      value: "0",
    },
    {
      id: 2,
      title: "BlockTech",
      value: "0",
    },
  ];
  return (
    <div className="companies-container">
    {companies.map(company => (
      <div key={company.id} className="companies">
        <span>
          <img src={eth} alt="" />
          <h1>{company.title}</h1>
        </span>
        <div className="infos">
          <p>Valor da transação:</p>
          <p>{company.title}</p>
          <button>Alterar Valor</button>
        </div>
      </div>
    ))}
      
    </div>
  );
}
