import NhanVien from "./NhanVien.js";
import NhanVienList from "./NhanVien-list.js";
import Validation from "./validation.js";

export const getEleId = (id) => document.getElementById(id);

// Tạo đối tượng NhanVienList để dùng các Method
const nhanVienList = new NhanVienList();

// Tạo đối tượng Validation để dùng các Method Kiểm tra Dữ liệu
const validation = new Validation();

// Ngăn không cho nhập ngày tháng năm bằng phím
getEleId("datepicker").addEventListener("keydown", (event) => {
  event.preventDefault();
});
getEleId("datepicker").style["caret-color"] = "transparent";

// Lấy thông tin Nhân viên
const getInfoNhanVien = () => {
  const arrInput = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );
  const nhanVien = new NhanVien();
  for (let i = 0; i < arrInput.length; i++) {
    var id = arrInput[i].id;
    nhanVien[id] = arrInput[i].value;
  }

  // Gán cờ hiệu
  let isValid = true;

  // Validation Dữ liệu
  // Tài khoản
  isValid &=
    validation.checkEmptyValue(
      nhanVien.tknv,
      "tbTKNV",
      "Vui lòng nhập Tài khoản Nhân viên"
    ) && validation.checkRange(nhanVien.tknv, "tbTKNV", 4, 6);

  // Họ tên
  isValid &=
    validation.checkEmptyValue(
      nhanVien.name,
      "tbTen",
      "Vui lòng nhập Họ và Tên Nhân viên"
    ) &&
    validation.checkName(
      nhanVien.name,
      "tbTen",
      "Vui lòng nhập Tên Nhân viên là chữ"
    );

  // Email
  isValid &=
    validation.checkEmptyValue(
      nhanVien.email,
      "tbEmail",
      "Vui lòng nhập Email"
    ) &&
    validation.checkEmail(
      nhanVien.email,
      "tbEmail",
      "Vui lòng nhập đúng định dạng Email"
    );

  // Mật khẩu
  isValid &=
    validation.checkEmptyValue(
      nhanVien.password,
      "tbMatKhau",
      "Vui lòng nhập Mật khẩu"
    ) &&
    validation.checkPassword(
      nhanVien.password,
      "tbMatKhau",
      "Vui lòng nhập Mật khẩu có độ dài 6-10 ký tự và chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  // Ngày làm
  isValid &= validation.checkEmptyValue(
    nhanVien.datepicker,
    "tbNgay",
    "Vui lòng nhập Ngày vào làm"
  );

  // Lương cơ bản
  isValid &=
    validation.checkEmptyValue(
      nhanVien.luongCB,
      "tbLuongCB",
      "Vui lòng nhập Lương cơ bản"
    ) &&
    validation.checkMinMaxValue(
      nhanVien.luongCB,
      "tbLuongCB",
      1000000,
      20000000
    );

  // Chức vụ
  isValid &= validation.checkEmptyValue(
    nhanVien.chucvu,
    "tbChucVu",
    "Vui lòng chọn Chức vụ"
  );

  // Giờ làm
  isValid &=
    validation.checkEmptyValue(
      nhanVien.gioLam,
      "tbGiolam",
      "Vui lòng nhập Số Giờ làm"
    ) && validation.checkHour(nhanVien.gioLam, "tbGiolam", 80, 200);

  if (isValid) {
    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNV();

    return nhanVien;
  }
};

// Render Giao diện Nhân viên
const renderNhanVien = (arrNhanVien) => {
  let content = "";
  for (let i = 0; i < arrNhanVien.length; i++) {
    const nhanVien = arrNhanVien[i];
    const newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    const [thang, ngay, nam] = newNhanVien.datepicker.split("/");
    const date = new Date(`${nam}/${thang}/${ngay}`);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    content += `
    <tr>
      <td>${newNhanVien.tknv}</td>
      <td>${newNhanVien.name}</td>
      <td>${newNhanVien.email}</td>
      <td>${month}/${day}/${year}</td>
      <td>${newNhanVien.chucvu}</td>
      <td>${nhanVienList.formatLuong(String(newNhanVien.tongLuong))}VND</td>
      <td>${newNhanVien.xepLoai}</td>
      <td>
        <button class="btn btn-danger" onclick="handleDeleteNV('${
          newNhanVien.tknv
        }')">Xóa</button>  
        <button class="btn btn-warning" onclick="handleEditNV('${
          newNhanVien.tknv
        }')">Sửa</button>  
      </td>
    </tr>
    `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

// Set Local Storage
const setLocalStorage = () => {
  const dataJSON = nhanVienList.arr;

  // Chuyển Data thành String vì dung lượng Local Storage chỉ có 5MB
  const dataString = JSON.stringify(dataJSON);
  // Lưu Data đã được chuyển thành String xuống LocalStorage
  localStorage.setItem("NHANVIEN_LIST", dataString);
};

// Get Local Storage
const getLocalStorage = () => {
  const dataString = localStorage.getItem("NHANVIEN_LIST");

  // Kiểm tra xem dataString có bị null hay không
  if (dataString) {
    // Chuyển Data kiểu String thành ngược lại kiểu JSON
    const dataJSON = JSON.parse(dataString);
    // Cập nhật dữ liệu từ Local Storage lại vào mảng
    nhanVienList.arr = dataJSON;
    renderNhanVien(nhanVienList.arr);
  }
};
// Render ra giao diện từ Local Storage
getLocalStorage();

// Xử lý UI nút Thêm
getEleId("btnThem").onclick = () => {
  // Tiêu đề Modal
  getEleId("header-title").innerHTML = "Thêm Nhân viên";

  // Hiển thị lại nút Thêm
  getEleId("btnThemNV").style.display = "inline-block";

  // Ẩn nút Cập nhật
  getEleId("btnCapNhat").style.display = "none";

  // Mở khóa Mã Nhân viên
  getEleId("tknv").removeAttribute("disabled");

  // Reset Modal
  document.querySelector(".modal-body > form").reset();
};

// Thêm Nhân viên
getEleId("btnThemNV").onclick = function () {
  // Định dạng lại chuỗi Lương trước khi lưu vào mảng
  getEleId("luongCB").value = getEleId("luongCB").value.replace(/[^0-9]/g, "");

  const nhanVien = getInfoNhanVien();
  if (!nhanVien) return;

  // Thêm Nhân viên vào mảng
  nhanVienList.addNhanVien(nhanVien);

  // Lưu mảng Nhân viên vào Local Storage
  setLocalStorage();

  // Render ra giao diện
  renderNhanVien(nhanVienList.arr);

  // Đóng Modal
  getEleId("btnDong").click();
};

// Xóa Nhân viên
const handleDeleteNV = (id) => {
  nhanVienList.deleteNhanVien(id);

  // Lưu mảng Nhân viên vào Local Storage
  setLocalStorage();

  // Render ra giao diện
  renderNhanVien(nhanVienList.arr);
};

// Xử lý thông tin Nhân viên cần sửa
const handleEditNV = (tknv) => {
  // Tiêu đề Modal
  getEleId("header-title").innerHTML = "Chỉnh sửa Nhân viên";

  // Ẩn nút Thêm
  getEleId("btnThemNV").style.display = "none";

  // Hiển thị lại Modal khi nhấn nút Sửa
  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  myModal.show();

  const nhanVien = nhanVienList.findEditNhanVien(tknv);

  if (nhanVien) {
    // Hiển thị lại nút Cập nhật
    getEleId("btnCapNhat").style.display = "inline-block";

    // Hiển thị lại các giá trị lên form
    const arrInput = document.querySelectorAll(
      ".modal-body input, .modal-body select"
    );
    for (let i = 0; i < arrInput.length; i++) {
      let id = arrInput[i].id;
      arrInput[i].value = nhanVien[id];
    }
    // Khóa mã Nhân viên không được sửa
    getEleId("tknv").setAttribute("disabled", true);
  }
};

// Cập nhật Nhân viên
getEleId("btnCapNhat").onclick = () => {
  // Định dạng lại chuỗi Lương trước khi lưu vào mảng
  getEleId("luongCB").value = getEleId("luongCB").value.replace(/[^0-9]/g, "");

  // Lấy thông tin Nhân viên đã nhập ở Form
  const nhanVien = getInfoNhanVien();

  if (nhanVien) {
    // Cập nhật Nhân viên
    nhanVienList.updateNhanVien(nhanVien);

    // Lưu mảng Nhân viên vào Local Storage
    setLocalStorage();

    // Render lại giao diện
    renderNhanVien(nhanVienList.arr);

    // Đóng Modal
    getEleId("btnDong").click();
  }
};

// Tìm kiếm Nhân viên
const handleSearchNV = (event) => {
  // Lấy thông tin nhập trên input thông qua oninput
  let value = event.target.value;
  const arrNhanVienSearch = nhanVienList.searchNhanVien(value);

  // Render lại giao diện
  renderNhanVien(arrNhanVienSearch);
};

// Khai báo các Hàm là Global Function -> Đăng ký với window
window.handleDeleteNV = handleDeleteNV;
window.handleEditNV = handleEditNV;
window.handleSearchNV = handleSearchNV;

// Format Lương trong lúc nhập
getEleId("luongCB").addEventListener("input", (event) => {
  event.target.value = nhanVienList.formatLuong(event.target.value);
});
