import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubmissionState {
  [key: string]: string | string[] | undefined | null | boolean;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

export const emptySubmission: SubmissionState = {
  submitting: false,
  submitted: false,
  error: null,
};

const getInitialState = (): SubmissionState => {
  const savedData = localStorage.getItem("customerSubmissionData");
  if (savedData) {
    return JSON.parse(savedData);
  }
  return JSON.parse(JSON.stringify(emptySubmission)) as SubmissionState;
};

const submissionSlice = createSlice({
  name: "form",
  initialState: getInitialState(),
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof SubmissionState;
        value: string | boolean;
      }>,
    ) => {
      const { field, value } = action.payload;
      if (field !== "pageVisited") {
        state[field] = value;
      }
      try {
        localStorage.setItem("customerSubmissionData", JSON.stringify(state));
      } catch (error) {}
    },
    clearSubmission: (state) => {
      const emptyFormInstance = Object.assign(
        state,
        JSON.parse(JSON.stringify(emptySubmission)) as SubmissionState,
      );

      localStorage.removeItem("moveInFormData");

      localStorage.setItem("moveInFormData", JSON.stringify(emptyFormInstance));
    },
  },
});

export const { updateField, clearSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;
