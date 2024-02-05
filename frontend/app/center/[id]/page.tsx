'use client'

import '@mantine/dates/styles.css'

import { useState } from 'react'

import { Title, Image, Text, Container, Stack, Divider, Flex, Button } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import MainNavbar from '@/app/navbar/main_navbar'

import classes from './page.module.css'

export default function CenterDetailViewPage (): any {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <Container pt="lg">
          <Stack gap="md">
            <Title>Project Victory</Title>
            <Image src="https://via.placeholder.com/150" radius="md" w={400} h={200} alt="Center Name" />
            <CenterDetailViewBody />
          </Stack>
        </Container>
      </main>
    </>
  )
}

function CenterDetailViewBody (): any {
  return (
    <Flex justify="space-between" gap='xl'>
      <Information />
      <ReserveBox />
    </Flex>
  )
}

function Information (): any {
  return (
    <div>
      <Title order={2}>22 Sagamore Lane, Bordentown NJ</Title>
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
  const [value, setValue] = useState<Date | null>(null)

  return (
    <Stack className={classes.reserve_box_stack}>
      <DatePicker value={value} onChange={setValue} />
      <Button>Reserve spot</Button>
    </Stack>
  )
}
