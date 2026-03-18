import { useEffect } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
export const InputNama = () => {
  const { nama, setNama, namaRef } = useGlobal();
  return (
    <>
      <div className="text-center">
        <input
          className="form-control"
          type="text"
          ref={namaRef}
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
    nama,
    setNama,
    timbangan,
    setTimbangan,
    timbanganList,
    setTimbanganList,
    saklarSpeech,
  } = useGlobal();
  useEffect(() => {
    const db = localStorage.getItem("timbangan");
    if (!db) return;

    const t = JSON.parse(db);

    if (t?.timbangan?.length) {
      setTimbanganList(t.timbangan);
    }

    if (t?.nama) {
      setNama(t.nama);
    }
  }, []);
  const onHanler = (e) => {
    if (e === "add") {
      if (!timbangan || timbangan.startsWith("0")) return;
      setTimbangan("");
      if (saklarSpeech) speech(timbangan);
      setTimbanganList((prev) => {
        const update = [...prev, Number(timbangan)];
        localStorage.setItem(
          "timbangan",
          JSON.stringify({ nama, timbangan: update }),
        );
        return update;
      });
    } else {
      setTimbanganList((prev) => {
        const update = prev.slice(0, -1);
        localStorage.setItem(
          "timbangan",
          JSON.stringify({ nama, timbangan: update }),
        );
        return update;
      });
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
