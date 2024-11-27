import { create } from 'zustand';
import { LLMModel } from '../types';

interface AppState {
  selectedModels: Set<string>;
  setSelectedModels: (models: Set<string>) => void;
  toggleModel: (modelId: string) => void;
  availableModels: LLMModel[];
  setAvailableModels: (models: LLMModel[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedModels: new Set(),
  setSelectedModels: (models) => set({ selectedModels: models }),
  toggleModel: (modelId) =>
    set((state) => {
      const newSelected = new Set(state.selectedModels);
      if (newSelected.has(modelId)) {
        newSelected.delete(modelId);
      } else if (newSelected.size < 5) {
        newSelected.add(modelId);
      }
      return { selectedModels: newSelected };
    }),
  availableModels: [],
  setAvailableModels: (models) => set({ availableModels: models }),
}));