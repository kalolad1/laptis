import { useState } from 'react'

import { Fieldset, Stack, Radio } from '@mantine/core'

export default function FilterQuestionnaire (): any {
  return (
    <Stack gap="md">
      <Fieldset legend="Demographic Information">
        <GenderInput />
      </Fieldset>
    </Stack>
  )
}

function GenderInput (): any {
  const [value, setValue] = useState('react')

  return (
    <Radio.Group
      value={value}
      onChange={setValue}
      name="genderInput"
      label="What is your gender?"
      withAsterisk
    >
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Other" />
    </Radio.Group>
  )
}
