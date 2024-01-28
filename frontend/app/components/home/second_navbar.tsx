'use client'

import { Group, Container, Button } from '@mantine/core'
import { IconHome } from '@tabler/icons-react'
import classes from './second_navbar.module.css'

// const links = [
//   { link: '/detox', label: 'Detox' },
//   { link: '/css', label: 'Clinical Stabilization Services' },
//   { link: '/tss', label: 'Transitional Support Services' },
//   { link: '/residential', label: 'Residential' }
// ]
export function SecondNavbar (): any {
  return (
      <Container className={classes.container}>
        <Group py={10} justify='space-between'>
          <Group gap="xl">
            <IconHome/>
            <IconHome/>
            <IconHome/>
            <IconHome/>
          </Group>
          <Group>
            <Button>
              Find for me
            </Button>
          </Group>
        </Group>
      </Container>
  )
}
