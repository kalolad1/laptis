'use client'

import { Card, Image, Text, Group, Badge } from '@mantine/core'
import classes from './center_card.module.css';

export function CenterCard ({ center }): any {
  return (
    <Card radius="md" p="md" component="a" href="/center/1" target="_blank">
      <Card.Section>
        <Image src={center.image} alt={center.name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {center.name}
          </Text>
          <Badge size="sm" variant="light">
            {center.centerType}
          </Badge>
          <Text fz="md" fw={200}>
            {center.location}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  )
}
