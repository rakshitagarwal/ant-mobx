import { useContext, useState } from "react";
import { Button, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  ProductOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import DataTable from "./DataTable";
import DashboardTabs from "./DashboardTabs";
import RowCards from "./MobxCard";
import { CollapseStoreContext } from "../store";
import { observer } from "mobx-react";
import Home from "./Home";
import Settings from "./Settings";
import InputForm from "./InputForm";
import VisibleCards from "./VisibleCards";

const items1 = [
  { label: "Home", key: "/", icon: <HomeOutlined /> },
  { label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined /> },
  { label: "Users List", key: "/usersList", icon: <UnorderedListOutlined /> },
  { label: "Profile", key: "/profile", icon: <UserOutlined /> },
  { label: "Settings", key: "/settings", icon: <SettingOutlined /> },
  { label: "Products", key: "/products", icon: <ProductOutlined /> },
  { label: "Customers", key: "/customers", icon: <CustomerServiceOutlined /> },
  { label: "Signout", key: "signout", icon: <PoweroffOutlined /> },
];

const MenuBar = observer(() => {
  const store = useContext(CollapseStoreContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    store.toggleCollapse();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          marginLeft: 16,
          marginTop: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Menu
          onClick={({ key }) => {
            if (key === "signout") {
              // some feature
            } else {
              navigate(key);
            }
          }}
          items={items1}
          inlineCollapsed={collapsed}
        ></Menu>
        <Content />
      </div>
    </div>
  );
});

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardTabs />} />
        <Route path="/usersList" element={<DataTable />} />
        <Route path="/profile" element={<RowCards />} />
        <Route path="/products" element={<InputForm />} />
        <Route path="/customers" element={<VisibleCards />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default MenuBar;
