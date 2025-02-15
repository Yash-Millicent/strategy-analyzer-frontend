import React, { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import { Col, Row } from "react-bootstrap";

type Props = {
  className?: string;
};

const ChartsWidget3: FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  // const { mode } = useThemeMode();
  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(chartRef.current, getChartOptions());
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef]);

  return (
    <div className="new-card">
      <div className="card-header border-0 mb-5">
        <span className="card-title card-label fw-bold fs-3">
          Win:Loss Ratio
        </span>
      </div>

      <Row className="mb-5">
        <Col
          xs={4}
          xl={2}
        >
          <div>
            <div className="card-sub-heading">Net Profit</div>
            <div className="card-number mt-2">
              -92,579.10 <span className="card-number-negative">-9.26%</span>
            </div>
          </div>
        </Col>
        <Col
          xs={4}
          xl={2}
        >
          <div>
            <div className="card-sub-heading">Total Closed Trades</div>
            <div className="card-number mt-2">106</div>
          </div>
        </Col>
        <Col
          xs={4}
          xl={2}
        >
          <div>
            <div className="card-sub-heading">Percent Profitable</div>
            <div className="card-number mt-2">29.25%</div>
          </div>
        </Col>
        <Col
          xs={4}
          xl={2}
          className="mt-5 mt-xl-0"
        >
          <div>
            <div className="card-sub-heading">Profit Factor</div>
            <div className="card-number mt-2">0.927</div>
          </div>
        </Col>
        <Col
          xs={4}
          xl={2}
          className="mt-5 mt-xl-0"
        >
          <div>
            <div className="card-sub-heading">Max Drawdown</div>
            <div className="card-number mt-2">
              -440311.60 <span className="card-number-negative">-9.26%</span>
            </div>
          </div>
        </Col>
        <Col
          xs={4}
          xl={2}
          className="mt-5 mt-xl-0"
        >
          <div>
            <div className="card-sub-heading">Avg. Trade</div>
            <div className="card-number mt-2">
              -440311.60 <span className="card-number-negative">-9.26%</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          id="kt_charts_widget_3_chart"
          style={{ height: "350px" }}
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget3 };

function getChartOptions(): ApexOptions {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-info");
  // const lightColor = getCSSVariableValue("--bs-info-light");
  const chartColor = "#4CAF50";

  return {
    series: [
      {
        name: "Net Profit",
        data: [30, 40, 40, 90, 90, 70, 70, 80, 65, 35],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: 350,
      width: "100%",
      offsetX: -15,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 2,
      colors: [chartColor],
    },
    xaxis: {
      categories: [1, 13, 25, 25, 37, 49, 61, 73, 85, 97],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [chartColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
