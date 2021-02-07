const promote = async (role, data) => {
  const res = await fetch(`/superAdmin/promote/${role}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await res.json();
  return jsonData;
};

export default { promote };
