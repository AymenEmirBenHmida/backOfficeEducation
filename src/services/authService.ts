import axios from "../config/axiosConfig";
interface ActivateUserParams {
  phone?: string;
  email?: string;
  password: string;
  verificationCode: string;
}
//notify back to send an activation code
export const sendActivationService = async (
  phone: string,
  password: string
) => {
  try {
    const response = await axios.put("auth/sendActivationCode", {
      phone: phone,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//  activate a user
export const activateUserService = async ({
  phone,
  password,
  email,
  verificationCode,
}: ActivateUserParams) => {
  try {
    const response = await axios.put("auth/activate", {
      ...(email ? { email } : { phone }),
      password: password,
      verificationCode: verificationCode,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//refresh token
export const refreshTokenService = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  try {
    const response = await axios.post("api/auth/refreshToken", {
      refreshToken: refreshToken,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
