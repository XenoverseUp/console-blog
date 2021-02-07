import React, { createContext, useState } from "react";
import { ReactComponent as General } from "../assets/img/categoryIcons/general.svg";
import { ReactComponent as Science } from "../assets/img/categoryIcons/science.svg";
import { ReactComponent as Tech } from "../assets/img/categoryIcons/tech.svg";
import { ReactComponent as Cinema } from "../assets/img/categoryIcons/cinema.svg";
import { ReactComponent as Gaming } from "../assets/img/categoryIcons/gaming.svg";
import { ReactComponent as Life } from "../assets/img/categoryIcons/life.svg";
import { ReactComponent as History } from "../assets/img/categoryIcons/history.svg";
import { ReactComponent as Entertainment } from "../assets/img/categoryIcons/entertainment.svg";
import { ReactComponent as Literature } from "../assets/img/categoryIcons/literature.svg";
import { ReactComponent as Music } from "../assets/img/categoryIcons/music.svg";
import { ReactComponent as CurrentEvents } from "../assets/img/categoryIcons/current-events.svg";

export const CategoryContext = createContext();

export default ({ children }) => {
  const [categories] = useState([
    {
      name: "Genel",
      path: "genel",
      icon: <General />,
      gradient: "linear-gradient(45deg, #f12711, #f5af19)",
    },
    {
      name: "Bilim",
      path: "bilim",
      icon: <Science />,
      gradient: "linear-gradient(45deg, #aa076b, #61045f)",
    },
    {
      name: "Teknoloji",
      path: "teknoloji",
      icon: <Tech />,
      gradient: "linear-gradient(45deg, #0052d4, #4364f7, #6fb1fc)",
    },
    {
      name: "Sinema & Dizi",
      path: "sinema-dizi",
      icon: <Cinema />,
      gradient: "linear-gradient(45deg, #8e0e00, #2f0c28)",
    },
    {
      name: "Oyun",
      path: "oyun",
      icon: <Gaming />,
      gradient: "linear-gradient(45deg, #ff512f, #dd2476)",
    },
    {
      name: "Yaşam",
      path: "yasam",
      icon: <Life />,
      gradient: "linear-gradient(45deg, #00416a, #799f0c, #ffe000)",
    },
    {
      name: "Tarih",
      path: "tarih",
      icon: <History />,
      gradient: "linear-gradient(45deg, #649173, #dbd5a4)",
    },
    {
      name: "Eğlence",
      path: "eglence",
      icon: <Entertainment />,
      gradient: "linear-gradient(45deg, #43cea2, #185a9d)",
    },
    {
      name: "Edebiyat",
      path: "edebiyat",
      icon: <Literature />,
      gradient: "linear-gradient(45deg, #7b4397, #dc2430)",
    },
    {
      name: "Müzik",
      path: "muzik",
      icon: <Music />,
      gradient: "linear-gradient(45deg, #ff5f6d, #ffc371)",
    },
    {
      name: "Güncel Olaylar",
      path: "guncel-olaylar",
      icon: <CurrentEvents />,
      gradient: "linear-gradient(45deg, #e96443, #904e95)",
    },
  ]);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};
