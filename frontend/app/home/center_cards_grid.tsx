'use client'

import {
  Container,
  Grid
} from '@mantine/core'

import { CenterCard } from './center_card'
import { type Center } from '../constants/types'

interface Props {
  centers: Center[]
}

export function CenterCardsGrid ({ centers }: Props): any {
  return (
    <Container size="lg">
    <Grid mt="md">
      {centers.map((center: any, index: number) => (
        <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
          <CenterCard center={center} />
        </Grid.Col>
      ))}
    </Grid>
  </Container>
  )
}
