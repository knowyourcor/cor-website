export default function VariantSelector({ option, handleOptionChange }) {
  return (
    <>
      {option.values.length > 1 && (
        <>
          <select
            name={option.name}
            key={option.name}
            onChange={handleOptionChange}
          >
            {option.values.map((value) => {
              return (
                <option
                  value={value}
                  key={`${option.name}-${value}`}
                >{`${value}`}</option>
              );
            })}
          </select>
          &nbsp; {option.name}
        </>
      )}
    </>
  );
}
