'use client'

import { useRouter } from 'next/navigation'

import { createPatientApplicationContext } from '@/app/api/create_patient_application_context'
import { getTypeformResponse } from '@/app/api/get_typeform_response'
import { PROVIDER_DASHBOARD_FILTERED_CENTERS } from '@/app/constants/paths'
import { PATIENT_APPLICATION_CONTEXT_FORM_ID } from '@/app/constants/typeform'
import { type Patient, type PatientApplicationContext } from '@/app/constants/types'

import { Flex, Paper, ScrollArea, Table } from '@mantine/core'
import { PopupButton } from '@typeform/embed-react'

import NewPatientButton from '@/app/provider_dashboard/patients/NewPatientButton'

import baseClasses from '@/app/base.module.css'
import classes from '@/app/provider_dashboard/patients/page.module.css'

interface PatientTableProps {
  patients: Patient[]
  handleNewPatientButtonSubmit: (args: { formId: string, responseId: string }) => void
}
export default function PatientTable ({ handleNewPatientButtonSubmit, patients }: PatientTableProps): JSX.Element {
  const sortedPatients = [...patients].sort((a, b) => Number(b.userId) - Number(a.userId))
  const rows = sortedPatients.map((patient) => (
    <Table.Tr className={baseClasses.normal_text} key={patient.userId}>
      <Table.Td>{`${patient.firstName} ${patient.lastName}`}</Table.Td>
      <Table.Td>{patient.age} years old</Table.Td>
      <Table.Td>{patient.placementStatus}</Table.Td>
      <Table.Td>
        <Flex direction='row' justify='flex-end'>
          <FindTreatmentButton userPatientId={patient.userId} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ))

  return (
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
  )
}

interface FindTreatmentButtonProps {
  userPatientId: string
}

export function FindTreatmentButton ({ userPatientId }: FindTreatmentButtonProps): JSX.Element {
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
