import { FC } from 'react';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Log } from "viem";

interface TransferChartProps {
  className?: string;
  transfers: Log[];
}

const TransferChart: FC<TransferChartProps> = ({ className, transfers }) => {
  const nbTransactionsByBlocks = prepareLogsToSeries(transfers)
  const series = [
    {
      name: "Transfers count",
      data: Object.values(nbTransactionsByBlocks)
    }
  ];
  const options: ApexOptions = {
    chart: {
      id: "transfer-chart",
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
    xaxis: {
      categories: Object.keys(nbTransactionsByBlocks),
      title: {
        text: "Block number (in Millions)"
      }
    },
    yaxis: {
      title: {
        text: "Number of transfers"
      }
    },
    grid: {
      borderColor: "#555",
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["purple"],
    stroke: {
      curve: "smooth"
    },
    tooltip: {
      theme: "dark"
    }
  };
  return (
    <ReactApexChart
      className={className}
      series={series}
      type="area"
      // width="500"
      height="300"
      options={options}
    />
  );
};

function prepareLogsToSeries(logs: Log[]) {
  const nbTransactionsByBlocks: Record<string, number> = {};

  logs.forEach((log) => {
    const block = (log?.blockNumber || 0n) / 1_000_000n;
    if (!nbTransactionsByBlocks[block.toString()]) {
      nbTransactionsByBlocks[block.toString()] = 0;
    }
    nbTransactionsByBlocks[block.toString()] += 1;
  });

  return nbTransactionsByBlocks
}

export default TransferChart;
