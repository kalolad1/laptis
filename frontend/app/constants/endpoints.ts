// Base
export const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

// Centers
export const GET_CENTERS_ENDPOINT = BASE_API_ENDPOINT + '/centers'
export const FILTER_CENTERS_ENDPOINT = BASE_API_ENDPOINT + '/filter_centers'
export const GET_TYPEFORM_RESPONSE_ENDPOINT = BASE_API_ENDPOINT + '/get_typeform_response'

// Users
// Base
export const LOG_OUT_ENDPOINT = BASE_API_ENDPOINT + '/log_out'

// Patients
export const CREATE_PATIENT_ENDPOINT = BASE_API_ENDPOINT + '/create_patient'
export const GET_PATIENTS_ENDPOINT = BASE_API_ENDPOINT + '/get_patients'

// Providers
export const SIGN_UP_ENDPOINT = BASE_API_ENDPOINT + '/sign_up'
export const GET_TOKEN_ENDPOINT = BASE_API_ENDPOINT + '/token'

// Applications
export const CREATE_PATIENT_APPLICATION_CONTEXT_ENDPOINT = BASE_API_ENDPOINT + '/create_patient_application_context'
export const CREATE_APPLICATION_ENDPOINT = BASE_API_ENDPOINT + '/create_application'
