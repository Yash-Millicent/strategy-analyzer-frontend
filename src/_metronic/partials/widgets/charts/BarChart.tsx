import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";
import {
  IBarArray,
  IBarChartProps,
  IStrategyBarChart,
} from "../../../../app/modules/auth";
import Loader from "../../../helpers/components/Loader";
import { convertAvgToNumber } from "../../../../utils/StringToNumber";
import { useGetStrategyBarChart } from "../../../../hooks/queries/Analysis";
import { useNavigate } from "react-router-dom";
import { recordNotFound } from "../../../../utils/recordNotFound";

const BarChart: React.FC<IBarChartProps> = ({ buyselltype, headerType }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Month");
  const [barChartData, setBarChartData] = useState<IStrategyBarChart | null>(
    null
  );

  const {
    data: chartData,
    isError,
    isLoading,
    error,
  } = useGetStrategyBarChart(headerType, buyselltype, selectedTab);

  useEffect(() => {
    if (chartData) setBarChartData(chartData);
  }, [chartData]);

  const options = {
    chart: {
      type: "bar" as const,
      toolbar: {
        show: false,
      },
      offsetX: -20,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -Infinity,
              to: 0,
              color: "#FF5252", // color for loss (negative profit)
              // color: data?.map(color => color?.color),
            },
            {
              from: 1,
              to: Infinity, // adjust based on your profit range
              color: "#4CAF50", // color for profitable months
            },
          ],
        },
        columnWidth: "35%",
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: barChartData?.bar?.map((month: IBarArray) => month.month),
      labels: {
        style: {
          // colors: labelColor,
          fontSize: "12px !important",
          color: "#969ba1 !important",
          fontWeight: "normal !important",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      yaxis: {
        max: 120,
        min: 0,
        tickAmount: 4,
        labels: {
          style: {
            // colors: labelColor,
            fontSize: "12px !important",
            color: "#969ba1 !important",
            fontWeight: "normal !important",
          },
        },
      },
    },

    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        color: null, // Set to null to remove the shadow effect
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
    },
    grid: {
      // borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const series = [
    {
      name: "Profit",
      data:
        barChartData?.bar?.map((month) => {
          return parseFloat(month.amount.toString().replace(/,/g, ""));
        }) || [],
    },
  ];

  return (
    <div className="new-card">
      {/* header */}
      <div className="d-flex border-0 flex-column flex-sm-row justify-content-sm-between">
        <div className="card-title d-flex flex-column">
          <span className="new-pie-chart-header">Performance</span>
        </div>

        <div className="new-card-toolbar mt-5 mt-sm-0 flex-row justify-content-between">
          <button
            className={`${
              selectedTab === "Month" ? "bg-white " : "bg-transparent"
            } fw-bold me-1 px-2 py-1 rounded border-0 w-100`}
            data-bs-toggle="tab"
            onClick={() => setSelectedTab("Month")}
            style={{
              color: selectedTab == "Month" ? "#41414e" : "#969ba1",
            }}
          >
            Month
          </button>

          <button
            className={`${
              selectedTab === "Week" ? "bg-white " : "bg-transparent"
            } fw-bold me-1 px-2 py-1 rounded border-0 w-100`}
            data-bs-toggle="tab"
            onClick={() => setSelectedTab("Week")}
            style={{
              color: selectedTab == "Week" ? "#41414e" : "#969ba1",
            }}
          >
            Week
          </button>

          <button
            className={`${
              selectedTab === "Day" ? "bg-white " : "bg-transparent"
            } fw-bold me-1 px-2 py-1 rounded border-0 w-100`}
            data-bs-toggle="tab"
            onClick={() => setSelectedTab("Day")}
            style={{
              color: selectedTab == "Day" ? "#41414e" : "#969ba1",
            }}
          >
            Day
          </button>
        </div>
      </div>

      {barChartData?.bar?.length === 0 ? (
        recordNotFound()
      ) : (
        <>
          <Row className="mt-5">
            <Col
              xs={3}
              sm={3}
            >
              <div>
                <div className="card-sub-heading">Average</div>
                <div
                  className={`${convertAvgToNumber(
                    barChartData?.average
                  )} fs-12 mt-1 card-number`}
                >
                  {isLoading ? 0 : barChartData?.average} &nbsp;
                  {/* <span className="card-number-positive">12.56</span> */}
                </div>
              </div>
            </Col>

            <Col
              className="d-flex justify-content-sm-end justify-content-start mt-5 mt-sm-0 align-items-end"
              xs={{ offset: 6, span: 3 }}
              sm={{ offset: 6, span: 3 }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-4 p-2 me-2"
                  style={{
                    backgroundColor: "#4CAF50",
                    width: "16px",
                    height: "16px",
                  }}
                ></div>
                <div className="dropdown-label text-align-right">
                  This {selectedTab}
                </div>
              </div>
            </Col>
          </Row>

          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "290px" }}
            >
              <Loader />
            </div>
          ) : (
            <div className="bar-chart-container">
              <Chart
                options={options}
                series={series}
                type="bar"
                height={"100%"}
                width={"102%"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BarChart;
