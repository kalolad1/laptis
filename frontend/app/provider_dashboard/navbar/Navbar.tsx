import { Container, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons-react'

import classes from './Navbar.module.css'

export default function Navbar (): JSX.Element {
  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Title order={3}>Andrew Steen</Title>
          <a href="#" className={classes.profileOptionsButton} onClick={(event) => { event.preventDefault() }}>
            <IconUserCircle className={classes.profileOptionsButtonIcon} stroke={1.5} />
          </a>
        </div>
      </Container>
    </header>
  )
}
