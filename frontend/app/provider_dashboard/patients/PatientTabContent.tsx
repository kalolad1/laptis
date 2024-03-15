import { useEffect, useState } from 'react'

import { Flex, ScrollArea, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'
import { IconUserCircle } from '@tabler/icons-react'

import { createNewPatient } from '@/app/api/create_new_patient'
import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { getPatients } from '@/app/api/get_patients'
import { type Patient, type NewPatientInfo, type PatientApplicationContext } from '@/app/constants/types'
import { PATIENT_APPLICATION_CONTEXT_FORM_ID } from '@/app/constants/typeform'
import { createNewPatientApplicationContext } from '@/app/api/create_new_patient_application_context'

export default function PatientTabContent (): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([])

  function callGetPatients (): void {
    getPatients()
      .then(patients => {
        setPatients(patients)
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
      <PatientTable patients={patients} />
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
    <Table.Tr key={patient.userId}>
      <Table.Td>
        <IconUserCircle />
      </Table.Td>
      <Table.Td>{`${patient.firstName} ${patient.lastName}`}</Table.Td>
      <Table.Td>Accepted</Table.Td>
      <Table.Td>
        <FindTreatmentButton userId={patient.userId} />
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <ScrollArea w={'100%'} h={'75vh'}>
      <Table highlightOnHover>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

interface FindTreatmentButtonProps {
  userId: string
}

function FindTreatmentButton ({ userId }: FindTreatmentButtonProps): JSX.Element {
  function handleSubmit ({ formId, responseId }: { formId: string, responseId: string }): void {
    // There is a wierd race going on in which the response is not available immediately
    // after the form is submitted. This is a temporary fix to wait for some time before
    // fetching the response.
    setTimeout(() => {
      getTypeformResponse(formId, responseId)
        .then(answers => {
          const patientApplicationContextAnswers = JSON.parse(answers)
          const patientApplicationContext: PatientApplicationContext = {
            userId,
            hasHadSuicidalThoughtsInLast90Days: patientApplicationContextAnswers.hasHadSuicidalThoughtsInLast90Days === 'Yes',
            hasUsedDrugsInLast90Days: patientApplicationContextAnswers.hasUsedDrugsInLast90Days === 'Yes'
          }

          createNewPatientApplicationContext(patientApplicationContext)
            .then(response => {
              console.log(response.patientApplicationContextId)
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
    <PopupButton id={PATIENT_APPLICATION_CONTEXT_FORM_ID} onSubmit={handleSubmit}>
      Find a treatment center
    </PopupButton>
  )
}

interface NewPatientButtonProps {
  handleNewPatientFormClose: () => void
}

function NewPatientButton ({ handleNewPatientFormClose }: NewPatientButtonProps): JSX.Element {
  function handleSubmit ({ formId, responseId }: { formId: string, responseId: string }): void {
    // There is a wierd race going on in which the response is not available immediately
    // after the form is submitted. This is a temporary fix to wait for some time before
    // fetching the response.
    setTimeout(() => {
      getTypeformResponse(formId, responseId)
        .then(answers => {
          const newPatientInfo: NewPatientInfo = JSON.parse(answers)

          createNewPatient(newPatientInfo.firstName, newPatientInfo.lastName, newPatientInfo.age)
            .then(response => {
              console.log(response)
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
    <PopupButton id={process.env.NEXT_PUBLIC_NEW_PATIENT_FORM_ID} onSubmit={handleSubmit} onClose={handleNewPatientFormClose} style={{ position: 'absolute', bottom: 24, right: 24 }}>
      New Patient
    </PopupButton>
  )
}
