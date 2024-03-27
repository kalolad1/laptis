'use client'

import { Stack, Title, Text, Paper } from '@mantine/core'
import { IconPackages } from '@tabler/icons-react'

export default function NoPatientsPlaceholder (): JSX.Element {
  return (
    <Paper shadow="xs" radius="lg" p="xl">
      <Stack align='center'>
        <IconPackages size={75} />
        <Title>No patients added yet.</Title>
        <Text ta='center'>Patients added to your roster will appear here. Click the button at the bottom to add a patient.</Text>
      </Stack>
    </Paper>
  )
}
