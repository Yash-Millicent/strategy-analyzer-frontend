import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useMyContext } from "../../../../../app/modules/auth/core/MyContext";
import { toAbsoluteUrl } from "../../../../helpers";
import {
  ISmallSizeCardProps,
  IStrategyData,
} from "../../../../../app/modules/auth/core/_models";
import { Code } from "react-content-loader";
import { useGetStrategyCardData } from "../../../../../hooks/queries/Analysis";

const SmallSizeCard: React.FC<ISmallSizeCardProps> = ({
  context,
  headerType,
}) => {
  const [strategydata, setStrategyData] = useState<IStrategyData[] | null>(
    null
  );

  const {
    data: smallSizeCardData,
    error,
    isLoading,
  } = useGetStrategyCardData(context, headerType);

  useEffect(() => {
    if (smallSizeCardData) setStrategyData(smallSizeCardData);
  }, [smallSizeCardData]);

  const { secondStep, setSecondStep } = useMyContext();

  return (
    <div>
      <Row>
        {strategydata?.map((data: any, i) => (
          <Col
            sm={3}
            key={i}
          >
            <div
              onClick={() => setSecondStep(true)}
              className="new-small-size-card d-flex align-items-center justify-content-between"
              style={{ cursor: "pointer" }}
              id="small_size_card"
            >
              {isLoading ? (
                <Code />
              ) : (
                <>
                  <div className="px-2">
                    <div className="card-sub-heading">{data.name}</div>
                    <div
                      className={`${
                        data.name === "TOTAL PROFIT"
                          ? "small-card-num-positive"
                          : data.name === "TOTAL LOSS"
                          ? "small-card-num-negative"
                          : "card-number"
                      } mt-3`}
                    >
                      {data.value}
                    </div>
                  </div>

                  <img
                    src={toAbsoluteUrl("media/pie-chart/piechart.png")}
                    className="h-20px"
                    alt=""
                  />
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SmallSizeCard;
