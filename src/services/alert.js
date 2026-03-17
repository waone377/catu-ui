import Swal from "sweetalert2";

class Popup {
  static async input() {
    // Input Nama File
    const resultNama = await Swal.fire({
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
    if (!resultNama.isConfirmed) {
      return { resultNamaFile: resultNama };
    }

    // Pilih Musim
    const resultMusim = await Swal.fire({
      title: "Pilih musim?",
      input: "select",
      inputOptions: {
        sadon: "sadonan",
        rendeng: "rendengan",
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
      resultNamaFile: resultNama,
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

  static success(title, text) {
    Swal.fire({
      title,
      text,
      icon: "success",
    });
  }
}

export default Popup;
