import React from "react";
import styles from "./shop.module.scss";
const RadioContext = React.createContext();

function useRadioContext() {
  const context = React.useContext(RadioContext);
  if (!context) {
    throw new Error(
      `Radio compound components cannot be rendered outside the Radio component`
    );
  }
  return context;
}

function RadioGroup({ children, defaultValue, onChange }) {
  const [state, setState] = React.useState("");

  function handleOnChange(value) {
    setState(value);
    onChange(value);
  }

  React.useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  return (
    <RadioContext.Provider value={[state, handleOnChange]}>
      <div role="radiogroup" className={styles.radiogroup}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}

function RadioButton({ value, children }) {
  const [state, onChange] = useRadioContext();
  const checked = value === state;
  return (
    <label>
      <input
        value={value}
        checked={checked}
        type="radio"
        onChange={({ target }) => onChange(target.value)}
      />
      {children}
    </label>
  );
}

RadioGroup.RadioButton = RadioButton;

export default RadioGroup;
