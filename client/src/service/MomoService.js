import axios from "axios";

export const createPay = async (data) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/payment/momo/create",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};


