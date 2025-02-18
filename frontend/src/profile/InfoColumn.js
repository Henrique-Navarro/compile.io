import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FaPen } from "react-icons/fa";
import Textarea from "../layout/components/Textarea";
import CountrySelect from "../layout/components/CountrySelect";
import countryList from "react-select-country-list";
import Title from "../layout/components/Title";

const InfoColumn = ({ profile }) => {
  const [avatarColor, setAvatarColor] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile.bio);
  const [country, setCountry] = useState(profile.country);
  const [isFocused, setIsFocused] = useState(false);
  const countryOptions = countryList().getData();

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setAvatarColor(generateRandomColor());
  }, []);

  useEffect(() => {
    if (profile) {
      setBio(profile.biography || "");
      setCountry(
        countryOptions.find((option) => option.value === profile.location) ||
          null
      );
    }
  }, [profile, countryOptions]);

  const handleSave = () => {
    setBio(bio);
    setCountry(country);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setBio(profile.bio);
    setCountry(profile.country);
    setIsEditing(false);
  };

  const styles = {
    avatarBox: {
      backgroundColor: "rgb(32,36,44)",
      padding: "1rem",
      borderRadius: "0.75rem",
      marginBottom: "1.5rem",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    },
    avatarContainer: {
      position: "relative",
      display: "inline-block",
    },
    avatarEditIcon: {
      position: "absolute",
      //bottom: "5px",
      //left: "90px",
      bottom: "75px",
      left: "375px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "18px",
    },
    nameWithFlag: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
    },
    countryFlag: {
      width: "24px",
      height: "16px",
      marginLeft: "10px",
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "#38a169",
      color: "#fff",
    },
    cancelButton: {
      backgroundColor: "#e53e3e",
      color: "#fff",
    },
  };
  return (
    <div style={styles.avatarBox}>
      <div style={styles.avatarContainer}>
        <Avatar
          name={profile.name}
          size="100"
          round={true}
          color={avatarColor}
        />
        <FaPen
          style={styles.avatarEditIcon}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>
      <div style={styles.nameWithFlag}>
        <Title text={profile.name} bold={false} />
        {profile.location && (
          <img
            src={`https://flagcdn.com/w40/${profile.location.toLowerCase()}.png`}
            alt={`${profile.location}`}
            style={styles.countryFlag}
            title={profile.location}
          />
        )}
      </div>
      {isEditing ? (
        <div>
          <Textarea
            label="Biography"
            name="biography"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            focused={isFocused}
          />
          <CountrySelect
            value={country}
            onChange={(selectedOption) => setCountry(selectedOption)}
          />
          <div style={styles.buttonContainer}>
            <button
              onClick={handleSave}
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <pre>{profile.biography || "Not provided"}</pre>
        </div>
      )}
    </div>
  );
};

export default InfoColumn;
