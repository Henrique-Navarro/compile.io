const Title = ({ text, bold = true }) => {
  const title = {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: bold ? "bold" : "100",
  };
  return <h2 style={title}>{text}</h2>;
};

export default Title;
