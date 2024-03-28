'use client'

import { useRouter } from 'next/navigation'
import { type Center } from '../../../constants/types'

import { Card, Image, Text, Group, Stack, Badge } from '@mantine/core'
import { IconStarFilled } from '@tabler/icons-react'

import classes from './CenterCard.module.css'
import baseClasses from '@/app/base.module.css'

interface CenterCardProps {
  center: Center
  userPatientId: string
  patientApplicationContextId: string
}

export default function CenterCard ({ center, userPatientId, patientApplicationContextId }: CenterCardProps): JSX.Element {
  const router = useRouter()

  function handleClick (): void {
    const urlParams = new URLSearchParams({ userPatientId, patientApplicationContextId })
    const queryString = urlParams.toString()
    router.push(`center/${center.id}?${queryString}`)
  }

  return (
    <Card shadow="xs" radius="lg" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <PictureArea image={center.image} centerType={center.centerType} />
      <CenterDescription name={center.name} address={center.address} eligibleHealthInsurances={center.eligibleHealthInsurances} />
    </Card>
  )
}

interface PictureAreaProps {
  image: string
  centerType: string
}
function PictureArea ({ image, centerType }: PictureAreaProps): JSX.Element {
  return (
    <Card.Section>
      <div style={{ position: 'relative' }}>
        <Image src={image} height={240} />
        <Badge variant="dot" color="blue" className={classes.image_overlaying_badge}>{centerType}</Badge>
      </div>
    </Card.Section>
  )
}

interface CenterDescriptionProps {
  name: string
  address: string
  eligibleHealthInsurances: string[]
}
function CenterDescription ({ name, address, eligibleHealthInsurances }: CenterDescriptionProps): JSX.Element {
  return (
    <Card.Section px="md" pt="sm" pb="md">
      <FirstLine name={name} />
      <Stack gap={0}>
        <AddressLine address={address} />
        <AcceptedPaymentsLine eligibleHealthInsurances={eligibleHealthInsurances} />
      </Stack>
    </Card.Section>
  )
}

interface FirstLineProps {
  name: string
}
function FirstLine ({ name }: FirstLineProps): JSX.Element {
  return (
    <Group justify="space-between">
      <Text className={baseClasses.normal_text}>{name}</Text>
      <StarReviewDisplay />
    </Group>
  )
}

function StarReviewDisplay (): JSX.Element {
  return (
    <Group gap={4}>
      <IconStarFilled size={12} />
      <Text className={baseClasses.normal_text}>4.5</Text>
    </Group>
  )
}

interface AddressLineProps {
  address: string
}
function AddressLine ({ address }: AddressLineProps): JSX.Element {
  return (
    <Text className={baseClasses.sub_text}>{address}</Text>
  )
}

interface AcceptedPaymentsLineProps {
  eligibleHealthInsurances: string[]
}

function AcceptedPaymentsLine ({ eligibleHealthInsurances }: AcceptedPaymentsLineProps): JSX.Element {
  return (
    <Text className={baseClasses.sub_text}>Accepts {eligibleHealthInsurances.join(', ')}</Text>
  )
}
