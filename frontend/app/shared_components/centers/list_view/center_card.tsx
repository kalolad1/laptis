'use client'

import { useRouter } from 'next/navigation'
import { type Center } from '../../../constants/types'

import { Card, Image, Text, Group, Stack, Badge } from '@mantine/core'
import { IconStarFilled } from '@tabler/icons-react'

import './center_card.css'

interface CenterCardProps {
  center: Center
  userId: string
  patientApplicationContextId: string
}

export default function CenterCard ({ center, userId, patientApplicationContextId }: CenterCardProps): JSX.Element {
  const router = useRouter()

  function handleClick (): void {
    const urlParams = new URLSearchParams({ userId, patientApplicationContextId })
    const queryString = urlParams.toString()
    router.push(`center/${center.id}?${queryString}`)
  }

  return (
    <Card radius="md" p="md" component="a" onClick={handleClick}>
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
        <Image src={image} height={240} radius="md" />
        <Badge variant="dot" color="blue" className="image-overlaying-badge">{centerType}</Badge>
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
    <Card.Section mt="xs">
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
      <Text c="black" fw={500} size='sm'>{name}</Text>
      <StarReviewDisplay />
    </Group>
  )
}

function StarReviewDisplay (): JSX.Element {
  return (
    <Group gap={4}>
      <IconStarFilled size={12} />
      <Text c="black" fw={500} size='sm'>4.5</Text>
    </Group>
  )
}

interface AddressLineProps {
  address: string
}
function AddressLine ({ address }: AddressLineProps): JSX.Element {
  return (
    <Text c="gray" fw={400} size='sm'>{address}</Text>
  )
}

interface AcceptedPaymentsLineProps {
  eligibleHealthInsurances: string[]
}

function AcceptedPaymentsLine ({ eligibleHealthInsurances }: AcceptedPaymentsLineProps): JSX.Element {
  return (
    <Text c="gray" fw={400} size='sm'>Accepts {eligibleHealthInsurances.join(', ')}</Text>
  )
}
