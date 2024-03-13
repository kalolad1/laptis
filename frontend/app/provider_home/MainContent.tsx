'use client'

import { Stack } from '@mantine/core'

import Navbar from '@/app/provider_home/Navbar'
import PatientTabContent from '@/app/provider_home/PatientTabContent'

export default function MainContent (): JSX.Element {
  return (
    <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
      <Navbar></Navbar>
      <PatientTabContent></PatientTabContent>
    </Stack>
  )
}
