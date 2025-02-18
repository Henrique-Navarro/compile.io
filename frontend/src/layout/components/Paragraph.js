const Paragraph = ({ text, bold = false }) => {
  const paragraph = {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: "100",
    fontSize: "14px",
    fontWeight: bold ? "bold" : "100",
  };
  return <p style={paragraph}>{text}</p>;
};

export default Paragraph;
