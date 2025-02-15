import React from "react";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChartProps } from "../../../../app/modules/auth";
import { Doughnutdata } from "../../../../model/Constants";

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  winRatio,
  lossRatio,
  circumference,
  chartNumber,
  textBaseline,
}) => {
  const data = Doughnutdata(winRatio, lossRatio);

  const options = {
    maintainAspectRatio: true,
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    circumference: circumference ? circumference : 360,
    rotation: -90,
  };

  const plugins = [
    {
      id: "textCenter",
      beforeDraw: function (chart: any) {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        // console.log("ctx", ctx);
        ctx.restore();
        const fontSize = (height / 160).toFixed(2);
        ctx.fillStyle = "#41414e";
        ctx.font = "normal 30px inter";
        ctx.textBaseline = textBaseline;
        const text = chartNumber,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <Doughnut
      id="doughnut-chart"
      data={data}
      options={options}
      plugins={plugins}
      redraw
    />
  );
};

export default DoughnutChart;
