'use client'

import { type Center } from '../constants/types'

import { Grid } from '@mantine/core'

import CenterCard from './center_card'

interface Props {
  centers: Center[]
}

export default function CenterCardsGrid ({ centers }: Props): JSX.Element {
  return (
    <Grid p="md">
      {centers.map((center: any, index: number) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
          <CenterCard center={center} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
