/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef, useState } from "react";
import { getCSSVariableValue } from "../../../../assets/ts/_utils";
import DoughnutChart from "../../charts/DoughnutChart";
import "../../../../../styles/chart.css";
import "../../../../../styles/common.css";
import Loader from "../../../../helpers/components/Loader";
import { convertAvgToNumber } from "../../../../../utils/StringToNumber";
import { useGetWinLossRatio } from "../../../../../hooks/queries/Analysis";
import {
  CardsWidget17Props,
  IPieChartData,
} from "../../../../../app/modules/auth";
import { recordNotFound } from "../../../../../utils/recordNotFound";

const CardsWidget17: FC<CardsWidget17Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
  buyselltype,
  headerType,
}) => {
  const [pieChartData, setPieChartData] = useState<IPieChartData | null>(null);
  const [isChartDataNull, setIsChartDataNull] = useState(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const {
    data: pieData,
    error,
    isLoading,
  } = useGetWinLossRatio(headerType, buyselltype);

  useEffect(() => {
    refreshChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate);
    }, 10);
  };

  useEffect(() => {
    setPieChartData(pieData?.[0]);
  }, [pieData]);

  const winRatio = pieChartData?.win_percent || 0; // Adjust the values based on your data
  const lossRatio = pieChartData?.loss_percent || 0;
  const chartNumber = pieChartData?.win_loss_ratio || 0;
  const textBaseline = "middle";

  function isDataEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="new-card">
      <div
        className="card-header"
        style={{ paddingBottom: "30px" }}
      >
        <div className="card-title d-flex flex-column">
          <span className="new-pie-chart-header">Win Loss Ratio</span>
        </div>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "290px" }}
        >
          <Loader />
        </div>
      ) : isDataEmpty(pieChartData) ? (
        recordNotFound()
      ) : (
        <>
          <div className="doughnut-chart-wrapper d-flex justify-content-center align-items-center">
            <DoughnutChart
              winRatio={winRatio}
              lossRatio={lossRatio}
              chartNumber={chartNumber}
              textBaseline={textBaseline}
            />
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <div className="card-sub-heading">Total Wins</div>
              <div
                className={`${convertAvgToNumber(
                  pieChartData?.total_wins
                )} card-number win-loss-stats`}
              >
                {pieChartData?.total_wins} &nbsp;
                <span>{`${pieChartData?.win_percent} %`}</span>
              </div>
            </div>

            <div className="d-flex flex-column">
              <div className="card-sub-heading">Total Loss</div>
              <div
                className={`${convertAvgToNumber(
                  pieChartData?.total_loss
                )} card-number win-loss-stats`}
              >
                {pieChartData?.total_loss} &nbsp;
                <span className="card-number-negative">
                  {`${pieChartData?.loss_percent} %`}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById("kt_card_widget_17_chart");
  if (!el) {
    return;
  }
  el.innerHTML = "";

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement("canvas");
  const span = document.createElement("span");

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== "undefined") {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  ctx?.translate(options.size / 2, options.size / 2); // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (
    color: string,
    lineWidth: number,
    percent: number
  ) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = "round"; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init 2
  drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
  drawCircle(getCSSVariableValue("--bs-primary"), options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue("--bs-success"), options.lineWidth, 100 / 250);
};

export { CardsWidget17 };
