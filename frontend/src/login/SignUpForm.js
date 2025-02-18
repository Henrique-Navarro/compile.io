import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Input from "../layout/components/Input";
import Textarea from "../layout/components/Textarea";
import CountrySelect from "../layout/components/CountrySelect";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    points: 0,
    role: "ADMIN",
    status: "ACTIVE",
    location: "",
    phoneNumber: "",
    biography: "",
  });
  const [message, setMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const countryOptions = countryList().getData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.location ||
      !formData.phoneNumber ||
      !formData.biography
    ) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          points: 0,
          role: "ADMIN",
          status: "ACTIVE",
          location: "",
          phoneNumber: "",
          biography: "",
        });
      } else {
        setMessage("Failed to register user.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Sign Up</h2>
        {message && (
          <p
            style={
              message === "Please fill out all fields."
                ? styles.error
                : styles.message
            }
          >
            {message}
          </p>
        )}
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput(null)}
          focused={focusedInput === "name"}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
          focused={focusedInput === "email"}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
          focused={focusedInput === "password"}
          required
        />
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onFocus={() => setFocusedInput("phoneNumber")}
          onBlur={() => setFocusedInput(null)}
          focused={focusedInput === "phoneNumber"}
        />
        <Textarea
          label="Biography"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          onFocus={() => setFocusedInput("biography")}
          onBlur={() => setFocusedInput(null)}
          focused={focusedInput === "biography"}
        />
        <CountrySelect
          value={countryOptions.find(
            (option) => option.value === formData.location
          )}
          onChange={handleCountryChange}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  header: {
    color: "#ffffff",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#18141c",
    padding: "20px",
  },
  form: {
    backgroundColor: "#20242c",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  field: {
    marginBottom: "20px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    width: "95%",
    padding: "12px",
    marginTop: "8px",
    border: "1px solid #444",
    borderRadius: "5px",
    backgroundColor: "#2b2f3a",
    color: "#ffffff",
    fontSize: "14px",
    resize: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    border: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  message: {
    color: "#28a745",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
};

const countrySelect = {
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
    color: "white", // Define a cor do texto digitado pelo usuário como branco
  }),
};

export default SignUpForm;
