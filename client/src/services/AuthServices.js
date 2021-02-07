const login = async (userData) => {
  let res = await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 401) {
    const jsonData = await res.json();
    return jsonData;
  }

  return {
    isAuthenticated: false,
    user: { userName: "", email: "", role: "" },
  };
};

const register = async (userData) => {
  let res = await fetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await res.json();

  return jsonData;
};

const logout = async () => {
  let res = await fetch("/auth/logout");

  const jsonData = await res.json();
  return jsonData;
};

const isAuthenticated = async () => {
  let res = await fetch("/auth/isAuthenticated");

  if (res.status !== 401) {
    const jsonData = await res.json();
    return jsonData;
  } else
    return {
      isAuthenticated: false,
      user: { userName: "", email: "", role: "" },
    };
};

export default { login, register, logout, isAuthenticated };
