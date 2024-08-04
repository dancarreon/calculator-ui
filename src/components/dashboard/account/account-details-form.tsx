'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import {type User} from "@/types/user";

interface UserProps {
  user: User;
}

export function AccountDetailsForm({user}: UserProps): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Username</InputLabel>
                <OutlinedInput defaultValue={user?.username} label="Username" name="firstName" readOnly />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <OutlinedInput defaultValue={user?.status ? 'Active' : 'Inactive'} label="Last name" name="lastName" readOnly />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}
