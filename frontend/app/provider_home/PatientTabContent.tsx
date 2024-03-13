import { Button, Flex, Table } from '@mantine/core'
import { IconSearch, IconUserCircle } from '@tabler/icons-react'

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
        <a
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          <IconSearch />
        </a>
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
  return (
    <Button style={{ position: 'absolute', bottom: 24, right: 24 }}>
      New Patient
    </Button>
  )
}
