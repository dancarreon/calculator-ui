import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import {getUserInfo} from "@/server/actions/actions";
import {type User} from "@/types/user";

export const metadata = { title: `Account | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<any> {

  const userInfo = await getUserInfo() as User;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo user={userInfo} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm user={userInfo} />
        </Grid>
      </Grid>
    </Stack>
  );
}
