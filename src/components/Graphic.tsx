/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";

interface ApiData {
  timestamp: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

interface ChartData {
  YAxis: { data: number[] }[];
}

const CustomTooltip: React.FC<
  CustomTooltipProps & TooltipProps<number, string>
> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : $${value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const YourLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    YAxis: [{ data: [] }],
  });

  useEffect(() => {
    const fetchDataAndEthereumPrice = async () => {
      try {
        const response = await fetch(
          "https://crypto-guardian-api.onrender.com/api/v1/transaction"
        );
        const data: ApiData = await response.json();

        // Adiciona o novo preço ao eixo Y
        setChartData((prevChartData) => {
          const newData = [...prevChartData.YAxis[0].data, data.value];
          return { YAxis: [{ data: newData }] };
        });
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    // Chama fetchDataAndEthereumPrice a cada 2000 milissegundos (2 segundos)
    const intervalId = setInterval(fetchDataAndEthereumPrice, 4000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ResponsiveContainer className="graphic" width="90%" height={250}>
      <LineChart
        data={chartData.YAxis[0].data.map((value, index) => ({
          timestamp: index,
          value,
        }))}
      >
        <XAxis dataKey="timestamp" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00C49F"
          strokeWidth={3}
          dot={{ stroke: "#00C49F", strokeWidth: 3, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YourLineChart;
