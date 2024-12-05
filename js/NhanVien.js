class NhanVien {
  constructor(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  ) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
  }

  tinhTongLuong() {
    if (this.chucvu === "Sếp") {
      this.tongLuong = this.luongCB * 1 * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      this.tongLuong = this.luongCB * 1 * 2;
    } else {
      this.tongLuong = this.luongCB * 1;
    }
  }

  xepLoaiNV() {
    if (this.gioLam * 1 >= 192) {
      this.xepLoai = "Xuất sắc";
    } else if (this.gioLam * 1 >= 176) {
      this.xepLoai = "Giỏi";
    } else if (this.gioLam * 1 >= 160) {
      this.xepLoai = "Khá";
    } else {
      this.xepLoai = "Trung bình";
    }
  }
}

export default NhanVien;
