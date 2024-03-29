'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { createPatient } from '@/app/api/create_patient'
import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { getPatients } from '@/app/api/get_patients'
import { PROVIDER_DASHBOARD_FILTERED_CENTERS } from '@/app/constants/paths'
import { type Patient, type NewPatientInfo, type PatientApplicationContext } from '@/app/constants/types'
import { NEW_PATIENT_FORM_ID, PATIENT_APPLICATION_CONTEXT_FORM_ID } from '@/app/constants/typeform'
import { createPatientApplicationContext } from '@/app/api/create_patient_application_context'

import { Flex, Paper, ScrollArea, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'

import NoPatientsPlaceholder from '@/app/shared_components/no_results_placeholders/NoPatientsPlaceholder'

import baseClasses from '@/app/base.module.css'
import classes from '@/app/provider_dashboard/patients/page.module.css'

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

  function handleNewPatientFormClose (): void {
    callGetPatients()
  }

  useEffect(() => {
    callGetPatients()
  }, [])

  return (
    <Flex p='lg'>
      {hasPatients ? <PatientTable patients={patients} /> : <NoPatientsPlaceholder />}
      <NewPatientButton handleNewPatientFormClose={handleNewPatientFormClose} />
    </Flex>
  )
}

interface PatientTableProps {
  patients: Patient[]
}

function PatientTable ({ patients }: PatientTableProps): JSX.Element {
  const sortedPatients = [...patients].sort((a, b) => Number(b.userId) - Number(a.userId))
  const rows = sortedPatients.map((patient) => (
    <Table.Tr className={baseClasses.normal_text} key={patient.userId}>
      <Table.Td>{`${patient.firstName} ${patient.lastName}`}</Table.Td>
      <Table.Td>{patient.age} years old</Table.Td>
      <Table.Td>{patient.placementStatus}</Table.Td>
      <Table.Td>
        <FindTreatmentButton userPatientId={patient.userId} />
      </Table.Td>
    </Table.Tr>
  ))

  return (

    <ScrollArea w={'100%'} h={'75vh'}>
      <Paper shadow="xs" radius="lg" pb="xl" px="xl" pt="lg">
        <Table verticalSpacing="xl" horizontalSpacing="xl" highlightOnHover>
          <Table.Thead>
            <Table.Tr className={baseClasses.normal_text}>
              <Table.Th>Name</Table.Th>
              <Table.Th>Age</Table.Th>
              <Table.Th>Placement Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </ScrollArea>
  )
}

interface FindTreatmentButtonProps {
  userPatientId: string
}

function FindTreatmentButton ({ userPatientId }: FindTreatmentButtonProps): JSX.Element {
  const router = useRouter()

  function handleSubmit ({ formId, responseId }: { formId: string, responseId: string }): void {
    // There is a wierd race going on in which the response is not available immediately
    // after the form is submitted. This is a temporary fix to wait for some time before
    // fetching the response.
    setTimeout(() => {
      getTypeformResponse(formId, responseId)
        .then(answers => {
          const patientApplicationContext: PatientApplicationContext = {
            userPatientId,
            ...JSON.parse(answers)
          }
          createPatientApplicationContext(patientApplicationContext)
            .then(response => {
              const urlParams = new URLSearchParams({ userPatientId, patientApplicationContextId: response.patientApplicationContextId })
              const queryString = urlParams.toString()
              router.push(`${PROVIDER_DASHBOARD_FILTERED_CENTERS}?` + queryString)
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

  return (
    <PopupButton className={classes.find_treatment_button} id={PATIENT_APPLICATION_CONTEXT_FORM_ID} onSubmit={handleSubmit}>
      Find a treatment center
    </PopupButton>
  )
}

interface NewPatientButtonProps {
  handleNewPatientFormClose: () => void
}

function NewPatientButton ({ handleNewPatientFormClose }: NewPatientButtonProps): JSX.Element {
  function parseTypeformAnswers (jsonAnswers: string): NewPatientInfo {
    const answers = JSON.parse(jsonAnswers)
    console.log(answers)
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

  function handleSubmit ({ formId, responseId }: { formId: string, responseId: string }): void {
    // There is a wierd race going on in which the response is not available immediately
    // after the form is submitted. This is a temporary fix to wait for some time before
    // fetching the response.
    setTimeout(() => {
      getTypeformResponse(formId, responseId)
        .then(answers => {
          const newPatientInfo: NewPatientInfo = parseTypeformAnswers(answers)
          createPatient(newPatientInfo)
            .then(response => {
              console.log(response)
              handleNewPatientFormClose()
            })
            .catch(error => {
              console.error(error)
            })
        })
        .catch(error => {
          console.error(error)
        })
    }, 2000)
  }

  return (
    <PopupButton id={NEW_PATIENT_FORM_ID} onSubmit={handleSubmit} className={classes.new_patient_button}>
      New Patient
    </PopupButton>
  )
}
