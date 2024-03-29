'use client'

import { type Center } from '../../../constants/types'

import { Grid } from '@mantine/core'

import CenterCard from './CenterCard'

interface Props {
  centers: Center[]
  userPatientId: string
  patientApplicationContextId: string
}

export default function CenterCardsGrid ({ centers, userPatientId, patientApplicationContextId }: Props): JSX.Element {
  return (
    <Grid>
      {centers.map((center: any, index: number) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
          <CenterCard center={center} userPatientId={userPatientId} patientApplicationContextId={patientApplicationContextId} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
