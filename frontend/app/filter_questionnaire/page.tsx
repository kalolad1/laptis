'use client'

import { useState } from 'react'

import { Container, Stack, Fieldset, Radio, Group } from '@mantine/core'

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
              <SexInput />
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
