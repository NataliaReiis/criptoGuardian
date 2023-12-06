import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchEthereumPrice } from '../services/fetchEthereumPrice';

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

const CustomTooltip: React.FC<CustomTooltipProps & TooltipProps<number, string>> = ({ active, payload, label }) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [chartData, setChartData] = useState<ChartData>({ YAxis: [{ data: [] }] });

  useEffect(() => {
    const fetchDataAndEthereumPrice = async () => {
      try {
        const response = await fetch('https://crypto-guardian-api.onrender.com/api/v1/transaction');
        const data: ApiData = await response.json();
        setApiData(data);

        // Adiciona o novo preço ao eixo Y
        setChartData((prevChartData) => {
          const newData = [...prevChartData.YAxis[0].data, data.value];
          return { YAxis: [{ data: newData }] };
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    // Chama fetchDataAndEthereumPrice a cada 2000 milissegundos (2 segundos)
    const intervalId = setInterval(fetchDataAndEthereumPrice, 10000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData.YAxis[0].data.map((value, index) => ({ timestamp: index, value }))}>
        <XAxis dataKey="timestamp" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00C49F"
          strokeWidth={3}
          dot={{ stroke: '#00C49F', strokeWidth: 3, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YourLineChart;






/*import { LineChart } from "@mui/x-charts/LineChart";
import { getEthereumPrice } from "../services/fetchEthereumPrice";
import { useEffect } from "react";
 import { useState, useEffect, FC } from "react";
import { LineChart} from '@mui/x-charts';

import { getEthereumPrice } from "../service/Api";


const EthereumChart: FC = () => {
  const [ethereumPrice, setEthereumPrice] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ xAxis: { data: number[] }; series: { data: number[] }[] }>({
    xAxis: { data: [] },
    series: [{ data: [] }],
  });

  const fetchEthereumPrice = async () => {
    try {
      const price = await getEthereumPrice();
      const newChartData = {
        xAxis: { data: [...chartData.xAxis.data, new Date().toLocaleTimeString()] },
        series: [{ data: [...chartData.series[0].data, parseFloat(price)] }],
      };
      setChartData(newChartData);
      setEthereumPrice(parseFloat(price));
    } catch (error) {
      // erro 
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchEthereumPrice, 6000);

    return () => clearInterval(intervalId);
  }, [chartData]);

  return (
    <LineChart
      xAxis={[chartData.xAxis]}
      series={chartData.series}
      width={500}
      height={300}
      
    />
  );
};

export default EthereumChart;
 */


