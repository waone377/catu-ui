import { useState, useRef } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
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
  } = useGlobal();
  const [jajaran, setJajaran] = useState(0);
  const [catu, setCatu] = useState(0);
  const [ceck, setCeck] = useState(true);
  const onHanler = () => {
    const total = timbanganList.reduce((acc, item) => {
      return acc + Number(item);
    }, 0);

    if (!ceck || total === 0 || !nama || timbanganList.length === 0) return;

    const hasilCatu = total / 6;

    successSound.play();

    setJajaran(total);
    setCatu(hasilCatu);
    setTimeout(() => {
      if (saklarSpeech)
        speech(`nganggo ${nama} catune, yaniku ${hasilCatu.toFixed(1)}`);
    }, 1300);

    const data = {
      id: Date.now(),
      nama: nama,
      timbanganList: timbanganList,
      jajaran: total,
      catu: hasilCatu,
    };

    setCatatan((prev) => [...prev, data]);
    setCeck(false);
  };
  const onClear = () => {
    setCeck(true);

    clickSound.play();
    setJajaran(0);
    setCatu(0);
    setTimbanganList([]);
    setNama("");
    setTimbangan("");
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
      {!jajaran || !catu ? (
        <p className="text-center text-lg">???</p>
      ) : (
        <>
          <p className="text-center text-uppercase">{nama}</p>
          <p className="text-center">timbangan</p>
          <p className="text-center">{timbanganList.join("+")}</p>
          <p className="text-center">jajaran</p>
          <p className="text-center">{jajaran}</p>
          <p className="text-center">catu</p>
          <p className="text-center text-lg">{catu.toFixed(1)}</p>
          <br />
          <div className="text-center">
            <button
              className="btn btn-md btn-dark text-white"
              type="button"
              onClick={onClear}
            >
              ×
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default Output;
