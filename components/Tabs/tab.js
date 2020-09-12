const tab = ({ label, onClick }) => {
  return <li onClick={(label) => onClick(label)}>{label}</li>;
};

export default tab;
