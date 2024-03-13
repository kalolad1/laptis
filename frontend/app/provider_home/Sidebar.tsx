'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Center, Image } from '@mantine/core'
import { IconUsers, IconLogout, IconHome } from '@tabler/icons-react'

import classes from './Sidebar.module.css'

const tabs = [
  { link: '', label: 'Patients', icon: IconUsers },
  { link: '', label: 'Centers', icon: IconHome }
]

export default function Sidebar (): JSX.Element {
  const [active, setActive] = useState('Patients')

  const links = tabs.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <Center>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
          <Image
            src="/logo.svg"
            w="auto"
            fit="contain"
            height={75}
          />
        </Link>
      </Center>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => { event.preventDefault() }}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
