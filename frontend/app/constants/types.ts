export const USER_TYPES = ['provider', 'patient', 'center']

export interface Center {
  id: string
  name: string
  address: string
  centerType: string
  image: string
  phoneNumber: string
  website: string
  eligibleHealthInsurances: string[]
  availableBeds: number
  eligibleAgeMinimum: number
  eligibleAgeMaximum: number
  eligibleSexes: string[]
  acceptsPatientsWithCoOccuringDisorders: boolean
  acceptsPatientsOnMethadone: boolean
  acceptsPatientsWhoArePregnant: boolean
  acceptsPatientsWithDisabilities: boolean
  acceptsPatientsWhoAreUninsured: boolean
}

export interface NewPatientInfo {
  firstName: string
  lastName: string
  age: number
  sex: string
  languages: string[]
  address: string
  canTravel: boolean
  milesCanTravel: number
  isHeldInConfinement: boolean
  weeksHeldInConfinement: number
  criminalHistory: string
  usingMedicationAssistedTherapies: string[]
  usingSubstances: string[]
  mentalHealthDiagnoses: string[]
  healthInsurance: string
  healthInsuranceIdentifier: string
  hasDisability: boolean
  isOpenToFaithBasedTreatment: boolean
}

export interface PatientApplicationContext {
  userPatientId: string
  hasHadSuicidalThoughtsInLast90Days: boolean
  hasUsedDrugsInLast90Days: boolean
}

export interface Patient {
  firstName: string
  lastName: string
  age: number
  userId: string
  placementStatus: string
}

export interface ProviderUser {
  firstName: string
  lastName: string
  id: string
}

export type User = ProviderUser | Patient
