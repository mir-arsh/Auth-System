import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const useUserData = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, isLoaded]);

  return {
    userData,
    role: userData?.role ?? null,
    loading,
    error,
  };
};

export default useUserData;