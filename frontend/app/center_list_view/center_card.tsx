/* eslint-disable @typescript-eslint/naming-convention */
'use client'

import { Card, Image, Text, Group, Stack, Badge } from '@mantine/core'
import { IconStarFilled } from '@tabler/icons-react'
import { type Center } from '../constants/types'

import './center_card.css'

interface CenterCardProps {
  center: Center
}

export default function CenterCard ({ center }: CenterCardProps): any {
  return (
    <Card radius="md" p="md" component="a" href={'/center/' + center.id} target="_blank">
      <PictureArea image={center.image} centerType={center.center_type} />
      <CenterDescription name={center.name} address={center.address} eligible_health_insurances={center.eligible_health_insurances} />
    </Card>
  )
}

interface PictureAreaProps {
  image: string
  centerType: string
}
function PictureArea ({ image, centerType }: PictureAreaProps): any {
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
  eligible_health_insurances: string[]
}
function CenterDescription ({ name, address, eligible_health_insurances }: CenterDescriptionProps): any {
  return (
    <Card.Section mt="xs">

      <FirstLine name={name} />
      <Stack gap={0}>
        <AddressLine address={address} />
        <AcceptedPaymentsLine eligible_health_insurances={eligible_health_insurances}/>
      </Stack>
    </Card.Section>
  )
}

interface FirstLineProps {
  name: string
}
function FirstLine ({ name }: FirstLineProps): any {
  return (
    <Group justify="space-between">
      <Text c="black" fw={500} size='sm'>{name}</Text>
      <StarReviewDisplay />
    </Group>
  )
}

function StarReviewDisplay (): any {
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
function AddressLine ({ address }: AddressLineProps): any {
  return (
    <Text c="gray" fw={400} size='sm'>{address}</Text>
  )
}

interface AcceptedPaymentsLineProps {
  eligible_health_insurances: string[]
}

function AcceptedPaymentsLine ({ eligible_health_insurances }: AcceptedPaymentsLineProps): any {
  if (eligible_health_insurances !== undefined) {
    return (
      <Text c="gray" fw={400} size='sm'>Accepts {eligible_health_insurances.join(', ')}</Text>
    )
  }
}
