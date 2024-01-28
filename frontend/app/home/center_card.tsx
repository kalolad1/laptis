'use client'

import { Card, Image, Text, Group, Badge } from '@mantine/core'
import classes from './center_card.module.css';

const mockdata = {
  image: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'Bay Cove Substance Abuse Center',
  country: 'Clinical Stabilization Services',
  location: '66 Canal St, Boston, MA 02114'
}

export function CenterCard (): any {
  const { image, title, location, country } = mockdata

  return (
    <Card radius="md" p="md" component="a" href="/center/1" target="_blank">
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {country}
          </Badge>
          <Text fz="md" fw={200}>
            {location}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  )
}
