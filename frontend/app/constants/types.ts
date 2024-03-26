export interface Center {
  id: string
  name: string
  address: string
  centerType: string
  image: string
  phoneNumber: string
  website: string
  eligibleHealthInsurances: string[]
}

export interface NewPatientInfo {
  firstName: string
  lastName: string
  age: number
  sex: string
  address: string
  usingMedicationAssistedTherapies: string[]
  usingSubstances: string[]
  mentalHealthDiagnoses: string[]
  healthInsurance: string
  healthInsuranceIdentifier: string
  hasDisability: boolean
  isOpenToFaithBasedTreatment: boolean
}

export interface PatientApplicationContext {
  userId: string
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
