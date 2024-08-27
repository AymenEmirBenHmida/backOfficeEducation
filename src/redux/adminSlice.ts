import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Commercial } from "../interfaces/Commercial";
import { Teacher } from "../interfaces/Teacher";
import { Admin } from "../interfaces/Admin";
import { AdminState } from "../interfaces/AdminState";
import { jwtDecode } from "jwt-decode";
import { AccessToken } from "../interfaces/AcessToken";
import {
  activateUserService,
  sendActivationService,
} from "./../services/authService";
import axios from "@/config/axiosConfig";
// variable secret key used for encrypting and decrypting role
const key = import.meta.env.VITE_SECRET_KEY;
if (!key) {
  throw new Error("secret key is undefined");
}

export const getAllCommercial = createAsyncThunk(
  "commercial/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
      const response = await axios.get<{ data: Commercial[] }>(
        "/api/commercial/getAll"
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllTeacher = createAsyncThunk(
  "teacher/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
      const response = await axios.get<{ data: Teacher[] }>(
        "/api/teacher/getAll"
      ); // Utilisez Teacher[] ici
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getTeacherById = createAsyncThunk(
  "teacher/getTeacherById",
  async (TeacherId: string) => {
    try {
      const response = await axios.get(`/api/teacher/${TeacherId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const commercialResponse = await dispatch(getAllCommercial());
      const teacherResponse = await dispatch(getAllTeacher());
      return {
        commercial: commercialResponse.payload,
        teacher: teacherResponse.payload,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
//counting users
export const CountUsers = createAsyncThunk<{ totalUsers: number }, void>(
  "users/CountUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Appel aux actions pour récupérer les données
      const commercialResponse = await dispatch(getAllCommercial());
      const teacherResponse = await dispatch(getAllTeacher());

      // Compter le nombre total d'utilisateurs
      const totalCommercialUsers = (commercialResponse.payload as Commercial[])
        .length;
      const totalTeacherUsers = (teacherResponse.payload as Teacher[]).length;
      const totalUsers = totalCommercialUsers + totalTeacherUsers;

      // Retourner le nombre total d'utilisateurs
      return { totalUsers };
    } catch (error: any) {
      // En cas d'erreur, rejeter la valeur avec le message d'erreur
      return rejectWithValue(error.message);
    }
  }
);
//deleting commercial
export const deleteCommercialById = createAsyncThunk(
  "admin/deleteCommercialById",
  async (commercialId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error(
          "Token d'authentification introuvable dans le localStorage"
        );
      }
      await axios.delete(`/api/commercial/delete?id=${commercialId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return commercialId;
    } catch (error) {
      throw error;
    }
  }
);
//deleting teacher
export const deleteTeacherById = createAsyncThunk(
  "admin/deleteTeacherById",
  async (teacherId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error(
          "Token d'authentification introuvable dans le localStorage"
        );
      }
      await axios.delete(`/api/teacher/delete?id=${teacherId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return teacherId;
    } catch (error) {
      throw error;
    }
  }
);
//update  commercial
export const updateCommercial = createAsyncThunk(
  "admin/updateCommercial",
  async (updatedCommercialData: any) => {
    try {
      const response = await axios.put(
        `/api/commercial/update?id=${updatedCommercialData.commercialId}`,
        updatedCommercialData
      );
      return response.data; // Retourne les données mises à jour du cours
    } catch (error) {
      throw error;
    }
  }
);
//updating teacher
export const updateTeacher = createAsyncThunk(
  "admin/updateTeacher",
  async (updatedTeacherData: {
    teacherId: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    role: string;
  }) => {
    try {
      const response = await axios.put(
        `/api/teacher/update?id=${updatedTeacherData.teacherId}`,
        updatedTeacherData
      );
      return response.data; // Retourne les données mises à jour du cours
    } catch (error) {
      throw error;
    }
  }
);

export const createCommercial = createAsyncThunk(
  "admin/createCommercial",
  async (userData: any, { rejectWithValue }) => {
    try {
      const TokenCommercial = localStorage.getItem("TokenCommercial");
      if (!TokenCommercial) {
        throw new Error(
          "Token d'authentification introuvable dans le localStorage"
        );
      }
      const response = await axios.post("/api/commercial/create", userData, {
        headers: {
          Authorization: `Bearer ${TokenCommercial}`,
        },
      });
      return response.data;
    } catch (error: any) {
      // Utilisation de rejectWithValue pour gérer l'erreur
      return rejectWithValue(error.message);
    }
  }
);
//creating a teacher
export const createTechear = createAsyncThunk(
  "admin/createTechear",
  async (userData: any) => {
    try {
      const TokenCommercial = localStorage.getItem("TokenCommercial");
      if (!TokenCommercial) {
        throw new Error(
          "Token d'authentification introuvable dans le localStorage"
        );
      }
      const response = await axios.post("/api/teacher/create", userData, {
        headers: {
          Authorization: `Bearer ${TokenCommercial}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
//loggin in user
export const loginUser = createAsyncThunk(
  "admin/login",
  async ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: isEmail ? identifier : undefined,
          phone: !isEmail ? identifier : undefined,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Store tokens and role in localStorage
      const role = data.data?.user?.user_metadata?.role || "guest";
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      return { ...data, role }; // Ensure the response contains an object with a property payload
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
);

export const sendActivationCode = createAsyncThunk(
  "user/activation-code",
  async ({ phone, password }: { phone: string; password: string }) => {
    try {
      const response = await sendActivationService(phone, password);
      return response;
    } catch (error) {}
  }
);

export const activateUser = createAsyncThunk(
  "user/activation-code",
  async ({
    phone,
    password,
    email,
    verificationCode,
  }: {
    phone: string;
    password: string;
    email: string;
    verificationCode: string;
  }) => {
    try {
      const response = await activateUserService({
        email: email,
        password: password,
        verificationCode: verificationCode,
      });
      return response;
    } catch (error) {}
  }
);

export const createCompteUser = createAsyncThunk(
  "admin/createCompteUser",
  async (
    {
      email,
      password,
      phone,
    }: { email: string; password: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email, password, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status === "OK") {
        return { data, email, password, phone };
      } else {
        // Ensure the error is correctly passed using rejectWithValue
        return rejectWithValue({
          message: data.message || "An error occurred while creating the user",
          status: data.status || "Unknown Error",
        });
      }
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message ||
            "An error occurred while creating the user",
          status: error.response.data.status || "Unknown Error",
        });
      } else if (error instanceof Error) {
        return rejectWithValue({
          message: error.message || "An unexpected error occurred",
          status: "Unexpected Error",
        });
      } else {
        return rejectWithValue({
          message: "An unknown error occurred",
          status: "Unknown Error",
        });
      }
    }
  }
);
export const updateAdmin = createAsyncThunk(
  "admin/updateAdmin",
  async (updatedAdminData: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.put(
        `/api/admin/update?id=${updatedAdminData.adminId}`,
        updatedAdminData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Retourne les données mises à jour de l'administrateur
    } catch (error) {
      throw error;
    }
  }
);
//decrypt the role
const decryptRole = (): string => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) {
      const accessTokenObject: AccessToken = jwtDecode(accessToken);

      const decrypted = accessTokenObject.user_metadata!.role;
      return decrypted!;
    }
  } catch (error) {
    console.error(error);
  }
  return "guest";
};

// Définir le slice Redux pour gérer l'état
const adminState = createSlice({
  name: "admin",
  initialState: {
    user: null,
    role: decryptRole() || "guest", // Get encrypted role from localStorage

    chapitreId: "",
    totalHours: null,
    totalPercentage: null,
    commercial: [],
    teacher: [],
    admin: [],
    isLoading: false, // Changed to isLoading
    data: null,
    error: null as string | null,
    loading: false,
    status: "idle",
    totalUsers: 0,
    userInfo: { password: "", email: "", phone: "" },
  } as AdminState,
  reducers: {
    logout: (state) => {
      state.role = "guest";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("TokenCommercial");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommercial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllCommercial.fulfilled,
        (state, action: PayloadAction<Commercial[]>) => {
          state.isLoading = false;
          state.commercial = action.payload;
        }
      )
      .addCase(getAllCommercial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message.toString()
          : null; // Assurez-vous que l'erreur est de type 'string'
      })
      .addCase(getAllTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllTeacher.fulfilled,
        (state, action: PayloadAction<Teacher[]>) => {
          state.isLoading = false;
          state.teacher = action.payload;
        }
      )
      .addCase(getAllTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message.toString()
          : null; // Assurez-vous que l'erreur est de type 'string'
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.commercial)) {
          state.commercial = action.payload.commercial as Commercial[];
        }
        if (Array.isArray(action.payload.teacher)) {
          state.teacher = action.payload.teacher as Teacher[];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        deleteCommercialById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.commercial = state.commercial.filter(
            (item) => item.id !== action.payload
          );
        }
      )
      .addCase(deleteCommercialById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        deleteTeacherById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.teacher = state.teacher.filter(
            (item) => item.id !== action.payload
          );
        }
      )
      .addCase(deleteTeacherById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateCommercial.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCommercialIndex = state.commercial.findIndex(
          (commercialItem) => commercialItem.id === action.payload.id
        );
        if (updatedCommercialIndex !== -1) {
          state.commercial[updatedCommercialIndex] = action.payload;
        }
      })
      .addCase(updateCommercial.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          "Une erreur est survenue lors de la mise à jour du cours";
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTeacherIndex = state.teacher.findIndex(
          (teacherItem) => teacherItem.id === action.payload.id
        );
        if (updatedTeacherIndex !== -1) {
          state.teacher[updatedTeacherIndex] = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          "Une erreur est survenue lors de la mise à jour du cours";
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAdminIndex = state.admin.findIndex(
          (adminItem) => adminItem.id === action.payload.id
        );
        if (updatedAdminIndex !== -1) {
          state.commercial[updatedAdminIndex] = action.payload;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          "Une erreur est survenue lors de la mise à jour du cours";
      })
      .addCase(createCommercial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCommercial.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Utilisateur commercial créé avec succès:", action.payload);
      })
      .addCase(createCommercial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        console.error(
          "Erreur lors de la création d'utilisateur commercial:",
          action.error
        );
      })
      .addCase(createTechear.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTechear.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Utilisateur Techear créé avec succès:", action.payload);
      })
      .addCase(createTechear.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        console.error(
          "Erreur lors de la création d'utilisateur Techear:",
          action.error
        );
      })
      .addCase(createCompteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createCompteUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
            password: string;
            phone: string;
          }>
        ) => {
          console.log(action.payload);
          state.isLoading = false;
          state.userInfo!.password = action.payload.password;
          state.userInfo!.email = action.payload.email;
          state.userInfo!.phone = action.payload.phone;
          console.log("Utilisateur créé avec succès:", action.payload);
        }
      )
      .addCase(createCompteUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        // // Check if the payload is available and has the expected structure
        // if (action.payload && typeof action.payload === "object") {
        //   state.error = action.payload as {
        //     message: string;
        //     status: string;
        //   };
        // } else {
        //   state.error = {
        //     message: action.error.message || "An unexpected error occurred",
        //     status: "Unknown Error",
        //   };
        // }
        })
      .addCase(CountUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers; // Stockez le nombre total d'utilisateurs dans l'état global
      })
      .addCase(CountUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Enregistrez l'erreur s'il y en a une
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.role = action.payload.role;
        // const encryptedRole = CryptoJS.AES.encrypt(
        //   action.payload.role,
        //   key
        // ).toString();
        // localStorage.setItem("role", encryptedRole);
        localStorage.setItem(
          "TokenCommercial",
          action.payload.data.accessToken
        );
        state.data = action.payload.data;
        console.log("Connecté avec succès:", action.payload);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        console.error(
          "Erreur lors de la connexion de l'utilisateur:",
          action.error
        );
      })
      .addCase(getTeacherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default adminState.reducer;
export const { logout } = adminState.actions;
export const selectUserRole = (state: { admin: AdminState }) =>
  state.admin.role; // Sélecteur pour accéder au rôle
export const selectUserInfo = (state: { admin: AdminState }) =>
  state.admin.userInfo!; // Sélecteur pour accéder au rôle
