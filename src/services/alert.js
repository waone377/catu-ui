import Swal from "sweetalert2";

class Popup {
  static async input() {
    // Input Nama File
    const resultNamaFile = await Swal.fire({
      title: "Masukkan Nama File",
      input: "text",
      inputLabel: "Nama File/sawah?",
      inputPlaceholder: "contoh: sawah_kulon",
      showCancelButton: true,
      confirmButtonText: "Simpen",
      cancelButtonText: "Batal",
      inputValidator: (value) => {
        if (!value) return "Nama file ora olih kosong!";
      },
    });

    // Cek Cancel di Nama File
    if (!resultNamaFile.isConfirmed) {
      return { resultNamaFile: resultNamaFile };
    }

    // Pilih Musim
    const resultMusim = await Swal.fire({
      title: "Pilih musim?",
      input: "select",
      inputOptions: {
        rendeng: "rendengan",
        sadon: "sadonan",
      },
      inputPlaceholder: "Pilih salah sawiji",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Batal",
      inputValidator: (value) => {
        if (!value) return "silahkan pilih!";
      },
    });

    return {
      resultNamaFile: resultNamaFile,
      resultMusim: resultMusim,
    };
  }

  static async clear() {
    return await Swal.fire({
      title: "bersihkan catatan?",
      text: "kabeh catatan akan di hapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "batal!",
    });
  }

  static async confirm(title, text) {
    return await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "batal!",
    });
  }

  static basic(title, text, icon) {
    Swal.fire({
      title,
      text,
      icon,
    });
  }
}

export default Popup;
