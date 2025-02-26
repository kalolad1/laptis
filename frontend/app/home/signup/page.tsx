'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@mantine/form'

import { logIn } from '@/app/api/log_in'
import { signUp } from '@/app/api/sign_up'
import { LOGIN_PATH, PROVIDER_DASHBOARD_PATIENTS_TAB_PATH } from '@/app/constants/paths'

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Stack,
  Select,
  Group
} from '@mantine/core'

import baseClasses from '@/app/base.module.css'
import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

export default function SignupPage (): JSX.Element {
  const form = useForm({ initialValues: { firstName: '', lastName: '', email: '', password: '', userType: '' } })
  const router = useRouter()

  function handleLoginButtonClick (): void {
    router.push(LOGIN_PATH)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    signUp(form.values.firstName, form.values.lastName, form.values.email, form.values.password, form.values.userType)
      .then(() => {
        logIn(form.values.email, form.values.password)
          .then(() => {
            router.push(PROVIDER_DASHBOARD_PATIENTS_TAB_PATH)
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Container size={420} mt="md">
      <Text className={baseClasses.title_main} ta="center">
        Welcome!
      </Text>
      <Text className={baseClasses.normal_text} ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor component="button" onClick={handleLoginButtonClick}>
          Log in
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit}>
        <Paper shadow="xs" radius="lg" p={40} mt={30}>
          <Stack className={baseClasses.normal_text}>
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
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />
            <Select
              label="User type"
              placeholder="Pick value"
              data={['provider']}
              required
              {...form.getInputProps('userType')}
            />
          </Stack>
          <Group justify="center" mt="xl">
            <PrimaryButton type="submit">
              Sign up
            </PrimaryButton>
          </Group>
        </Paper>
      </form>
    </Container>
  )
}
