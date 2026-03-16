import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
export const InputNama = () => {
  const { nama, setNama } = useGlobal();
  return (
    <>
      <div className="text-center">
        <input
          className="form-control"
          type="text"
          onChange={(e) => setNama(e.target.value)}
          value={nama}
          placeholder={!nama ? "nama wong.." : ""}
        />
      </div>
    </>
  );
};
export const InputTimbangan = () => {
  const {
    timbangan,
    setTimbangan,
    timbanganList,
    setTimbanganList,
    saklarSpeech,
  } = useGlobal();
  const onHanler = (e) => {
    if (e === "add") {
      if (!timbangan) return;
      setTimbangan("");
      if (saklarSpeech) speech(timbangan.toString());
      setTimbanganList((prev) => [...prev, timbangan]);
    } else {
      setTimbanganList((prev) => prev.slice(0, -1));
    }
  };
  return (
    <>
      <div className="text-center">
        <div className="input-group">
          <button
            className="btn btn-md btn-dark text-white"
            type="button"
            onClick={() => onHanler("undo")}
          >
            ×{" "}
          </button>
          <input
            className="form-control form-control-lg"
            type="number"
            onChange={(e) => setTimbangan(e.target.value)}
            value={timbangan}
            placeholder={!timbangan ? "anka timbangan.." : ""}
          />
          <button
            className="btn btn-md btn-dark text-white"
            type="button"
            onClick={() => onHanler("add")}
          >
            +{" "}
          </button>
        </div>
      </div>
    </>
  );
};
