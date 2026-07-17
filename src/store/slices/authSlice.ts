import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as loginAPI,
  signUp as signUpAPI,
} from '../../services/auth.service';
import type { LoginRequest, SignUpRequest } from '../../services/auth.service';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const getStoredToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { userData, rememberMe }: { userData: LoginRequest; rememberMe: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginAPI(userData);

      if (rememberMe) {
        localStorage.setItem('token', response.access_token);
      } else {
        sessionStorage.setItem('token', response.access_token);
      }

      return response.access_token;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Invalid email or password',
      );
    }
  },
);

export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (userData: SignUpRequest, { rejectWithValue }) => {
    try {
      const cleanedData = {
        email: userData.email,
        password: userData.password,
        data: {
          name: userData.data.name,
          ...(userData.data.job_title &&
            userData.data.job_title.trim() !== '' && {
              job_title: userData.data.job_title.trim(),
            }),
        },
      };

      const response = await signUpAPI(cleanedData);

      localStorage.setItem('token', response.access_token);
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }

      return response.access_token;
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes('422') ||
          error.message.includes('Unprocessable')
        ) {
          return rejectWithValue(
            'Invalid data. Please check your information.',
          );
        }
        if (
          error.message.includes('already') ||
          error.message.includes('exists')
        ) {
          return rejectWithValue('An account with this email already exists.');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Registration failed. Please try again.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getStoredToken(),
    isLoading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // 👇 Sign Up cases
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
