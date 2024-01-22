'use client';

import {
    Card,
    Text,
    Grid,
    UnstyledButton,
    Anchor,
    Group,
    useMantineTheme,
    Container,
  } from '@mantine/core';
  import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
  } from '@tabler/icons-react';
  import classes from './main_content.module.css';
  import { CenterCard } from './center_card';
  
  const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
    { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
    { title: 'Transfers', icon: IconRepeat, color: 'blue' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
    { title: 'Reports', icon: IconReport, color: 'pink' },
    { title: 'Payments', icon: IconCoin, color: 'red' },
    { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
  ];
  
  export function MainContent() {
    const theme = useMantineTheme();
    const child = <CenterCard />
    return (
        <Container size="lg">
            <Grid mt="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{child}</Grid.Col>
            </Grid>
        </Container>
    );
  }