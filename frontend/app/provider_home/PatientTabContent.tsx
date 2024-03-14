import { Button, Flex, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'
import { IconUserCircle } from '@tabler/icons-react'
import { getTypeformResponse } from '../api/get_typeform_response'

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
    getTypeformResponse(formId, responseId)
      .then(answers => {
        console.log(answers)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <PopupButton id={process.env.NEXT_PUBLIC_NEW_PATIENT_FORM_ID} onSubmit={handleSubmit} style={{ position: 'absolute', bottom: 24, right: 24 }}>
      New Patient
    </PopupButton>
  )
}
