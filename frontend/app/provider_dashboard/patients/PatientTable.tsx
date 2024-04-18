'use client'

import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { type Patient } from '@/app/constants/types'

import { Flex, Paper, ScrollArea, Table } from '@mantine/core'

import NewPatientButton from '@/app/provider_dashboard/patients/NewPatientButton'
import PacModal from '@/app/provider_dashboard/patients/PacModal'
import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

import baseClasses from '@/app/base.module.css'

interface PatientTableProps {
  patients: Patient[]
}
export default function PatientTable ({ patients }: PatientTableProps): JSX.Element {
  const [pacModalOpened, pacModalHandlers] = useDisclosure(false)
  const [openedPacModalUserPatientId, setOpenedPacModalUserPatientId] = useState<string>('')

  const sortedPatients = [...patients].sort((a, b) => Number(b.userId) - Number(a.userId))

  const rows = sortedPatients.map((patient) => (
    <Table.Tr className={baseClasses.normal_text} key={patient.userId}>
      <Table.Td>{`${patient.firstName} ${patient.lastName}`}</Table.Td>
      <Table.Td>{patient.age} years old</Table.Td>
      <Table.Td>{patient.placementStatus}</Table.Td>
      <Table.Td>
        <Flex direction='row' justify='flex-end'>
          <FindTreatmentButton pacModalHandlers={pacModalHandlers} userPatientId={patient.userId} setOpenedPacModalUserPatientId={setOpenedPacModalUserPatientId} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ))

  function handleNewPatientButtonSubmit (): void {
    console.log('New patient button clicked')
  }

  return (
    <>
      <PacModal opened={pacModalOpened} close={pacModalHandlers.close} userPatientId={openedPacModalUserPatientId}></PacModal>
      <ScrollArea w={'100%'} h={'75vh'}>
        <Paper shadow="xs" radius="lg" pb="xl" px="xl" pt="lg">
          <Table verticalSpacing="xl" horizontalSpacing="xl" highlightOnHover stickyHeader>
            <Table.Thead>
              <Table.Tr className={baseClasses.normal_text}>
                <Table.Th>Name</Table.Th>
                <Table.Th>Age</Table.Th>
                <Table.Th>Placement Status</Table.Th>
                <Table.Th>
                  <Flex direction='row' justify='flex-end'>
                    <NewPatientButton handleNewPatientButtonSubmit={handleNewPatientButtonSubmit} />
                  </Flex>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      </ScrollArea>
    </>
  )
}

interface FindTreatmentButtonProps {
  pacModalHandlers: {
    open: () => void
  }
  userPatientId: string
  setOpenedPacModalUserPatientId: (userPatientId: string) => void
}

export function FindTreatmentButton ({ pacModalHandlers, userPatientId, setOpenedPacModalUserPatientId }: FindTreatmentButtonProps): JSX.Element {
  function handleClick (): void {
    setOpenedPacModalUserPatientId(userPatientId)
    pacModalHandlers.open()
  }

  return (
    <PrimaryButton onClick={handleClick}>
      Find a treatment center
    </PrimaryButton>
  )
}
