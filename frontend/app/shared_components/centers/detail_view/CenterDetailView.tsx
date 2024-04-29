'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { createApplication } from '@/app/api/create_application'
import { getCenter } from '@/app/api/get_center'
import { type Center } from '@/app/constants/types'

import { IconAmbulance, IconBabyBottle, IconBrain, IconBrandMastercard, IconDisabled, IconPill, IconTimeline, IconUser } from '@tabler/icons-react'
import { Image, Text, Stack, Divider, Anchor, Flex, Grid } from '@mantine/core'

import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

import baseClasses from '@/app/base.module.css'

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
          <Text className={baseClasses.sub_text}>{center.phoneNumber}</Text>
          <Anchor className={baseClasses.normal_text} href={center.website} target='blank'>Go to website</Anchor>
        </Stack>
        <PrimaryButton onClick={handleApplyButtonClick}>Apply</PrimaryButton>
      </Flex>

      <Divider my="md" />
      <Grid justify="space-between" gutter={{ base: '100' }}>
        <Grid.Col span={{ md: 8 }}>
          <CenterDescription />
        </Grid.Col>
        <Grid.Col span={{ md: 4 }}>
          <Stack gap="lg">
            <EligibilityCriteria eligibleAgeMinimum={center.eligibleAgeMinimum} eligibleAgeMaximum={center.eligibleAgeMaximum} eligibleSexes={center.eligibleSexes} />
            <Insurance acceptsPatientsWhoAreUninsured={center.acceptsPatientsWhoAreUninsured} eligibleHealthInsurances={center.eligibleHealthInsurances} />
            <OtherCriteria acceptsPatientsOnMethadone={center.acceptsPatientsOnMethadone} acceptsPatientsWhoArePregnant={center.acceptsPatientsWhoArePregnant} acceptsPatientsWithCoOccuringDisorders={center.acceptsPatientsWithCoOccuringDisorders} acceptsPatientsWithDisabilities={center.acceptsPatientsWithDisabilities} />
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  )
}

function CenterDescription (): JSX.Element {
  return (
    <Text className={baseClasses.normal_text}>Woburn Addiction Treatment is a top-rated addiction treatment center in Massachusetts that accepts most insurance plans. If you or a loved one are ready to overcome substance addiction and commit to life-changing treatment, our Massachusetts treatment facility is here to help.

      From drug and alcohol detox to individualized treatment at the outpatient level of care, the programs at our addiction treatment center and partner facilities are meticulously designed to empower you to overcome your addictions and create a lasting foundation for recovery. Our multi-faceted substance abuse services are designed to help identify and diminish the compulsive obsession to use drugs and alcohol.</Text>
  )
}

interface EligibilityCriteriaProps {
  eligibleAgeMinimum: number
  eligibleAgeMaximum: number
  eligibleSexes: string[]
}

function EligibilityCriteria ({ eligibleAgeMinimum, eligibleAgeMaximum, eligibleSexes }: EligibilityCriteriaProps): JSX.Element {
  function getEligibleAgesText (eligibleAgeMinimum: number, eligibleAgeMaximum: number): string {
    if (eligibleAgeMaximum > 125) {
      return `${eligibleAgeMinimum}+`
    }
    return `${eligibleAgeMinimum}-${eligibleAgeMaximum}`
  }

  const eligibleAgesText = getEligibleAgesText(eligibleAgeMinimum, eligibleAgeMaximum)

  return (
    <Stack gap="md">
      <Text size='lg'>Eligibility Criteria</Text>
      <Stack gap="sm">
        <Flex gap="md">
          <IconTimeline size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Eligible ages:</b> {eligibleAgesText}</Text>
        </Flex>
        <Flex gap="md">
          <IconUser size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Eligible genders:</b> {eligibleSexes.join(', ')}</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

interface InsuranceProps {
  eligibleHealthInsurances: string[]
  acceptsPatientsWhoAreUninsured: boolean
}

function Insurance ({ eligibleHealthInsurances, acceptsPatientsWhoAreUninsured }: InsuranceProps): JSX.Element {
  return (
    <Stack gap="md">
      <Text size='lg'>Insurance</Text>
      <Stack gap="sm">
        {acceptsPatientsWhoAreUninsured && (
          <Flex gap="md">
            <IconAmbulance size={24} style={{ flexShrink: 0 }} />
            <Text className={baseClasses.normal_text}><b>Accepts uninsured</b></Text>
          </Flex>
        )}

        <Flex gap="md" >
          <IconBrandMastercard style={{ flexShrink: 0 }} size={24} />
          <Text className={baseClasses.normal_text}><b>Insurances accepted: </b>{eligibleHealthInsurances.join(', ')}</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

interface OtherCriteriaProps {
  acceptsPatientsWithCoOccuringDisorders: boolean
  acceptsPatientsOnMethadone: boolean
  acceptsPatientsWhoArePregnant: boolean
  acceptsPatientsWithDisabilities: boolean
}

function OtherCriteria ({ acceptsPatientsWithCoOccuringDisorders, acceptsPatientsOnMethadone, acceptsPatientsWhoArePregnant, acceptsPatientsWithDisabilities }: OtherCriteriaProps): JSX.Element {
  function getCriteriaContent (): any {
    const criteriaContent = []

    if (acceptsPatientsWithCoOccuringDisorders) {
      criteriaContent.push(
        <Flex gap="md">
          <IconBrain size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Accepts patients with other disorders</b></Text>
        </Flex>
      )
    }
    if (acceptsPatientsOnMethadone) {
      criteriaContent.push(
        <Flex gap="md">
          <IconPill size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Accepts patients on methadone</b></Text>
        </Flex>
      )
    }
    if (acceptsPatientsWithDisabilities) {
      criteriaContent.push(
        <Flex gap="md">
          <IconDisabled size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Accepts patients with disabilities</b></Text>
        </Flex>
      )
    }
    if (acceptsPatientsWhoArePregnant) {
      criteriaContent.push(
        <Flex gap="md">
          <IconBabyBottle size={24} style={{ flexShrink: 0 }} />
          <Text className={baseClasses.normal_text}><b>Accepts pregnant patients</b></Text>
        </Flex>
      )
    }
    return criteriaContent
  }

  const criteriaContent = getCriteriaContent()
  if (criteriaContent.length > 0) {
    return (
      <Stack gap="md">
        <Text size='lg'>Other Criteria</Text>
        <Stack gap="sm">
          {criteriaContent}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack gap="md">
    </Stack>
  )
}

interface QuickCenterStatsProps {
  eligibleHealthInsurances: string[]
  bedsAvailable: number
}

function QuickCenterStats ({ eligibleHealthInsurances, bedsAvailable }: QuickCenterStatsProps): any {
  const bedsAvailableText = bedsAvailable === 1 ? `${bedsAvailable} bed available` : `${bedsAvailable} beds available`
  const eligibleHealthInsurancesText = eligibleHealthInsurances.slice(0, 3).join(', ')
  return (
    <Text className={baseClasses.sub_text}>{bedsAvailableText} • Accepts {eligibleHealthInsurancesText}</Text>
  )
}
