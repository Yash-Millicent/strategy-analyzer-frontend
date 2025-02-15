// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { useMyContext } from "../../../../app/modules/auth/core/MyContext";
// import { IDashBoardTabs } from "../../../../app/modules/auth";
// import { headersSecondStep } from "../../../../model/Constants";

// const DashBoardTab: React.FC<IDashBoardTabs> = ({
//   headerData,
//   setHeaderType,
//   headerType,
//   handleSelectedHeaderChange,
// }) => {
//   const [activeHeaderTab, setActiveHeaderTab] = useState(0);
//   const { secondStep } = useMyContext();

//   const tabs = headerData
//     ? headerData
//     : [{ id: 1, display_name: "All", strategy_name: "ALL" }];

//   useEffect(() => {
//     let activeParamTab = headerData?.filter(
//       (tabs) => tabs.strategy_name === headerType
//     )?.[0]?.id;
//     if (activeParamTab) {
//       setActiveHeaderTab(activeParamTab);
//     }
//   }, [headerType]);

//   const handleHeaderChange = (data: {
//     id: number;
//     strategy_name: string;
//     display_name: string;
//     type: string;
//     margin: string;
//   }) => {
//     setHeaderType(data.strategy_name);
//     handleSelectedHeaderChange && handleSelectedHeaderChange(data);
//   };

//   const isSecond = secondStep ? headersSecondStep : tabs;

//   return (
//     <div className="level card-header">
//       <div className="level is-mobile d-flex gap-17">
//         <div>
//           <p className="heading d-flex gap-3">
//             <Nav
//               variant="pills"
//               activeKey={activeHeaderTab ? activeHeaderTab : tabs ? "0" : "1"}
//               // defaultActiveKey={
//               //   activeHeaderTab ? activeHeaderTab : tabs ? "0" : "1"
//               // }
//             >
//               <Nav.Item className="d-flex gap-3 flex-wrap">
//                 {isSecond.map((tab, i) => (
//                   <Nav.Link
//                     className="nav-tab"
//                     onClick={() => {
//                       handleHeaderChange({ type: "", margin: "", ...tab });
//                     }}
//                     eventKey={tab.id}
//                     key={i}
//                   >
//                     {tab.display_name}
//                   </Nav.Link>
//                 ))}
//               </Nav.Item>
//             </Nav>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default DashBoardTab;

import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { IDashBoardTabs } from "../../../../app/modules/auth";

const DashBoardTab: React.FC<IDashBoardTabs> = ({
  handleHeaderChange,
  eventKey,
  tabName,
  activeKey,
  data,
  isLoading,
}) => {
  // useEffect(() => {
  //   if (eventKey === activeKey) {
  //     handleHeaderChange(eventKey, data);
  //   }
  // }, []);

  return (
    <>
      {!isLoading && (
        <div className="level card-header">
          <div className="level is-mobile d-flex">
            <Nav
              variant="pills"
              activeKey={activeKey}
              onSelect={() => {
                handleHeaderChange(eventKey, data);
              }}
            >
              <Nav.Item>
                <Nav.Link className="nav-tab" eventKey={eventKey}>
                  {tabName}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      )}
    </>
  );
};
export default DashBoardTab;
