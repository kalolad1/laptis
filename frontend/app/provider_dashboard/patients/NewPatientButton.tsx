'use client'

import { NEW_PATIENT_FORM_ID } from '@/app/constants/typeform'

import { PopupButton } from '@typeform/embed-react'

import classes from '@/app/provider_dashboard/patients/NewPatientButton.module.css'

export default function NewPatientButton ({ handleNewPatientButtonSubmit }: any): JSX.Element {
  return (
    <PopupButton id={NEW_PATIENT_FORM_ID} onSubmit={handleNewPatientButtonSubmit} className={classes.new_patient_button}>
      New Patient
    </PopupButton>
  )
}
