import { Container, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons-react'

import classes from './DashboardNavbar.module.css'

export default function DashboardNavbar ({ loggedInUserName }: { loggedInUserName: string }): JSX.Element {
  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Title order={3}>{loggedInUserName}</Title>
          <a href="#" className={classes.profileOptionsButton} onClick={(event) => { event.preventDefault() }}>
            <IconUserCircle className={classes.profileOptionsButtonIcon} stroke={1.5} />
          </a>
        </div>
      </Container>
    </header>
  )
}
