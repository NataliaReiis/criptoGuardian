/* import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface ApiDataItem {
  timestamp: string;
  BRL: number;
}
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
} */
export default function Graphic() {
  /* const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch("");
        const data: ApiDataItem[] = await response.json();

        const formattedData: ChartData = {
          labels: data.map((item) => item.timestamp),
          datasets: [
            {
              label: "Valor BRL",
              data: data.map((item) => item.BRL),
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
          ],
        };
        setChartData(formattedData);
      } catch (error) {
        console.log("Erro ao buscar dados da API", error);
      }
    };
    fetchDataFromAPI();
  }, []); */

  return <>{/* <Line data={chartData} /> */}</>;
}
