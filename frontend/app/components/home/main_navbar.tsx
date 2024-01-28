'use client';

import {
  Image,
  Group,
  Button,
  Box,
  rem,
  ActionIcon,
  useMantineTheme,
  TextInput
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './main_navbar.module.css';

export function MainNavbar() {
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Image
              src="/logo.png"
              width={50}
              height={50}
            />
          </Group>
          <Group>
            <TextInput
              radius="xl"
              size="md"
              placeholder="Search for a center"
              rightSectionWidth={42}
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                  <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              }
            />
          </Group>
          <Group>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}