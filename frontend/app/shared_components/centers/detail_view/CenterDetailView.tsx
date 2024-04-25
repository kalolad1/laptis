'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { createApplication } from '@/app/api/create_application'
import { getCenter } from '@/app/api/get_center'
import { type Center } from '@/app/constants/types'

import { Image, Text, Stack, Divider, Anchor, Flex } from '@mantine/core'

import '@mantine/dates/styles.css'
import baseClasses from '@/app/base.module.css'
import PrimaryButton from '../../buttons/PrimaryButton'

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
      {center !== null && <Text className={baseClasses.title_main}>{center.name}</Text>}
      <Image src={center?.image} radius="md" w={400} h={200} />
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
    <Information center={center} userPatientId={userPatientId} patientApplicationContextId={patientApplicationContextId} />
  )
}

interface InformationProps {
  center: Center
  userPatientId: string
  patientApplicationContextId: string
}

function Information ({ center, userPatientId, patientApplicationContextId }: InformationProps): JSX.Element {
  function handleApplyButtonClick (): void {
    createApplication(userPatientId, patientApplicationContextId, center.id)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <Flex justify="space-between" gap="lg" align="center">
        <Stack gap={0}>
          <Text className={baseClasses.title_secondary}>{center.address}</Text>
          <QuickCenterStats eligibleHealthInsurances={center.eligibleHealthInsurances} bedsAvailable={center.availableBeds} />
          <Anchor className={baseClasses.normal_text} href={center.website} target='blank'>Go to website</Anchor>
        </Stack>
        <PrimaryButton onClick={handleApplyButtonClick}>Apply</PrimaryButton>
      </Flex>

      <Divider my="sm" />

      <Text className={baseClasses.normal_text}>Woburn Addiction Treatment is a top-rated addiction treatment center in Massachusetts that accepts most insurance plans. If you or a loved one are ready to overcome substance addiction and commit to life-changing treatment, our Massachusetts treatment facility is here to help.

        From drug and alcohol detox to individualized treatment at the outpatient level of care, the programs at our addiction treatment center and partner facilities are meticulously designed to empower you to overcome your addictions and create a lasting foundation for recovery. Our multi-faceted substance abuse services are designed to help identify and diminish the compulsive obsession to use drugs and alcohol.</Text>
    </div>
  )
}

interface QuickCenterStatsProps {
  eligibleHealthInsurances: string[]
  bedsAvailable: number
}

function QuickCenterStats ({ eligibleHealthInsurances, bedsAvailable }: QuickCenterStatsProps): any {
  const bedsAvailableText = bedsAvailable === 1 ? `${bedsAvailable} bed available` : `${bedsAvailable} beds available`

  return (
    <Text className={baseClasses.sub_text}>{bedsAvailableText} • 100 total beds • Accepts {eligibleHealthInsurances.join(', ')}</Text>
  )
}
