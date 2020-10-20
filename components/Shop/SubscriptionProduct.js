import { useState, useRef, useEffect } from "react";
import styles from "./shop.module.scss";

export default function SubscriptionProduct({
  intervals,
  group_discount,
  max_number,
  handleFrequencyChange,
  subscription_only,
}) {
  // Define frequencyNum state
  const maxIntervals = Array.apply(null, Array(max_number));
  const [frequencyNum, setFrequencyNum] = useState(
    maxIntervals.map((_, index) => ({ option: index + 1 }))
  );

  // Define frequencyType state
  const intervalsLabels = ["", "Day(s)", "Week(s)", "Month(s)", "", "Year(s)"];

  const [frequencyType, setFrequencyType] = useState(
    intervals.map((interval) => ({
      label: intervalsLabels[interval.interval_id],
      value: interval.interval_id,
    }))
  );

  // Create select references
  const frequencyNumRef = useRef();
  const frequencyTypeRef = useRef();

  // Define initial selectedFrequency state
  const [selectedFrequency, setSelectedFrequency] = useState({
    frequency_num: `${frequencyNum[0].option}`,
    frequency_type: `${frequencyType[0].value}`,
    frequency_type_text: `${frequencyType[0].label}`,
  });

  // Handel Frequency Selection
  const handelFrequencySelect = () => {
    const frequencyNumValue =
      frequencyNumRef.current.options[frequencyNumRef.current.selectedIndex]
        .value;

    const frequencyTypeValue = frequencyTypeRef.current.options[
      frequencyTypeRef.current.selectedIndex
    ].value.split("-");

    setSelectedFrequency({
      ...selectedFrequency,
      frequency_num: `${frequencyNumValue}`,
      frequency_type: `${frequencyTypeValue[0]}`,
      frequency_type_text: `${frequencyTypeValue[1]}`,
    });
  };

  // console.log("frequencyNum: ", frequencyNum);
  // console.log("frequencyType: ", frequencyType);
  // console.log("selectedFrequency: ", selectedFrequency);

  useEffect(() => {
    // Update prop handleFrequencyChange on selectedFrequency change
    handleFrequencyChange(selectedFrequency);
  }, [selectedFrequency]);

  // const Discount = () => {
  //   return <p>Subscribe and Save {group_discount}% off</p>;
  // };

  return (
    <div className={styles.subscriptionFrequency}>
      {/* {group_discount > 0 && <Discount />} */}
      <select
        name="frequency_num"
        key="frequency_num"
        ref={frequencyNumRef}
        onChange={handelFrequencySelect}
      >
        {frequencyNum.map((option, index) => {
          return (
            <option key={`frequency-${index}`} value={index + 1}>
              {index + 1}
            </option>
          );
        })}
      </select>
      <select
        name="frequency_type"
        key="frequency_type"
        ref={frequencyTypeRef}
        onChange={handelFrequencySelect}
      >
        {frequencyType.map((option, index) => {
          return (
            <option
              key={`label-${index}`}
              value={`${option.value}-${option.label}`}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
