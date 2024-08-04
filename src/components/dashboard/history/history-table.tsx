'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

function noop(): void {
  // do nothing
}

export interface UserRecord {
  amount: number;
  userBalance: number;
  operationResponse: number;
  date: Date;
  avatar: string;
}

interface TableProps {
  count?: number;
  page?: number;
  rows?: UserRecord[];
  rowsPerPage?: number;
}

export function HistoryTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: TableProps): React.JSX.Element {

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Response</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell>
                    <Avatar src={row?.avatar} />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row?.amount}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row?.operationResponse}</TableCell>
                  <TableCell>{dayjs(row?.date).format('MMM D, YYYY HH:MM:ss')}</TableCell>
                  <TableCell>{row?.userBalance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
