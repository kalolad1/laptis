'use client'

import { Grid } from '@mantine/core'

import MainContent from '@/app/provider_home/MainContent'
import Sidebar from '@/app/provider_home/Sidebar'

export default function ProviderDashboard (): JSX.Element {
  return (
    <Grid gutter={0}>
      <Grid.Col span={2}>
        <Sidebar></Sidebar>
      </Grid.Col>
      <Grid.Col span={10}>
        <MainContent></MainContent>
      </Grid.Col>
    </Grid >
  )
}
