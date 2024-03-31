'use client'

import { useEffect, useState } from 'react'

import { createPatient } from '@/app/api/create_patient'
import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { getPatients } from '@/app/api/get_patients'
import { type Patient, type NewPatientInfo } from '@/app/constants/types'

import { Stack } from '@mantine/core'

import NoPatientsPlaceholder from '@/app/provider_dashboard/patients/NoPatientsPlaceholder'
import PatientTable from './PatientTable'
import NewPatientButton from './NewPatientButton'

export default function PatientsTab (): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([])
  const [hasPatients, setHasPatients] = useState<boolean>(true)

  function callGetPatients (): void {
    getPatients()
      .then(patients => {
        setPatients(patients)
        if (patients.length === 0) {
          setHasPatients(false)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  function parseNewPatientTypeformAnswers (jsonAnswers: string): NewPatientInfo {
    const answers = JSON.parse(jsonAnswers)

    const newPatientInfo: NewPatientInfo = {
      ...answers,
      sex: answers.sex.label,
      usingMedicationAssistedTherapies: 'usingMedicationAssistedTherapies' in answers ? answers.usingMedicationAssistedTherapies.labels : [],
      usingSubstances: 'usingSubstances' in answers ? answers.usingSubstances.labels : [],
      mentalHealthDiagnoses: 'mentalHealthDiagnoses' in answers ? answers.mentalHealthDiagnoses.labels : [],
      healthInsurance: answers.healthInsurance.label
    }
    return newPatientInfo
  }

  function handleNewPatientButtonSubmit ({ formId, responseId }: { formId: string, responseId: string }): void {
    // There is a wierd race going on in which the response is not available immediately
    // after the form is submitted. This is a temporary fix to wait for some time before
    // fetching the response.
    setTimeout(() => {
      getTypeformResponse(formId, responseId)
        .then(answers => {
          const newPatientInfo: NewPatientInfo = parseNewPatientTypeformAnswers(answers)
          createPatient(newPatientInfo)
            .then(response => {
              console.log(response)
              window.location.reload()
            })
            .catch(error => {
              console.error(error)
            })
        })
        .catch(error => {
          console.error(error)
        })
    }, 1000)
  }

  useEffect(() => {
    callGetPatients()
  }, [])

  return (
    <>
      {hasPatients
        ? <PatientTable patients={patients} handleNewPatientButtonSubmit={handleNewPatientButtonSubmit} />
        : <Stack align='center'>
          <NoPatientsPlaceholder />
          <NewPatientButton handleNewPatientButtonSubmit={handleNewPatientButtonSubmit} />
        </Stack>
      }
    </>
  )
}
