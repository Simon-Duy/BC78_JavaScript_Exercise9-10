import { getEleId } from "./main.js";

class Validation {
  // Hàm bỏ dấu tiếng việt
  removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }

  checkEmptyValue(value, divId, mess) {
    if (value === "") {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    } else {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }
  }

  checkRange(value, divId, min, max) {
    let arrValue = value.split("");
    if (arrValue.length >= min && arrValue.length <= max) {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      getEleId(
        divId
      ).innerHTML = `Vui lòng nhập giá trị có độ dài từ ${min} đến ${max} ký tự`;
      getEleId(divId).style.display = "block";
      return false;
    }
  }

  checkName(value, divId, mess) {
    const regexName = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

    let isValid = regexName.test(value);
    if (!isValid) {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    } else {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }
  }

  checkEmail(value, divId, mess) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.match(regexEmail)) {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    } else {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }
  }

  checkPassword(value, divId, mess) {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    if (!value.match(regexPassword)) {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    } else {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }
  }

  checkMinMaxValue(value, divId, min, max) {
    let newValue = Number(value);
    if (newValue >= min && newValue <= max) {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      getEleId(
        divId
      ).innerHTML = `Vui lòng nhập Lương cơ bản từ ${min.toLocaleString({
        style: "currency",
        currency: "VND",
      })}VND đến ${max.toLocaleString({
        style: "currency",
        currency: "VND",
      })}VND`;
      getEleId(divId).style.display = "block";
      return false;
    }
  }

  checkHour(value, divId, min, max) {
    let newValue = Number(value);
    if (newValue >= min && newValue <= max) {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      getEleId(divId).innerHTML = `Vui lòng nhập Giờ làm từ ${min} đến ${max}`;
      getEleId(divId).style.display = "block";
      return false;
    }
  }
}

export default Validation;
