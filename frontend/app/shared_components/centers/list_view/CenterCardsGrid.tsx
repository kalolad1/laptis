'use client'

import { type Center } from '../../../constants/types'

import { Grid } from '@mantine/core'

import CenterCard from './CenterCard'

interface Props {
  centers: Center[]
  userId: string
  patientApplicationContextId: string
}

export default function CenterCardsGrid ({ centers, userId, patientApplicationContextId }: Props): JSX.Element {
  return (
    <Grid p="md">
      {centers.map((center: any, index: number) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
          <CenterCard center={center} userId={userId} patientApplicationContextId={patientApplicationContextId} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
