export const convertAvgToNumber = (avg: string | undefined): string => {
  let output = "";
  if (avg) avg?.split(",")?.map((val: string) => (output += val));

  return Number(output) < 0 ? "negative" : "positive";
};

// export const convertAvgToNumber = (avg: string | undefined): string => {
//   if (avg === undefined) {
//     return "undefined";
//   }

//   let output = "";
//   if (typeof avg === "string") {
//     output = avg.replace(/,/g, ""); // Remove commas from the string
//   } else {
//     return "invalid input";
//   }

//   return Number(output) < 0 ? "negative" : "positive";
// };

export const stringToNumber = (data: string = "0"): number => {
  let output = "";
  data?.split(",")?.map((val: string) => (output += val));

  return Number(output);
};
