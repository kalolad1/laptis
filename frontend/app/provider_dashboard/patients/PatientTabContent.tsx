import { useEffect, useState } from 'react'

import { Button, Flex, ScrollArea, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'
import { IconUserCircle } from '@tabler/icons-react'

import { createNewPatient } from '@/app/api/create_new_patient'
import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { getPatients } from '@/app/api/get_patients'
import { type Patient, type NewPatientInfo } from '@/app/constants/types'

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
        <Button>Find a treatment center</Button>
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
