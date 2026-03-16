import { useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGlobal } from "../contexts/GlobalContext";

function Catatan() {
  const { clickSound, catatan, setCatatan } = useGlobal();

  // ambil data dari localStorage saat pertama render
  useEffect(() => {
    const db = localStorage.getItem("catatan") || "[]";
    const c = JSON.parse(db);

    if (c.length !== 0) {
      setCatatan(c);
    }
  }, []);

  // simpan ke localStorage setiap catatan berubah
  useEffect(() => {
    localStorage.setItem("catatan", JSON.stringify(catatan));
  }, [catatan]);

  const onDelete = (id) => {
    const catatanFilter = catatan.filter((e) => e.id !== id);
    clickSound.play();
    setCatatan(catatanFilter);
  };

  const onUnduh = () => {
    const waktu = format(new Date(), "EEEE, dd-MMMM-yyyy | HH:mm", {
      locale: id,
    });
    if (catatan.length === 0) return;
    const header = `DATA PENCATUAN
waktu: ${waktu}
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
  ${e.catu.toFixed(1)}
~#~
`;
      })
      .join("\n");

    const totalCatu = catatan.reduce((acc, e) => {
      return acc + Number(e.catu);
    }, 0);

    const totalJajaran = catatan.reduce((acc, e) => {
      return acc + Number(e.jajaran);
    }, 0);

    const bersih = totalJajaran - totalCatu;

    const kalkulasi = `====
  total catu: ${totalCatu.toFixed(1)}
  hasil kotor: ${totalJajaran}
  hasil bersih: ${bersih.toFixed(1)}`;

    const blob = new Blob([header + text + kalkulasi], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "catatan.txt";
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
          <div className="text-center">
            <button
              className="btn btn-primary text-white"
              type="button"
              onClick={() => setCatatan([])}
            >
              clear
            </button>

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
                  onClick={() => onDelete(e.id)}
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

export default Catatan;
