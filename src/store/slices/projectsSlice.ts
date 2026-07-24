import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '../../services/projects.service';

interface ProjectsState {
  items: Project[];
  selectedProjectId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  selectedProjectId: null,
  isLoading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.unshift(action.payload);
    },
    updateProjectInList: (state, action: PayloadAction<Project>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setSelectedProjectId: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProjects: (state) => {
      state.items = [];
      state.selectedProjectId = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProjectInList,
  removeProject,
  setSelectedProjectId,
  setLoading,
  setError,
  clearProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
