'use client'

import { useState } from 'react'

import { Container, Stack, Fieldset, Radio, Group, NumberInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'

import MainNavbar from '@/app/navbar/main_navbar'

export default function FilterQuestionnairePage (): any {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <Container pt="lg">
          <Stack gap="md">
            <Fieldset legend="Demographic Information">
              <Stack gap="md">
                <SexInput />
                <AgeInput />
                <DateOfBirthInput />
              </Stack>
            </Fieldset>
          </Stack>
        </Container>
      </main>
    </>
  )
}

function SexInput (): any {
  const [value, setValue] = useState('react')

  return (
    <Radio.Group
      value={value}
      onChange={setValue}
      name="sexInput"
      label="What is your sex?"
      withAsterisk
    >
      <Group mt="xs">
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
        <Radio value="other" label="Other" />
      </Group>
    </Radio.Group>
  )
}

function AgeInput (): any {
  const [value, setValue] = useState(25)

  return (
    <NumberInput
      value={value}
      onChange={setValue}
      min={12}
      max={150}
      label="What is your age?"
      hideControls
      withAsterisk
    />
  )
}

function DateOfBirthInput (): any {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <DateInput
      value={value}
      onChange={setValue}
      label="What is your date of birth?"
      placeholder="M/D/YYYY"
      valueFormat='M/D/YYYY'
      withAsterisk
    />
  )
}
