import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  [key: string]: string | string[] | undefined;
  occupancy_type: "TENANT" | "HOME_OWNER" | "";
  occupancy_day: string;
  occupancy_month: string;
  occupancy_year: string;
  selected_address: string;
  selected_unit: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  phone_number: string;
  secondary_phone_number: string;
  secondary_first_name: string;
  secondary_last_name: string;
  secondary_email: string;
  payment_mode: string;
  pageVisited: string[];
  accept_preauth_terms_and_conditions?: string;
  accept_terms_and_conditions: string;
  void_cheque_image: string;
  branch_transit_number: string;
  financial_institution_number: string;
  bank_account_number: string;
  verify_entered_information?: string;
  signature_image: string;
  signature_text: string;
  signature_method: "draw" | "type" | "";
  secondary_signature_image: string;
  secondary_signature_text: string;
  secondary_signature_method: "draw" | "type" | "";
  location_id: string;
  city: string;
  postal_code: string;
  submission_id: string;
  has_secondary_occupant?: string;
}

export const emptyForm: FormState = {
  selected_address: "",
  selected_unit: "",
  occupancy_type: "",
  occupancy_day: "",
  occupancy_month: "",
  occupancy_year: "",
  first_name: "",
  last_name: "",
  business_name: "",
  email: "",
  phone_number: "",
  secondary_phone_number: "",
  secondary_first_name: "",
  secondary_last_name: "",
  secondary_email: "",
  payment_mode: "",
  pageVisited: [],
  accept_preauth_terms_and_conditions: "",
  accept_terms_and_conditions: "",
  void_cheque_image: "",
  branch_transit_number: "",
  financial_institution_number: "",
  bank_account_number: "",
  verify_entered_information: "",
  signature_image: "",
  signature_text: "",
  signature_method: "",
  secondary_signature_image: "",
  secondary_signature_text: "",
  secondary_signature_method: "",
  location_id: "",
  submission_id: "",
  has_secondary_occupant: "",
  city: "",
  postal_code: "",
};

const getInitialState = (): FormState => {
  const savedData = localStorage.getItem("moveInFormData");
  if (savedData) {
    return JSON.parse(savedData);
  }
  return JSON.parse(JSON.stringify(emptyForm)) as FormState;
};

const formSlice = createSlice({
  name: "form",
  initialState: getInitialState(),
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>,
    ) => {
      const { field, value } = action.payload;
      if (field !== "pageVisited") {
        state[field] = value;
      }
      try {
        localStorage.setItem("moveInFormData", JSON.stringify(state));
      } catch (error) {}
    },
    clearForm: (state) => {
      const emptyFormInstance = Object.assign(
        state,
        JSON.parse(JSON.stringify(emptyForm)) as FormState,
      );

      localStorage.removeItem("moveInFormData");
      localStorage.removeItem("customerSubmissionData");
    },
    addPageVisit: (state, action: PayloadAction<string>) => {
      if (!state.pageVisited.includes(action.payload)) {
        state.pageVisited.push(action.payload);
        localStorage.setItem("moveInFormData", JSON.stringify(state));
      }
    },
  },
});

export const { updateField, clearForm, addPageVisit } = formSlice.actions;
export default formSlice.reducer;
