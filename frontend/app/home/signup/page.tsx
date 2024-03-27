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
  Button,
  Stack,
  Select
} from '@mantine/core'

import baseClasses from '@/app/base.module.css'

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
    <Container size={420} my={40}>
      <form onSubmit={handleSubmit}>
        <Text className={baseClasses.title_main} ta="center">
          Welcome!
        </Text>
        <Text className={baseClasses.normal_text} ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor component="button" onClick={handleLoginButtonClick}>
            Log in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
          <Button className={baseClasses.normal_text} type="submit" fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
