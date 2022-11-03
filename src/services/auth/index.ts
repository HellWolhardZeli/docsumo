import axios from "axios";

export const signIn = async (email: string, password: string) => {
  try {
    const res = await axios({
      method: "post",
      url: "https://apptesting.docsumo.com/api/v1/eevee/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
    } else {
    }
  }
};
