import { useForm } from '@mantine/form'

import { createPatient } from '@/app/api/create_patient'
import { type NewPatientInfo } from '@/app/constants/types'

import { Modal, Group, TextInput, NumberInput, Select, MultiSelect, Textarea, Stack } from '@mantine/core'

import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

interface NewPatientModalProps {
  opened: boolean
  close: () => void
  callGetPatients: () => void
}

export default function NewPatientModal ({ opened, close, callGetPatients }: NewPatientModalProps): JSX.Element {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      age: 25,
      sex: '',
      languages: [],
      address: '',
      canTravel: 'Yes',
      milesCanTravel: 100,
      isHeldInConfinement: 'No',
      weeksHeldInConfinement: 4,
      criminalHistory: '',
      usingMedicationAssistedTherapies: [],
      usingSubstances: [],
      mentalHealthDiagnoses: [],
      healthInsurance: '',
      healthInsuranceIdentifier: '',
      hasDisability: 'No',
      isOpenToFaithBasedTreatment: 'Yes'
    }
  })
  function handleNewPatientModalSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const newPatientInfo: NewPatientInfo = {
      ...form.values,
      canTravel: form.values.canTravel === 'Yes',
      isHeldInConfinement: form.values.isHeldInConfinement === 'Yes',
      hasDisability: form.values.hasDisability === 'Yes',
      isOpenToFaithBasedTreatment: form.values.isOpenToFaithBasedTreatment === 'Yes'
    }
    console.log(newPatientInfo)
    createPatient(newPatientInfo)
      .then(response => {
        console.log(response)
        callGetPatients()
        close()
      })
      .catch(error => {
        console.error(error)
      })
  }

  function handleModalClose (): void {
    form.reset()
    close()
  }

  return (
    <Modal opened={opened} onClose={handleModalClose} title="Add a new patient" size="lg" radius="lg" centered>
      <form onSubmit={handleNewPatientModalSubmit}>
        <Stack p="lg">
          <TextInput
            label="First name"
            placeholder="John"
            required
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last name"
            placeholder="Doe"
            required
            {...form.getInputProps('lastName')}
          />
          <NumberInput
            label="Age"
            placeholder="25"
            required
            {...form.getInputProps('age')}
          />
          <Select
            label="Sex"
            placeholder="Pick value"
            data={['male', 'female', 'other']}
            required
            {...form.getInputProps('sex')}
          />
          <MultiSelect
            label="Spoken languages"
            placeholder="Pick value(s)"
            data={['English', 'Spanish', 'Portugese', 'Vietnamese', 'French', 'Other']}
            {...form.getInputProps('languages')}
          />
          <TextInput
            label="Geographic location (address, town, area, location, facility, transient/unhoused)"
            placeholder="Location"
            {...form.getInputProps('address')}
          />
          <Select
            label="Can your client travel to a treatment program (access to a car, public transport, etc.)?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            required
            {...form.getInputProps('canTravel')}
          />
          <NumberInput
            label="If so, how far are they able to travel (miles)?"
            placeholder="50"
            {...form.getInputProps('milesCanTravel')}
          />
          <Select
            label="Is your client currently being held in confinement?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            required
            {...form.getInputProps('isHeldInConfinement')}
          />
          <NumberInput
            label="If so, how long will they be held in confinement? (weeks)"
            placeholder="4"
            {...form.getInputProps('weeksHeldInConfinement')}
          />
          <Textarea
            label="Does your client have a criminal history? If yes, please list the charge, year of charge, and sentence."
            placeholder="Criminal history"
            rows={6}
            {...form.getInputProps('criminalHistory')}
          />
          <MultiSelect
            label="Is your client using any medication assisted therapies?"
            placeholder="Pick value(s)"
            data={['buprenorphine', 'naloxone', 'naltrexone', 'methadone', 'suboxone', 'sublocade', 'vivitrol', 'other']}
            {...form.getInputProps('usingMedicationAssistedTherapies')}
          />
          <MultiSelect
            label="Is your client using any substances?"
            placeholder="Pick value(s)"
            data={['alcohol', 'cocaine', 'ecstasy', 'heroin', 'marijuana', 'methamphetamine', 'opioids', 'other']}
            {...form.getInputProps('usingSubstances')}
          />
          <MultiSelect
            label="Does your client have any mental health diagnoses?"
            placeholder="Pick value(s)"
            data={['anxiety', 'bipolar', 'depression', 'obsessive-compulsive disorder', 'post-traumatic stress disorder', 'schizophrenia', 'other']}
            {...form.getInputProps('mentalHealthDiagnoses')}
          />
          <Select
            label="What health insurance does your client have?"
            placeholder="Pick value"
            data={['MassHealth', 'Uninsured', 'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Commonwealth Care Alliance', 'Community Care Cooperative', 'Fallon Health Plan', 'Health New England', 'Humana', 'Neighborhood Health Plan', 'Massachusetts Behavioral Health Partnership', 'Mass General Brigham Health Plan', 'Tufts Health Plan', 'United Health Care', 'WellSense', 'Other']}
            required
            {...form.getInputProps('healthInsurance')}
          />
          <TextInput
            label="What is your client's health insurance identifier?"
            placeholder="Identifier"
            {...form.getInputProps('healthInsuranceIdentifier')}
          />
          <Select
            label="Does your client have a disability?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            {...form.getInputProps('hasDisability')}
          />
          <Select
            label="Is your client open to faith-based treatment?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            {...form.getInputProps('isOpenToFaithBasedTreatment')}
          />
          <TextInput
            label="Is there anything else we are missing that you would like us to know?"
            placeholder="Enter"
          />

          <Group justify="center" mt="md">
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
