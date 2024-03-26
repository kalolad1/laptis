'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { createApplication } from '@/app/api/create_application'
import { getCenter } from '@/app/api/get_center'
import { type Center } from '@/app/constants/types'

import { Title, Image, Text, Stack, Divider, Button, Grid, Anchor } from '@mantine/core'
import { IconPhone } from '@tabler/icons-react'

import '@mantine/dates/styles.css'
import classes from './CenterDetailView.module.css'

interface CenterDetailViewProps {
  centerId: string
}

export default function CenterDetailView ({ centerId }: CenterDetailViewProps): JSX.Element {
  const searchParams = useSearchParams()
  const userPatientId = searchParams.get('userPatientId') ?? ''
  const patientApplicationContextId = searchParams.get('patientApplicationContextId') ?? ''

  const [center, setCenter] = useState<Center | null>(null)

  useEffect(() => {
    getCenter(centerId)
      .then(data => { setCenter(data) })
      .catch(error => { error('Error:', error) })
  }, [centerId])

  return (
    <Stack gap="md">
      {center !== null && <Title>{center.name}</Title>}
      <Image src={center?.image} radius="md" w={400} h={200} mb="md" />
      {center !== null && <CenterDetailViewBody center={center} userPatientId={userPatientId} patientApplicationContextId={patientApplicationContextId} />}
    </Stack>
  )
}

interface CenterDetailViewBodyProps {
  center: Center
  userPatientId: string
  patientApplicationContextId: string
}

function CenterDetailViewBody ({ center, userPatientId, patientApplicationContextId }: CenterDetailViewBodyProps): JSX.Element {
  return (
    <Grid gutter={{ base: 75 }}>
      <Grid.Col span={{ base: 8, md: 9, lg: 9 }}>
        <Information center={center} />
      </Grid.Col>
      <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
        <ReserveBox phoneNumber={center.phoneNumber} centerId={center.id} userPatientId={userPatientId} patientApplicationContextId={patientApplicationContextId} />
      </Grid.Col>
    </Grid>
  )
}

interface InformationProps {
  center: Center
}

function Information ({ center }: InformationProps): JSX.Element {
  return (
    <div>
      <Title order={3}>{center.address}</Title>
      <QuickCenterStats eligibleHealthInsurances={center.eligibleHealthInsurances} />
      <Anchor href={center.website} target='blank'>Go to website</Anchor>
      <Divider my="sm" />

      <Text>Woburn Addiction Treatment is a top-rated addiction treatment center in Massachusetts that accepts most insurance plans. If you or a loved one are ready to overcome substance addiction and commit to life-changing treatment, our Massachusetts treatment facility is here to help.

        From drug and alcohol detox to individualized treatment at the outpatient level of care, the programs at our addiction treatment center and partner facilities are meticulously designed to empower you to overcome your addictions and create a lasting foundation for recovery. Our multi-faceted substance abuse services are designed to help identify and diminish the compulsive obsession to use drugs and alcohol.</Text>
    </div>
  )
}

interface QuickCenterStatsProps {
  eligibleHealthInsurances: string[]
}

function QuickCenterStats ({ eligibleHealthInsurances }: QuickCenterStatsProps): any {
  return (
    <Text>5 beds available • 100 total beds • Accepts {eligibleHealthInsurances.join(', ')}</Text>
  )
}

interface ReserveBoxProps {
  phoneNumber: string
  userPatientId: string
  patientApplicationContextId: string
  centerId: string
}

function ReserveBox ({ phoneNumber, userPatientId, patientApplicationContextId, centerId }: ReserveBoxProps): any {
  function handleApplyButtonClick (): void {
    createApplication(userPatientId, patientApplicationContextId, centerId)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Stack className={classes.reserve_box_stack} align='center'>
      <Button justify="center" size="md" leftSection={<IconPhone />} variant="transparent" color='black'>
        {phoneNumber}
      </Button>
      <Button onClick={handleApplyButtonClick}>Apply</Button>
    </Stack>
  )
}
