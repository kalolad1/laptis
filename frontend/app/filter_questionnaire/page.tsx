'use client'

import { useRouter } from 'next/navigation'
import { AddressAutofill } from '@mapbox/search-js-react'

import { Container, Stack, Fieldset, Radio, Group, MultiSelect, TextInput, Select, Button, NumberInput } from '@mantine/core'

import MainNavbar from '@/app/navbar/main_navbar'
import { useForm } from '@mantine/form'

export default function FilterQuestionnairePage (): any {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <FilterQuestionnaireForm />
      </main>
    </>
  )
}

function FilterQuestionnaireForm (): any {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      sex: '',
      age: null,
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      medicationAssistedTherapy: [],
      substanceUse: [],
      mentalHealthDiagnoses: [],
      suicidalIdeation: 'no',
      healthInsurance: '',
      healthInsuranceIdentifier: '',
      hasDisability: 'no',
      isOpenToFaithBasedTreatment: 'yes'
    }
  })

  function handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const urlParams = new URLSearchParams(form.values)
    const queryString = urlParams.toString()
    router.push('/filtered_results?' + queryString)
  }

  return (
    <Container pt="lg" mb="xl">
      <form onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Fieldset legend="Demographic Information">
            <Stack gap="md">
              <SexInput {...form.getInputProps('sex')} />
              <AgeInput {...form.getInputProps('age')} />
            </Stack>
          </Fieldset>
          <Fieldset legend="Address">
            <Stack gap="md">
              <AddressAutofill accessToken="pk.eyJ1IjoiZGthbG9sYTExIiwiYSI6ImNsc2plODRtZzJxeTMybnQwd2k1N3d0dHAifQ.L1iMOPlcW9TwjRqWrAoh8A">
                <TextInput
                  name="street-address"
                  label="Street Address"
                  placeholder="Street Address"
                  autoComplete="address-line1"
                  withAsterisk
                  {...form.getInputProps('streetAddress')}
                />
              </AddressAutofill>
              <TextInput
                name="city"
                label="City"
                placeholder="City"
                autoComplete="address-level2"
                withAsterisk
                {...form.getInputProps('city')}
              />
              <TextInput
                name="state"
                label="State"
                placeholder="State"
                autoComplete="address-level1"
                withAsterisk
                {...form.getInputProps('state')}
              />
              <TextInput
                name="country"
                label="Country"
                placeholder="Country"
                autoComplete="country"
                withAsterisk
                {...form.getInputProps('country')}
              />
              <TextInput
                name="zip-code"
                label="ZIP Code"
                placeholder="ZIP Code"
                autoComplete="postal-code"
                withAsterisk
                {...form.getInputProps('zipCode')}
              />
            </Stack>
          </Fieldset>
          <Fieldset legend="Medical Information">
            <Stack gap="md">
              <MedicationAssistedTherapyInput {...form.getInputProps('medicationAssistedTherapy')} />
              <SubstanceUseInput {...form.getInputProps('substanceUse')} />
              <MentalHealthDiagnosesInput {...form.getInputProps('mentalHealthDiagnoses')} />
              <SuicidalIdeationInput {...form.getInputProps('suicidalIdeation')} />
            </Stack>
          </Fieldset>
          <Fieldset legend="Insurance Information">
            <Stack gap="md">
              <HealthInsuranceInput {...form.getInputProps('healthInsurance')} />
              <HealthInsuranceIdentifierInput {...form.getInputProps('healthInsuranceIdentifier')} />
            </Stack>
          </Fieldset>
          <Fieldset legend="Other Information">
            <Stack gap="md">
              <HasDisabilityInput {...form.getInputProps('hasDisability')} />
              <FaithBasedTreatmentInput {...form.getInputProps('faithBasedTreatment')} />
            </Stack>
          </Fieldset>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Container>
  )
}

function SexInput (props): any {
  return (
    <Radio.Group
      name="sexInput"
      label="What is your sex?"
      withAsterisk
      {...props}
    >
      <Group mt="xs">
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
        <Radio value="other" label="Other" />
      </Group>
    </Radio.Group>
  )
}

function AgeInput (props): any {
  return (
    <NumberInput
      label="What is your age?"
      withAsterisk
      {...props}
    />
  )
}

function MedicationAssistedTherapyInput (props): any {
  const medications = ['methadone', 'suboxone', 'vivtrol']
  const label = 'Are you using ' + medications.join(', ').replace(/,([^,]*)$/, ' or$1') + '?'
  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={medications}
      withAsterisk
      {...props}
    />
  )
}

function SubstanceUseInput (props): any {
  const substances = ['alcohol', 'marijuana', 'cocaine', 'methamphetamine', 'heroin', 'prescription opioids', 'bath salts', 'PCP', 'ecstasy']
  const label = 'What other substances are you using?'
  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={substances}
      withAsterisk
      {...props}
    />
  )
}

function MentalHealthDiagnosesInput (props): any {
  const diagnoses = ['depression', 'anxiety', 'bipolar disorder', 'schizophrenia', 'PTSD', 'ADHD', 'OCD', 'eating disorder', 'personality disorder']
  const label = 'Do you have any of the following mental health diagnoses?'

  return (
    <MultiSelect
      label={label}
      placeholder="Select drugs"
      data={diagnoses}
      withAsterisk
      {...props}
    />
  )
}

function SuicidalIdeationInput (props): any {
  return (
    <Select
      label="Have you had any thoughts of suicide in the last 90 days?"
      placeholder="Choose answer"
      data={[
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' }
      ]}
      withAsterisk
      {...props}
    />
  )
}

function HealthInsuranceInput (props): any {
  const insurances = ['MassHealth', 'Massachusetts Behavioral Health Partnership', 'WellSense', 'Neighborhood Health Plan', 'Fallon Health Plan', 'Tufts Health Plan', 'Commonwealth Care Alliance', 'Community Care Cooperative', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'United Health Care', 'Humana', 'Health New England', 'Mass General Brigham Health Plan', 'Other']
  const label = 'What health insurance provider does you have?'

  return (
    <Select
      label={label}
      placeholder="Choose answer"
      data={insurances}
      withAsterisk
      {...props}
    />
  )
}

function HealthInsuranceIdentifierInput (props): any {
  const label = 'If you have MassHealth, please provide your Social Security Number. If you have a private health insurance, please provide your ID number.'

  return (
    <TextInput
      label={label}
      placeholder="Enter your ID number"
      withAsterisk
      {...props}
    />
  )
}

function HasDisabilityInput (props): any {
  return (
    <Select
      label="Do you have a disability?"
      placeholder="Choose answer"
      data={[
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' }
      ]}
      withAsterisk
      {...props}
    />
  )
}

function FaithBasedTreatmentInput (props): any {
  return (
    <Select
      label="Are you open to faith-based treatment?"
      placeholder="Choose answer"
      data={[
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' }
      ]}
      withAsterisk
      {...props}
    />
  )
}
