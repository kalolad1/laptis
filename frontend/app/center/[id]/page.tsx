'use client'

import '@mantine/dates/styles.css'

import { useState, useEffect } from 'react'
import { getCenter } from '@/app/api/get_center'
import { type Center } from '@/app/constants/types'

import { Title, Image, Text, Container, Stack, Divider, Button, Grid } from '@mantine/core'

import MainNavbar from '@/app/navbar/main_navbar'

import classes from './page.module.css'

export default function CenterDetailViewPage ({ params }: { params: { id: string } }): any {
  const [center, setCenter] = useState([])

  useEffect(() => {
    getCenter(params.id)
      .then(data => { setCenter(data) })
      .catch(error => { error('Error:', error) })
  }, [params.id])

  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <Container pt="lg">
          <Stack gap="md">
            <Title>{center.name}</Title>
            <Image src={center.image} radius="md" w={400} h={200} mb="md" />
            <CenterDetailViewBody center={center} />
          </Stack>
        </Container>
      </main>
    </>
  )
}

interface CenterDetailViewBodyProps {
  center: Center
}

function CenterDetailViewBody ({ center }: CenterDetailViewBodyProps): any {
  return (
    <Grid gutter={{ base: 75 }}>
      <Grid.Col span={{ base: 8, md: 9, lg: 9 }}>
        <Information center={center} />
      </Grid.Col>
      <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
        <ReserveBox />
      </Grid.Col>
    </Grid>
  )
}

interface InformationProps {
  center: Center
}

function Information ({ center }: InformationProps): any {
  return (
    <div>
      <Title order={3}>{center.address}</Title>
      <QuickCenterStats />
      <Divider my="md" />

      <Text>Woburn Addiction Treatment is a top-rated addiction treatment center in Massachusetts that accepts most insurance plans. If you or a loved one are ready to overcome substance addiction and commit to life-changing treatment, our Massachusetts treatment facility is here to help.

        From drug and alcohol detox to individualized treatment at the outpatient level of care, the programs at our addiction treatment center and partner facilities are meticulously designed to empower you to overcome your addictions and create a lasting foundation for recovery. Our multi-faceted substance abuse services are designed to help identify and diminish the compulsive obsession to use drugs and alcohol.</Text>
    </div>
  )
}

function QuickCenterStats (): any {
  return (
    <Text>5 beds available • 100 total beds • Accepts medicaid</Text>
  )
}

function ReserveBox (): any {
  return (
    <Stack className={classes.reserve_box_stack} align='center'>
      <Title order={4}>856-999-4823</Title>
      <Button disabled>Reserve</Button>
    </Stack>
  )
}
