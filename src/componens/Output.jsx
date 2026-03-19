import { useState, useEffect, useRef } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
import Popup from "../services/alert.js";
function Output() {
  const {
    clickSound,
    successSound,
    timbanganList,
    setTimbanganList,
    nama,
    setNama,
    setTimbangan,
    catatan,
    setCatatan,
    saklarSpeech,
    namaRef,
  } = useGlobal();
  const [output, setOutput] = useState(null);
  const [ceck, setCeck] = useState(true);
  useEffect(() => {
    const db = localStorage.getItem("timbangan");
    const t = JSON?.parse(db) || null;
    if (!t) return;
    setOutput(t.output);
  }, []);
  const onHanler = () => {
    const total = timbanganList.reduce((acc, item) => {
      return acc + Number(item);
    }, 0);
    if (!nama) {
      Popup.basic("Oops!", "silahkan tulis nama wonge!", "warning");
      return;
    }

    if (!ceck || total === 0 || timbanganList.length === 0) return;

    const hasilCatu = Math.floor((total / 6) * 10) / 10;

    successSound.play();

    setTimeout(() => {
      if (saklarSpeech)
        speech(`nganggo ${nama} catune, yaiku ${hasilCatu.toFixed(1)}`);
    }, 1300);

    const data = {
      id: Date.now(),
      nama: nama,
      timbanganList: timbanganList,
      jajaran: total,
      catu: hasilCatu,
    };
    setOutput(data);
    const db = JSON?.parse(localStorage.getItem("timbangan")) || {};
    db.output = data;
    localStorage.setItem("timbangan", JSON.stringify(db));

    setCatatan((prev) => {
      const update = [...prev, data];
      localStorage.setItem("catatan", JSON.stringify(update));
      return update;
    });
    setCeck(false);
  };
  const onClear = () => {
    setCeck(true);
    localStorage.removeItem("timbangan");
    namaRef.current.focus();
    clickSound.play();
    setOutput(null);
    setTimbanganList([]);
    setNama("");
    setTimbangan("");
  };
  const onUndo = () => {
    setCeck(true);
    clickSound.play();
    setOutput(null);
    setCatatan((prev) => prev.slice(0, -1));
  };
  return (
    <>
      <div className="text-center">
        <button
          className="btn btn-dark text-white"
          type="button"
          onClick={onHanler}
        >
          jumlah
        </button>
      </div>
      <p className="text-center fst-italic">hasil:</p>
      <br />
      {!output ? (
        <p className="text-center text-lg">???</p>
      ) : (
        <>
          <p className="text-center text-uppercase">{output.nama}</p>
          <p className="text-center">timbangan</p>
          <p className="text-center">{output.timbanganList.join("+")}</p>
          <p className="text-center">jajaran</p>
          <p className="text-center">{output.jajaran}</p>
          <p className="text-center">catu</p>
          <p className="text-center text-lg">{output.catu}</p>
          <br />
          <div className="text-center">
            <button
              className="btn btn-md btn-danger text-white"
              type="button"
              onClick={onUndo}
            >
              ulang
            </button>
          </div>
          <br />
          <div className="text-center">
            <button
              className="btn btn-md btn-dark text-white"
              type="button"
              onClick={onClear}
            >
              lanjut
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default Output;
