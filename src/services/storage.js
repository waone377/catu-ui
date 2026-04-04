class Storage {
  static dbCatatan(m, value) {
    if (m === "get") {
      const db = localStorage.getItem("catatan") || JSON.stringify(value);
      const c = JSON.parse(db);
      return c;
    } else {
      localStorage.setItem("catatan", JSON.stringify(value));
    }
  }
  static dbTimbangan(m, value) {
    if (m === "get") {
      const db = localStorage.getItem("timbangan") || JSON.stringify(value);
      const c = JSON.parse(db);
      return c;
    } else {
      localStorage.setItem("timbangan", JSON.stringify(value));
    }
  }
  static dbOnJumlah(m, value) {
    if (m === "get") {
      return localStorage?.getItem("onjumlah") || value;
    } else {
      localStorage.setItem("onjumlah", value);
    }
  }
  static dbRemove(key) {
    localStorage.removeItem(key);
  }
}
export default Storage;
