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
}

export interface Patient {
  first_name: string
  last_name: string
  age: number
}
