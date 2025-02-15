import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { DashboardTab, IStretagyHeader } from "../../modules/auth";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useGetStrategyHeader } from "../../../hooks/queries/Dashboard";

const DashboardPage: React.FC = () => {
  const [context, setContext] = useState<string>("ALL");
  const [headerType, setHeaderType] = useState<string>("all");
  const [headerData, setHeaderData] = useState<IStretagyHeader[] | null>([]);
  // const [selectedTab, setSelectedTab] = useState<DashboardTab>("Summary");
  // const [activeStrategy, setActiveStrategy] = useState<string>("ALL");
  const [showAreaChart, setShowAreaChart] = useState<boolean>(true);

  const {
    data: strategyHeaderData,
    isLoading,
    isError,
  } = useGetStrategyHeader();

  useEffect(() => {
    if (strategyHeaderData) setHeaderData(strategyHeaderData);
  }, [strategyHeaderData]);

  // const handleClick = (tab: DashboardTab) => {
  //   setSelectedTab(tab);
  // };

  const contextProps = {
    headerType,
    headerData,
    setHeaderType,
    showAreaChart,
    setShowAreaChart,
  };

  return (
    <>
      {/* <ToolbarWrapper /> */}
      <div className="pb-10">
        <Content>
          <div>
            <div className="d-flex gap-5 mb-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "green border-bottom-active fw-600 fs-16 cursor-pointer"
                    : "gray fs-16"
                }
                to={"summary"}
              >
                Summary
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "green border-bottom-active fw-600 fs-16 cursor-pointer"
                    : "gray fs-16"
                }
                onClick={() => {
                  setHeaderType("all");
                }}
                to={"analysis"}
              >
                Analysis
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "green border-bottom-active fw-600 fs-16 cursor-pointer"
                    : "gray fs-16"
                }
                to={"positions"}
              >
                Positions
              </NavLink>
            </div>
          </div>
        </Content>
        <Outlet context={[contextProps]} />
      </div>
    </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
