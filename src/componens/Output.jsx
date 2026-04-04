import { useState, useEffect, useRef } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import speech from "../services/suara.js";
import Popup from "../services/alert.js";
import Storage from "../services/storage.js";
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
    output,
    setOutput,
  } = useGlobal();
  // triger data output saat render
  useEffect(() => {
    const db = Storage.dbTimbangan("get", {
      nama: "",
      timbangan: [],
      output: null,
    });
    setOutput(db?.output || null);
  }, []);
  // fungsi tombol jumlah
  const onHanler = () => {
    const ceck = Storage.dbOnJumlah("get", "yes");

    const total = timbanganList.reduce((acc, item) => {
      return acc + Number(item);
    }, 0);
    if (ceck === "no" || total === 0 || timbanganList.length === 0) return;
    if (!nama) {
      Popup.basic("periksa!", "silahkan tulis nama wonge!", "warning");
      return;
    }
    // hasil catu

    let hasilCatu = Math.floor((total / 6) * 10) / 10;

    successSound.play();
    // triger suara voice

    setTimeout(() => {
      if (saklarSpeech) {
        speech(
          `nganggo ${nama} catune, yaiku ${String(hasilCatu.toFixed(1)).replace(".", ",")}`,
        );
      }
    }, 1300);

    const data = {
      id: Date.now(),
      nama: nama,
      timbanganList: timbanganList,
      jajaran: total,
      catu: hasilCatu,
    };
    setOutput(data);
    const db = Storage.dbTimbangan("get", { nama: "", timbangan: [] });
    Storage.dbTimbangan("post", { ...db, output: data });
    Storage.dbOnJumlah("post", "no");
  };
  // fungsi tombol lanjut
  const onLanjut = () => {
    clickSound.play();

    setCatatan((prev) => {
      const update = [...prev, output];
      setTimeout(() =>{
        Storage.dbCatatan("post", update);
      }, 500);
      return update;
    });
    if (saklarSpeech) {
      speech(`oke, ${nama}, wis kecatet, selanjute sapa?`);
    }
    namaRef.current.focus();
    setOutput(null);
    setTimbanganList([]);
    setNama("");
    setTimbangan("");
    Storage.dbOnJumlah("post", "yes");
    Storage.dbRemove("timbangan");
  };
  // fungsi tombol ulang
  const onUlang = () => {
    clickSound.play();
    Storage.dbOnJumlah("post", "yes");
    Storage.dbTimbangan("post", {
      nama: nama,
      timbangan: timbanganList,
    });
    setOutput(null);
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
          <p className="text-center text-lg">
            {String(output.catu).replace(".", ",")}
          </p>
          <br />
          <div className="text-center">
            <button
              className="btn btn-md btn-danger text-white"
              type="button"
              onClick={onUlang}
            >
              ulang
            </button>
          </div>
          <br />
          <div className="text-center">
            <button
              className="btn btn-md btn-dark text-white"
              type="button"
              onClick={onLanjut}
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
