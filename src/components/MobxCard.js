import React, { useContext } from "react";
import { Card } from "antd";

import { CollapseStoreContext } from "../store2";
import { observer } from "mobx-react";

const RowCards = observer(() => {
  const store = useContext(CollapseStoreContext);
  return (
    <div style={{ paddingLeft: "20px" }}>
      <Card
        title="Mobx Expand"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>Expand side menubar is {store.open ? "closed" : "open"}</p>
      </Card>
    </div>
  );
});
export default RowCards;
