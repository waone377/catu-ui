import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGlobal } from "../contexts/GlobalContext";
import Popup from "../services/alert.js";
import Storage from "../services/storage.js";

function Catetan() {
  const { clickSound, catatan, setCatatan } = useGlobal();
  const [namaFile, setNamaFile] = useState("");
  const [musim, setMusim] = useState("");

  // Ambil data dari localStorage saat pertama render
  useEffect(() => {
    const db = Storage.dbCatatan("get", []);
    setCatatan(db || []);
  }, []);

  // fungsi clear catatan

  const onClear = async () => {
    const resultClear = await Popup.clear();
    if (resultClear.isConfirmed) {
      clickSound.play();
      Storage.dbCatatan("post", []);
      setCatatan([]);
    }
  };
  // fungsi hapus user by id

  const onDelete = async (c) => {
    const resultDelete = await Popup.confirm(
      "konfirmasi?",
      "yakin ingin hapus datane " + c.nama.toUpperCase() + "!",
    );
    if (!resultDelete.isConfirmed) return;
    clickSound.play();
    setCatatan((prev) => {
      const update = prev.filter((e) => e.id !== c.id);
      Storage.dbCatatan("post", update);
      return update;
    });
  };
  // fungsi unduh catatan

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
  ${String(e.catu).replace(".", ",")}
~#~
`;
      })
      .join("\n");

    let totalCatu = catatan.reduce((acc, e) => acc + Number(e.catu), 0);
    totalCatu = Math.floor(totalCatu * 10) / 10;
    const totalJajaran = catatan.reduce((acc, e) => acc + Number(e.jajaran), 0);
    let bersih = totalJajaran - totalCatu;
    bersih = Math.floor(bersih * 10) / 10;

    const kalkulasi = `====
  total catu: ${String(totalCatu).replace(".", ",")}
  hasil kotor: ${totalJajaran}
  hasil bersih: ${String(bersih).replace(".", ",")}`;

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
              <p className="text-center text-lg">
                {String(e.catu.toFixed(1)).replace(".", ",")}
              </p>

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
