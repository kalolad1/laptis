'use client'

import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Text,
  Container,
  Group
} from '@mantine/core'

import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

import { logIn } from '@/app/api/log_in'
import { PROVIDER_DASHBOARD_PATIENTS_TAB_PATH, SIGNUP_PATH } from '@/app/constants/paths'

import baseClasses from '@/app/base.module.css'

export default function LoginPage (): JSX.Element {
  const form = useForm({ initialValues: { email: '', password: '' } })
  const router = useRouter()

  function handleCreateAccountButtonClick (): void {
    console.log('Create account button clicked')
    router.push(SIGNUP_PATH)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    logIn(form.values.email, form.values.password)
      .then(() => {
        console.log('Logged in')
        router.push(PROVIDER_DASHBOARD_PATIENTS_TAB_PATH)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Container size={420} mt="md">
      <Text className={baseClasses.title_main} ta="center">
        Welcome back!
      </Text>
      <Text className={baseClasses.normal_text} ta="center" mt={5}>
        Don&apos;t have an account yet?{' '}
        <Anchor component="button" onClick={handleCreateAccountButtonClick}>
          Create account
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            className={baseClasses.normal_text}
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            className={baseClasses.normal_text}
            label="Password"
            placeholder="Your password"
            required mt="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox className={baseClasses.normal_text} label="Remember me" />
            <Anchor component="button" className={baseClasses.normal_text} size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Group justify="center" mt="xl">
            <PrimaryButton type="submit">
              Sign in
            </PrimaryButton>
          </Group>
        </Paper>
      </form>
    </Container>
  )
}
