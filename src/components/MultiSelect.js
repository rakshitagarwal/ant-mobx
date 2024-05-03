import React from 'react';
import { Select, Space } from 'antd';
const options = [{label:"frontend", value:"frontend"}, {label:"backend", value:"backend"}, {label:"fullstack", value:"fullstack"}, {label:"database", value:"database"}];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const MultiSelect = () => (
  <Space
    style={{
      width: '100%',
    }}
    direction="vertical"
  >
    <Select
      mode="multiple"
      allowClear
      style={{
        width: '20rem',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />
  </Space>
);
export default MultiSelect;