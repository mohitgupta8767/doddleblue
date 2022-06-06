import React from 'react';
import "./leftPanel.css";
import { Tooltip } from 'antd';
import { AppstoreOutlined } from "@ant-design/icons";
import DoddleblueLogo from "../../Assets/download.png";

const LeftPanel = () => {
  return (
    <>
      <div className="doddleblue-LeftPanel"></div>
      <div className={"left-panel"}>
        <div className={"logo"}>
          <img src={DoddleblueLogo} width="45px" height="45px" />
        </div>

        <Tooltip placement="right" title="Dashboard" color={"skyblue"} key={"#3c4888"}>
          <div
            className={`tab-icons 
                        ? "option-clicked"
                        : ""
                    }`}
          >
            <AppstoreOutlined style={{ fontSize: '35px', color: "white" }} />
          </div>
        </Tooltip>
      </div>
    </>
  )
}

export default LeftPanel