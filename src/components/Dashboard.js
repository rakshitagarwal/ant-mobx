import React from "react";
import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Tab 1",
    children: " 1st tab clicked and shown",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Rakshit Agarwal clicked 2nd tab",
  },
  {
    key: "3",
    label: "Tab 3",
    children: " Developer Mr. Agarwal clicked this tab 3",
  },
];
const DashboardTabs = () => (
  <div style={{ paddingLeft: "20px" }}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);
export default DashboardTabs;
