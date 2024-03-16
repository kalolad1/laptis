'use client'

import { Grid, Stack } from '@mantine/core'

import Sidebar from '@/app/provider_dashboard/sidebar/Sidebar'
import Navbar from '@/app/provider_dashboard/navbar/Navbar'

export default function ProviderDashboardLayout ({ children }: { children: any }): JSX.Element {
  return (
    <Grid gutter={0}>
      <Grid.Col span={2}>
        <Sidebar></Sidebar>
      </Grid.Col>
      <Grid.Col span={10}>
        <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
          <Navbar></Navbar>
          {children}
        </Stack>
      </Grid.Col>
    </Grid >
  )
}
