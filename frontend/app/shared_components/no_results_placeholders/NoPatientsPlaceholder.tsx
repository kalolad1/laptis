'use client'

import { Stack, Title, Text } from '@mantine/core'
import { IconPackages } from '@tabler/icons-react'

export default function NoPatientsPlaceholder (): JSX.Element {
  return (
    <Stack align='center'>
      <IconPackages />
      <Title>No patients added yet.</Title>
      <Text>Patients added to your roster will appear here. Click the button at the bottom to add a patient.</Text>
    </Stack>
  )
}
