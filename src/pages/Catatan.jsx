import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGlobal } from "../contexts/GlobalContext";
import Popup from "../services/alert.js";

function Catetan() {
  const { clickSound, catatan, setCatatan } = useGlobal();
  const [namaFile, setNamaFile] = useState("");
  const [musim, setMusim] = useState("");

  // Ambil data dari localStorage saat pertama render
  useEffect(() => {
    const db = localStorage.getItem("catatan") || "[]";
    const c = JSON.parse(db);
    if (c.length !== 0) {
      setCatatan(c);
    }
  }, []);

  // Simpan ke localStorage setiap catatan berubah
  useEffect(() => {
    localStorage.setItem("catatan", JSON.stringify(catatan));
  }, [catatan]);

  const onClear = async () => {
    const resultClear = await Popup.clear();
    if (resultClear.isConfirmed) {
      setCatatan([]);
    }
  };

  const onDelete = async (c) => {
    const resultDelete = await Popup.confirm(
      "konfirmasi?",
      "yakin ingin hapus datane " + c.nama.toUpperCase() + "!",
    );
    if (!resultDelete.isConfirmed) return;
    const catatanFilter = catatan.filter((e) => e.id !== c.id);
    clickSound.play();
    setCatatan(catatanFilter);
  };

  const onUnduh = async () => {
    const waktu = format(new Date(), "EEEE, dd-MMMM-yyyy | HH:mm", {
      locale: id,
    });
    if (catatan.length === 0) return;

    const { resultNamaFile, resultMusim } = await Popup.input();

    if (!resultNamaFile.isConfirmed || !resultMusim.isConfirmed) return;

    const namaFile = resultNamaFile.value;
    const musim = resultMusim.value;

    const header = `DATA PENCATUAN
waktu: ${waktu}
sawah: ${namaFile}
musim: ${musim}
====
`;

    const text = catatan
      .map((e) => {
        return `  ${e.nama.toUpperCase()}
  timbangan
  ${e.timbanganList.join("+")}
  jajaran
  ${e.jajaran}
  catu
  ${e.catu}
~#~
`;
      })
      .join("\n");

    const totalCatu = catatan.reduce((acc, e) => acc + Number(e.catu), 0);
    const totalJajaran = catatan.reduce((acc, e) => acc + Number(e.jajaran), 0);
    const bersih = totalJajaran - totalCatu;

    const kalkulasi = `====
  total catu: ${Math.floor(totalCatu * 10) / 10}
  hasil kotor: ${totalJajaran}
  hasil bersih: ${Math.floor(bersih * 10) / 10}`;

    const blob = new Blob([header + text + kalkulasi], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${namaFile}.txt`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h1 className="text-center">catatan</h1>
      <br />

      {catatan.length === 0 ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p className="text-center fst-italic text-muted">
            catatan masih kosong...
          </p>
        </>
      ) : (
        <>
          <div className="d-flex flex-fill justify-content-between">
            <button
              className="btn btn-primary text-white"
              type="button"
              onClick={onClear}
            >
              clear
            </button>
            <p className="fw-bold">{catatan.length}</p>

            <button
              className="btn btn-primary text-white"
              type="button"
              onClick={onUnduh}
            >
              unduh
            </button>
          </div>

          <br />

          {catatan.map((e) => (
            <div key={e.id}>
              <p className="text-center text-uppercase">{e.nama}</p>
              <p className="text-center">timbangan</p>
              <p className="text-center">{e.timbanganList.join("+")}</p>
              <p className="text-center">jajaran</p>
              <p className="text-center">{e.jajaran}</p>
              <p className="text-center">catu</p>
              <p className="text-center text-lg">{e.catu.toFixed(1)}</p>

              <div className="text-center">
                <button
                  className="btn btn-sm btn-dark text-white"
                  type="button"
                  onClick={() => onDelete(e)}
                >
                  ×
                </button>
              </div>

              <p className="text-center fw-bold fst-italic">~#~</p>

              <br />
              <br />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Catetan;
