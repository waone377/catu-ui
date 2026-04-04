import { useEffect } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
import Storage from "../services/storage.js";
import Popup from "../services/alert.js";
// bagian komponen input nama
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
// bagian komponen input timbangan
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
  // triger awal jika ada timbangan
  useEffect(() => {
    const db = Storage.dbTimbangan("get", { nama: "", timbangan: [] });
    setNama(db?.nama || "");
    setTimbanganList(db?.timbangan || []);
  }, []);
  // fungsi tombol tambah dan hapus
  const onHanler = (e) => {
    if (e === "add") {
      if (!timbangan || timbangan.startsWith("0")) return;
      if (!nama) {
        Popup.basic("periksa!", "silahkan tulis nama wonge!", "warning");
        return;
      }
      setTimbangan("");
      if (saklarSpeech) speech(timbangan);
      setTimbanganList((prev) => {
        const update = [...prev, Number(timbangan)];
        Storage.dbTimbangan("post", { nama, timbangan: update });
        return update;
      });
    } else {
      if (timbanganList.length === 0) return;
      setTimbanganList((prev) => {
        const update = prev.slice(0, -1);
        Storage.dbTimbangan("post", { nama, timbangan: update });
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
            undo{" "}
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
