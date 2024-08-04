import * as React from 'react';
import type {Metadata} from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {config} from '@/config';
import {HistoryTable} from '@/components/dashboard/history/history-table';
import {getHistory} from "@/server/actions/actions";

export const metadata = {title: `History | ${config.site.name}`} satisfies Metadata;

const statusMap = {
  400: { label: 'Unauthorized', color: 'warning' },
  200: { label: 'Success', color: 'success' },
  500: { label: 'Error', color: 'error' },
} as const;

export interface UserRecord {
  amount: number;
  userBalance: number;
  operationResponse: keyof typeof statusMap;
  date: Date;
  avatar: string;
}

export default async function Page(): Promise<never> {

  const history = await getHistory() as UserRecord[];

  const page = 0;
  const rowsPerPage = 5;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{flex: '1 1 auto'}}>
          <Typography variant="h4">User History</Typography>
        </Stack>
      </Stack>
      <HistoryTable
        count={history ? history.length : 0}
        page={page}
        rows={history}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
