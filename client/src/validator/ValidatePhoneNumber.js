// ValidatePhoneNumber.js
export const validatePhoneNumber = (phone) => {
  if (!phone) {
    return "Số điện thoại không được để trống.";
  }

  // Chuẩn hóa: loại bỏ khoảng trắng
  const normalized = phone.trim();

  // Regex kiểm tra số điện thoại Việt Nam hợp lệ
  const vietnamPhoneRegex =
    /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;

  if (!vietnamPhoneRegex.test(normalized)) {
    return "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng Việt Nam.";
  }

  return null; // hợp lệ
};
