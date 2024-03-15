'use client'

import { Stack } from '@mantine/core'

import Navbar from '@/app/provider_dashboard/navbar/Navbar'
import PatientTabContent from '@/app/provider_dashboard/patients/PatientTabContent'

export default function PatientsTab (): JSX.Element {
  return (
    <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
      <Navbar></Navbar>
      <PatientTabContent></PatientTabContent>
    </Stack>
  )
}
