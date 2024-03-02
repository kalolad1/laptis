'use client'

import { useState } from 'react'
import { AddressAutofill } from '@mapbox/search-js-react'

import { Container, Stack, Fieldset, Radio, Group, MultiSelect, NumberInput, TextInput, Select, Button } from '@mantine/core'
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
        <Container pt="lg" mb="xl">
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
            <Fieldset legend="Medical Information">
              <Stack gap="md">
                <MedicationAssistedTherapyInput />
                <SubstanceUseInput />
                <MentalHealthDiagnosesInput />
                <SuicidalIdeationInput />
                <HealthInsuranceInput />
                <HealthInsuranceIdentifierInput />
              </Stack>
            </Fieldset>
            <Fieldset legend="Insurance Information">
              <Stack gap="md">
                <HealthInsuranceInput />
                <HealthInsuranceIdentifierInput />
              </Stack>
            </Fieldset>
            <Fieldset legend="Other Information">
              <Stack gap="md">
                <MobilityRestrictionsInput />
                <FaithBasedTreatmentInput />
              </Stack>
            </Fieldset>
            <Button type="submit">Submit</Button>
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

function MedicationAssistedTherapyInput (): any {
  const medications = ['methadone', 'suboxone', 'vivtrol']
  const label = 'Are you using ' + medications.join(', ').replace(/,([^,]*)$/, ' or$1') + '?'
  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={medications}
    />
  )
}

function SubstanceUseInput (): any {
  const substances = ['alcohol', 'marijuana', 'cocaine', 'methamphetamine', 'heroin', 'prescription opioids', 'bath salts', 'PCP', 'ecstasy']
  const label = 'What other substances are you using?'
  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={substances}
    />
  )
}

function MentalHealthDiagnosesInput (): any {
  const diagnoses = ['depression', 'anxiety', 'bipolar disorder', 'schizophrenia', 'PTSD', 'ADHD', 'OCD', 'eating disorder', 'personality disorder']
  const label = 'Do you have any of the following mental health diagnoses?'
  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={diagnoses}
    />
  )
}

function SuicidalIdeationInput (): any {
  const [value, setValue] = useState<string | null>('')

  return (
    <Select
      label="Have you had any thoughts of suicide in the last 90 days?"
      placeholder="Choose answer"
      value={value}
      onChange={setValue}
      data={['No', 'Yes']}
    />
  )
}

function HealthInsuranceInput (): any {
  const [value, setValue] = useState<string | null>('')

  const insurances = ['MassHealth', 'Massachusetts Behavioral Health Partnership', 'WellSense', 'Neighborhood Health Plan', 'Fallon Health Plan', 'Tufts Health Plan', 'Commonwealth Care Alliance', 'Community Care Cooperative', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'United Health Care', 'Humana', 'Health New England', 'Mass General Brigham Health Plan', 'Other']
  const label = 'What health insurance provider does you have?'

  return (
    <Select
      label={label}
      placeholder="Choose answer"
      value={value}
      onChange={setValue}
      data={insurances}
    />
  )
}

function HealthInsuranceIdentifierInput (): any {
  const [value, setValue] = useState('')
  const label = 'If you have MassHealth, please provide your Social Security Number. If you have a private health insurance, please provide your ID number.'

  return (
    <TextInput
      label={label}
      placeholder="Enter your ID number"
      value={value}
      onChange={(event) => { setValue(event.currentTarget.value) }}
    />
  )
}

function MobilityRestrictionsInput (): any {
  const [value, setValue] = useState<string | null>('')

  return (
    <Select
      label="Do you have any mobility restrictions?"
      placeholder="Choose answer"
      value={value}
      onChange={setValue}
      data={['No', 'Yes']}
    />
  )
}

function FaithBasedTreatmentInput (): any {
  const [value, setValue] = useState<string | null>('')

  return (
    <Select
      label="Are you open to faith-based treatment?"
      placeholder="Choose answer"
      value={value}
      onChange={setValue}
      data={['Yes', 'No']}
    />
  )
}
