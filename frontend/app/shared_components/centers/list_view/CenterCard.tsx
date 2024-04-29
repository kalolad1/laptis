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
      <PictureArea image={center.image} centerType={center.centerType} availableBeds={center.availableBeds} />
      <CenterDescription name={center.name} address={center.address} eligibleHealthInsurances={center.eligibleHealthInsurances} />
    </Card>
  )
}

interface PictureAreaProps {
  image: string
  centerType: string
  availableBeds: number
}
function PictureArea ({ image, centerType, availableBeds }: PictureAreaProps): JSX.Element {
  const images = [
    'Answer House.png',
    'Bay Cove Substance Abuse Center.png',
    'Boston Comprehensive Treatment Center.png',
    'Health Care Resource Centers Boston.png',
    'Hope House, Inc..png',
    'PAATHS Program.png',
    'Project Trust.png',
    'Providence Treatment for Professionals.png',
    'The Gavin Foundation - Devine Recovery Center.png',
    'Victory House.png'
  ]
  // TODO: Replace with actual image
  const randomImage = '../../../centers/' + images[Math.floor(Math.random() * images.length)]

  return (
    <Card.Section>
      <div style={{ position: 'relative' }}>
        <Image src={randomImage} height={240} />
        <Stack className={classes.badges_overlaying_image} gap="4px">
          {availableBeds > 0
            ? <Badge variant="dot" color="green" className={classes.image_overlaying_badge}>Beds available</Badge>
            : <Badge variant="dot" color="red" className={classes.image_overlaying_badge}>No beds available</Badge>
          }
          <Badge variant="dot" color="blue">{centerType}</Badge>
        </Stack>
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
    <Group justify="space-between" wrap="nowrap">
      <Text className={baseClasses.normal_text} truncate="end">{name}</Text>
      <StarReviewDisplay />
    </Group>
  )
}

function StarReviewDisplay (): JSX.Element {
  // TODO: Replace with actual rating
  const rating = (Math.random() * 3 + 2).toFixed(1)
  return (
    <Group gap={4} wrap="nowrap">
      <IconStarFilled size={12} />
      <Text className={baseClasses.normal_text}>{rating}</Text>
    </Group>
  )
}

interface AddressLineProps {
  address: string
}
function AddressLine ({ address }: AddressLineProps): JSX.Element {
  return (
    <Text className={baseClasses.sub_text} truncate="end">{address}</Text>
  )
}

interface AcceptedPaymentsLineProps {
  eligibleHealthInsurances: string[]
}

function AcceptedPaymentsLine ({ eligibleHealthInsurances }: AcceptedPaymentsLineProps): JSX.Element {
  return (
    <Text className={baseClasses.sub_text} truncate="end">Accepts {eligibleHealthInsurances.join(', ')}</Text>
  )
}
