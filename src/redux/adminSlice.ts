import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Commercial } from "../interfaces/Commercial";
import { Teacher } from "../interfaces/Teacher";
import { Admin } from "../interfaces/Admin";

interface FetchUsersResponse {
  totalUsers: number;
  commercial: Commercial[];
  teacher: Teacher[];
}

interface adminState {
  isLoading: boolean;
  error: string | null;
  data: any;
  totalPercentage: Record<string, number> | null;
  chapitreId: string; // Ajouter la propriété chapitreId
  totalHours: number | null; // Ajouter la propriété totalHours
  commercial: Commercial[];
  teacher: Teacher[];
  admin: Admin[];
  loading: boolean; // Ajoutez la propriété `loading` ici
  status: "idle" | "loading" | "succeeded" | "failed";
  totalUsers: number;
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
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(
        isEmail
          ? { email: identifier, password }
          : { phone: identifier, password }
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();

    // Stocker le token dans le localStorage après la connexion réussie
    localStorage.setItem("TokenCommercial", data.data.accessToken);

    return data; // Assurez-vous que la réponse contient un objet avec une propriété payload
  }
);

export const createCompteUser = createAsyncThunk(
  "admin/createCompteUser",
  async ({
    email,
    password,
    phone,
  }: {
    email: string;
    password: string;
    phone: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, phone }), // Include IP address in request body
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return response.json(); // Assure that the response contains an object with a payload property
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to handle it in Redux thunk dispatch
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

// Définir le slice Redux pour gérer l'état
const adminState = createSlice({
  name: "admin",
  initialState: {
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
  } as adminState,
  reducers: {},
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
      .addCase(createCompteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Utilisateur créé avec succès:", action.payload);
      })
      .addCase(createCompteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        console.error(
          "Erreur lors de la création d'utilisateur :",
          action.error
        );
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
