import Validation from "./validation.js";

class NhanVienList {
  constructor() {
    this.arr = [];
  }

  addNhanVien(NhanVien) {
    this.arr.push(NhanVien);
  }

  findIndexNhanVien(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const nhanVien = this.arr[i];
      if (id === nhanVien.tknv) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteNhanVien(id) {
    const index = this.findIndexNhanVien(id);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  findEditNhanVien(id) {
    const index = this.findIndexNhanVien(id);

    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  }

  updateNhanVien(nhanVien) {
    const index = this.findIndexNhanVien(nhanVien.tknv);
    if (index !== -1) {
      this.arr[index] = nhanVien;
    }
  }

  searchNhanVien(keyword) {
    let newArr = [];
    const validation = new Validation();
    const keywordLowerCase = validation.removeVietnameseTones(
      keyword.trim().toLowerCase()
    );
    for (let i = 0; i < this.arr.length; i++) {
      const nhanVien = this.arr[i];
      const nhanVienKeyword = validation.removeVietnameseTones(
        nhanVien.xepLoai.trim().toLowerCase()
      );

      if (nhanVienKeyword.indexOf(keywordLowerCase) !== -1) {
        newArr.push(nhanVien);
      }
    }
    return newArr;
  }

  // Định dạng Lương mỗi khi nhập
  // Đầu vào chỉ nhận kiểu dữ liệu String -> Ép kiểu trước truyền tham số
  formatLuong = (inputLuong) => {
    // Loại bỏ các ký tự không phải là số
    let newValue = inputLuong.replace(/[^0-9]/g, "");

    // Thêm dấu phân cách hàng nghìn
    newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return newValue;
  };
}

export default NhanVienList;
