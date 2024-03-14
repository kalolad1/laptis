import { Button, Flex, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'
import { IconUserCircle } from '@tabler/icons-react'

import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { createNewPatient } from '@/app/api/create_new_patient'
import { type NewPatientInfo } from '@/app/constants/types'

export default function PatientTabContent (): JSX.Element {
  return (
    <Flex p='lg'>
      <PatientTable />
      <NewPatientButton />
    </Flex>
  )
}

function PatientTable (): JSX.Element {
  const patients = [
    { name: 'Darshan Kalola', applicationStatus: 'Applied' },
    { name: 'Sudeep Peddireddy', applicationStatus: 'Denied' },
    { name: 'Andrew Steen', applicationStatus: 'Accepted' }
  ]

  const rows = patients.map((patient) => (
    <Table.Tr key={patient.name}>
      <Table.Td>
        <IconUserCircle />
      </Table.Td>
      <Table.Td>{patient.name}</Table.Td>
      <Table.Td>{patient.applicationStatus}</Table.Td>
      <Table.Td>
        <Button>Find a treatment center</Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Table highlightOnHover>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

function NewPatientButton (): JSX.Element {
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
    <PopupButton id={process.env.NEXT_PUBLIC_NEW_PATIENT_FORM_ID} onSubmit={handleSubmit} style={{ position: 'absolute', bottom: 24, right: 24 }}>
      New Patient
    </PopupButton>
  )
}
