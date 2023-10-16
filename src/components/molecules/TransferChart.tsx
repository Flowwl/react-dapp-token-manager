import { FC } from 'react';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface TransferChartProps {
  className?: string;
  transfers: Record<string, number>;
}

const TransferChart: FC<TransferChartProps> = ({ className, transfers }) => {
  const sortedTransfers = Object.fromEntries(Object.entries(transfers).sort(([a,], [b,]) => a > b ? -1 : 1));
  const series = [
    {
      name: "Transfers",
      data: Object.values(sortedTransfers)
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
      categories: Object.keys(sortedTransfers).map((timestamp) => {
        const date = new Date(parseInt(timestamp) * 1000)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }),
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

export default TransferChart;
