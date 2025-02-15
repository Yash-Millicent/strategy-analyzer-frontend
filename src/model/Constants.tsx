import { ITabsForSecondStep } from "../app/modules/auth";

export const AnalysisRadioBtn = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Only Buy",
    value: "Buy",
  },
  {
    label: "Only Sell",
    value: "Sell",
  },
];

export const SummaryRadioBtn = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Equity",
    value: "Equity",
  },
  {
    label: "Futures",
    value: "Futures",
  },
  {
    label: "Options",
    value: "Options",
  },
  {
    label: "Commodity",
    value: "Commodity",
  },
];

export const PositionsTableTab = [
  {
    name: " Open Trades",
    id: "Open",
  },
  {
    name: "Close Trades",
    id: "Closed",
  },
];

export const headersSecondStep: ITabsForSecondStep[] = [
  {
    id: 1,
    display_name: "OVERVIEW",
    strategy_name: "overview",
  },
  {
    id: 2,
    display_name: "PERFORMANCE SUMMARY",
    strategy_name: "performance summary",
  },
  {
    id: 3,
    display_name: "LIST OF TRADES",
    strategy_name: "list of trades",
  },
  // Add more users as needed
];

// export const data =(winRatio,lossRatio)=> {
//   labels: ["Win", "Loss"],
//   datasets: [
//     {
//       data: [winRatio, lossRatio],
//       backgroundColor: ["#4CAF50", "#FF5252"],
//     },
//   ],
// };

export const Doughnutdata = (winRatio: any, lossRatio: any) => {
  return {
    labels: ["Win", "Loss"],
    datasets: [
      {
        data: [winRatio, lossRatio],
        backgroundColor: ["#4CAF50", "#FF5252"],
      },
    ],
  };
};
