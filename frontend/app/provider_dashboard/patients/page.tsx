'use client'

import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import { getPatients } from '@/app/api/get_patients'
import { type Patient } from '@/app/constants/types'

import { Stack } from '@mantine/core'

import NoPatientsPlaceholder from '@/app/provider_dashboard/patients/NoPatientsPlaceholder'
import PatientTable from '@/app/provider_dashboard/patients/PatientTable'
import NewPatientButton from '@/app/provider_dashboard/patients/NewPatientButton'
import NewPatientModal from '@/app/provider_dashboard/patients/NewPatientModal'

export default function PatientsTab (): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([])
  const [hasPatients, setHasPatients] = useState<boolean>(true)
  const [newPatientModalOpened, newPatientModalHandlers] = useDisclosure(false)

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

  useEffect(() => {
    callGetPatients()
  }, [])

  return (
    <>
      <NewPatientModal opened={newPatientModalOpened} close={newPatientModalHandlers.close} callGetPatients={callGetPatients}></NewPatientModal>
      {hasPatients
        ? <Stack align='center'>
          <NewPatientButton handleNewPatientButtonClick={newPatientModalHandlers.open} />
          <PatientTable patients={patients} />
        </Stack>
        : <Stack align='center'>
          <NoPatientsPlaceholder />
          <NewPatientButton handleNewPatientButtonClick={newPatientModalHandlers.open} />
        </Stack>
      }
    </>
  )
}
