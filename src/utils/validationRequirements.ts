export const validationRequirements = [
  {
    id: "/",
    fields: [
      { name: "occupancy_type" },
      { name: "occupancy_day" },
      { name: "occupancy_month" },
      { name: "occupancy_year" },
    ],
  },
  {
    id: "/page2",
    fields: [{ name: "selected_address" }, { name: "selected_unit" }],
  },
  {
    id: "/page3",
    fields: [
      { name: "first_name" },
      { name: "last_name" },

      { name: "email", format: "email" },
      { name: "phone_number", format: "phone" },
      {
        conditional: "has_secondary_occupant",
        value: "true",
        id: "secondary_first_name",
      },
      {
        conditional: "has_secondary_occupant",
        value: "true",
        id: "secondary_last_name",
      },
      {
        conditional: "has_secondary_occupant",
        value: "true",
        id: "secondary_email",
        format: "email",
      },
      {
        conditional: "has_secondary_occupant",
        value: "true",
        id: "secondary_phone_number",
        format: "phone",
      },
    ],
  },
  {
    id: "/page4",
    fields: [
      { name: "payment_mode" },
      { name: "accept_preauth_terms_and_conditions" },
    ],
  },
  {
    id: "/page5",
    fields: [
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "branch_transit_number",
        format: "length",
        length: 5,
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "bank_account_number",
        format: "length",
        length: 7,
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "financial_institution_number",
        format: "length",
        length: 3,
      },
      {
        conditional: "payment_mode",
        value: "provide_void_cheque",
        id: "void_cheque_image",
      },
    ],
  },
  { id: "/page6", fields: [{ name: "accept_terms_and_conditions" }] },
  { id: "/page7", fields: [] },
  {
    id: "/page8",
    fields: [
      { name: "verify_entered_information" },
      { name: "signature_image" },
      {
        conditional: "has_secondary_occupant",
        value: "true",
        id: "secondary_signature_image",
      },
    ],
  },
  { id: "/page9", fields: [] },
];
