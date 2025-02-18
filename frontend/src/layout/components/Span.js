const Span = ({ title, text, color = "white", bold = false }) => {
  const span = {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: bold ? "bold" : "100",
    color: color,
  };
  return (
    <span style={span}>
      {title}
      {text}
    </span>
  );
};

export default Span;
