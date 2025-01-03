import { useState, useEffect } from "react";

const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/users/get/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return { profile, isLoading, errorMessage };
};

export default useUserProfile;
