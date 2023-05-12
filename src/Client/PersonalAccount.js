import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Получение информации о пользователе
      const response = await fetch("/api/Client");
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Balance:{user.balance}</p>
          <p>Bonuses:{user.bonus}</p>
          {/* Другие свойства пользователя */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
