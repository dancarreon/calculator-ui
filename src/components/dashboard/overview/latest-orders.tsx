import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type {SxProps} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {ArrowRight as ArrowRightIcon} from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';
import {paths} from "@/paths";
import {Is} from "@sinclair/typebox/value/is";

const statusMap = {
  400: { label: 'Unauthorized', color: 'warning' },
  200: { label: 'Success', color: 'success' },
  500: { label: 'Error', color: 'error' },
} as const;

export interface Order {
  id: string;
  customer: { name: string };
  amount: number;
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

export interface UserRecord {
  amount: number;
  userBalance: number;
  operationResponse: keyof typeof statusMap;
  date: Date;
}

export interface LatestOrdersProps {
  orders?: UserRecord[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Requests" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Cost</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 ? orders.map((order, index) => {
              const { label, color } = statusMap[order.operationResponse] ?? { label: 'Unknown', color: 'default' };
              return (
                <TableRow hover key={index}>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.userBalance}</TableCell>
                  <TableCell>{dayjs(order.date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          href={paths.dashboard.history}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
