// import React from "react";

// type IHeatmapCard = {
//   name: string;
//   percent: number;
//   amount: number;
// };

// interface IHeatmapProps {
//   data: { name: string; percent: number; market_price: number };
// }

// function getColor(percent: number) {
//   if (percent > 5) return "#02684f";
//   if (percent > 3 && percent < 5) return "#00b386";
//   if (percent > 1 && percent < 3) return "#c4f0e5";
//   if (percent > 0 && percent < 1) return "#ececec";
//   if (percent > 0 && percent < -3) return "#ffc6c6";
//   if (percent > -3 && percent < -5) return "#fc8383";
//   if (percent > -5) return "#e64747";

// }

// const HeatmapCard = (item: IHeatmapCard) => {
//   const color = getColor(item.percent);

//   return (
//     <div
//       className="heatmap-card"
//       style={{ backgroundColor: color }}
//     >
//       <div className="heatmap-card-name">{item.name}</div>
//       <div className="heatmap-card-percent">Percent: {item.percent}</div>
//       <div className="heatmap-card-amount">Amount: {item.amount}</div>
//     </div>
//   );
// };

// const Heatmap: React.FC<IHeatmapProps> = ({ data }) => {

//   const sortedData = data.slice().sort((a, b) => b.percent - a.percent);

//   return (
//     <div className="heatmap-container">
//       {sortedData.map((item, index) => (
//         <>

//           <HeatmapCard
//             key={index}
//             item={item}
//           />
//         </>
//       ))}
//     </div>
//   );
// };

// export default Heatmap;

import React from "react";
import { Col, Row } from "react-bootstrap";

interface IHeatmap {
  data: { name: string; percent: number; market_price: number }[];
}

function getColor(percent: number) {
  if (percent >= 5) return "#02684f";
  if (percent >= 3 && percent < 5) return "#00b386";
  if (percent >= 0 && percent < 3) return "#c4f0e5";
  if (percent == 0) return "#ececec";
  if (percent >= -3 && percent < 0) return "#ffc6c6";
  if (percent > -5 && percent < -3) return "#fc8383";
  if (percent <= -5) return "#e64747";
}

const Heatmap: React.FC<IHeatmap> = ({ data }) => {
  const sortedData = data.sort((a, b) => b.percent - a.percent);
  return (
    <Row className="mx-0">
      {sortedData.map((item: any, index: number) => (
        <Col
          key={index}
          className="mt-6 px-0"
        >
          <div
            className="heatmap-card"
            style={{
              backgroundColor: getColor(item.percent),
              color:
                getColor(item.percent) === "#c4f0e5" ||
                getColor(item.percent) === "#ececec" ||
                getColor(item.percent) === "#ffc6c6"
                  ? "#41414e"
                  : "#fff",
            }}
          >
            <div className="heatmap-header">{item.name}</div>
            <div className="heatmap-data">
              <div>{`${item.percent}%`}</div>
              <div>{item.market_price}</div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Heatmap;
