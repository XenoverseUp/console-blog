const getMonths = (date) => {
  if (date.getMonth() === 0) return "Ocak";
  else if (date.getMonth() === 1) return "Şubat";
  else if (date.getMonth() === 2) return "Mart";
  else if (date.getMonth() === 3) return "Nisan";
  else if (date.getMonth() === 4) return "Mayıs";
  else if (date.getMonth() === 5) return "Haziran";
  else if (date.getMonth() === 6) return "Temmuz";
  else if (date.getMonth() === 7) return "Ağustos";
  else if (date.getMonth() === 8) return "Eylül";
  else if (date.getMonth() === 9) return "Ekim";
  else if (date.getMonth() === 10) return "Kasım";
  else if (date.getMonth() === 11) return "Aralık";
};

export default getMonths;
