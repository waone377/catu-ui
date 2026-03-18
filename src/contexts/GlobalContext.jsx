import { createContext, useContext, useState, useRef } from "react";
import clickSfx from "../sounds/click.mp3";
import successSfx from "../sounds/success.mp3";
import { Howl } from "howler";
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const click = useRef(new Howl({ src: clickSfx }));
  const success = useRef(new Howl({ src: successSfx }));
  const namaRef = useRef(null);
  const [nama, setNama] = useState("");
  const [timbanganList, setTimbanganList] = useState([]);

  const [timbangan, setTimbangan] = useState("");
  const [catatan, setCatatan] = useState([]);
  const [saklarSpeech, setSaklarSpeech] = useState(true);
  const values = {
    clickSound: click.current,
    successSound: success.current,
    nama: nama,
    setNama: setNama,
    timbanganList: timbanganList,
    setTimbanganList: setTimbanganList,
    timbangan: timbangan,
    setTimbangan: setTimbangan,
    catatan: catatan,
    setCatatan: setCatatan,
    saklarSpeech,
    setSaklarSpeech,
    namaRef: namaRef,
  };
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
export const useGlobal = () => {
  return useContext(GlobalContext);
};
