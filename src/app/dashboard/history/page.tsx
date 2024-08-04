import * as React from 'react';
import type {Metadata} from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {config} from '@/config';
import {HistoryTable} from '@/components/dashboard/history/history-table';
import {getHistory} from "@/server/actions/actions";

export const metadata = {title: `History | ${config.site.name}`} satisfies Metadata;

export interface UserRecord {
  amount: number;
  userBalance: number;
  operationResponse: number;
  date: Date;
}

export default async function Page(): Promise<any> {

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
        count={history ? history.length : null}
        page={page}
        rows={history}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
