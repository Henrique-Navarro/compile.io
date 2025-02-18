import React, { useState, useEffect } from "react";
import Select from "react-select";
import Span from "./Span";

// Estilos internos do componente
const styles = {
  field: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
  },
  label: {
    fontSize: "16px",
    color: "white",
    marginBottom: "8px",
  },
  countrySelect: {
    control: (base) => ({
      ...base,
      backgroundColor: "#2b2f3a",
      color: "white",
      border: "1px solid #444",
      borderRadius: "5px",
      padding: "5px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#007bff" : isFocused ? "#444" : "#2b2f3a",
      color: isSelected || isFocused ? "white" : "#ffffff",
      padding: "10px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2b2f3a",
      border: "1px solid #444",
      borderRadius: "5px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
  },
};

const CountrySelect = ({ value, onChange }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar países
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const formattedCountries = countries.map((country) => ({
        value: country.cca2, // Código do país
        label: country.name.common, // Nome do país
      }));
      setCountryOptions(formattedCountries);
    } catch (error) {
      console.error("Erro ao buscar países:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Lidar com a mudança de seleção de país
  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      onChange(selectedOption); // Passa o objeto completo para a função onChange
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Exibe um indicador de carregamento
  }

  return (
    <div style={styles.field}>
      <Span text={"Country "} />

      <Select
        options={countryOptions}
        value={value} // Passa o objeto completo como valor
        onChange={handleCountryChange} // Passa o objeto completo para onChange
        placeholder="Select your country"
        styles={styles.countrySelect}
      />
    </div>
  );
};

export default CountrySelect;
