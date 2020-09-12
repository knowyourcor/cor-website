import { useState } from "react";
import Tab from "./tab";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState();

  const handelTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={handelTabClick}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          console.log(child.props.label, activeTab);
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
