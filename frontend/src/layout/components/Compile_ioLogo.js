import Span from "./Span";

const Compile_ioLogo = () => {
  const title = {
    fontSize: "1.25rem",
    marginRight: "2rem",
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
  };

  return (
    <h1 style={title}>
      <Span text={"C"} bold={true} color={"#2ccc64"} />
      <Span text={"ompile"} bold={false} />
      <Span text={"."} bold={true} color={"#2ccc64"} />
      <Span text={"io"} bold={false} />
    </h1>
  );
};

export default Compile_ioLogo;
