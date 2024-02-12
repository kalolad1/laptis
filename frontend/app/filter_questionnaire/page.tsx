'use client'

import { useState } from 'react'

import { AddressAutofill } from '@mapbox/search-js-react'
import { Container, Stack, Fieldset, Radio, Group, NumberInput, TextInput } from '@mantine/core'
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
            <Fieldset legend="Address">
              <Stack gap="md">
                <AddressInput />
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
  const [value, setValue] = useState<string | number | undefined>(25)

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

function AddressInput (): any {
  return (
    <form>
      <AddressAutofill accessToken="pk.eyJ1IjoiZGthbG9sYTExIiwiYSI6ImNsc2plODRtZzJxeTMybnQwd2k1N3d0dHAifQ.L1iMOPlcW9TwjRqWrAoh8A">
        <TextInput
          name="street-address"
          label="Street Address"
          placeholder="Street Address"
          autoComplete="address-line1"
        />
      </AddressAutofill>
      <TextInput
        name="city"
        label="City"
        placeholder="City"
        autoComplete="address-level2"
      />
      <TextInput
        name="state"
        label="State"
        placeholder="State"
        autoComplete="address-level1"
      />
      <TextInput
        name="country"
        label="Country"
        placeholder="Country"
        autoComplete="country"
      />
      <TextInput
        name="zip-code"
        label="ZIP Code"
        placeholder="ZIP Code"
        autoComplete="postal-code"
      />
    </form>
  )
}
