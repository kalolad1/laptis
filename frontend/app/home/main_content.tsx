'use client'

import {
  Container,
  Grid
} from '@mantine/core'

import { CenterCard } from './center_card';

export function MainContent (): any {
  const child = <CenterCard />
  return (
    <Container size="lg">
      <Grid mt="md">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  )
}
