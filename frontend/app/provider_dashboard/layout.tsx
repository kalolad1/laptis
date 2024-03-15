'use client'

import { Grid } from '@mantine/core'

import Sidebar from '@/app/provider_dashboard/sidebar/Sidebar'

export default function ProviderDashboardLayout ({ children }: { children: any }): JSX.Element {
  return (
    <Grid gutter={0}>
      <Grid.Col span={2}>
        <Sidebar></Sidebar>
      </Grid.Col>
      <Grid.Col span={10}>
        {children}
      </Grid.Col>
    </Grid >
  )
}
