'use client'

import * as React from 'react';
import {type ReactElement, useEffect, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Budget} from '@/components/dashboard/overview/budget';
import {LatestOrders} from '@/components/dashboard/overview/latest-orders';
import {TotalCustomers} from '@/components/dashboard/overview/total-customers';
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  doAddition,
  doDivision,
  doMultiplication,
  doRandomString,
  doSquareRoot,
  doSubtraction,
  getHistory,
  getUserBalance
} from "@/server/actions/actions";
import {type UserRecord} from "@/app/dashboard/history/page";
import Alert from "@mui/material/Alert";

interface DivisionResponse {
  message: string;
}

interface SqrtResponse {
  message: string;
}

interface RandomString {
  message: string;
}

export default function Page(): ReactElement {

  const [additionResult, setAdditionResult] = useState('');
  const [subtractionResult, setSubtractionResult] = useState('');
  const [multiplicationResult, setMultiplicationResult] = useState('');
  const [divisionResult, setDivisionResult] = useState('');
  const [sqrtResult, setSqrtResult] = useState('');
  const [randomStringResult, setRandomStringResult] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [totalRequests, setTotalRequests] = useState(0);
  const [userHistory, setUserHistory] = useState<UserRecord[]>();
  const [divisionAlert, setDivisionAlert] = useState('')
  const [squareRootAlert, setSquareRootAlert] = useState('')

  const additionAction = async (formData: FormData) => {
    const result = await doAddition(formData) as string;
    setAdditionResult(result);
  }

  const subtractionAction = async (formData: FormData) => {
    const result = await doSubtraction(formData) as string;
    setSubtractionResult(result);
  }

  const multiplicationAction = async (formData: FormData) => {
    const result = await doMultiplication(formData) as string;
    setMultiplicationResult(result);
  }

  const divisionAction = async (formData: FormData) => {

    let result: DivisionResponse = {
      message: ''
    }

    try {
      result = await doDivision(formData) as DivisionResponse;
      setDivisionResult(result.message);
    } catch (e) {
      setDivisionResult('');
      setDivisionAlert('Cannot divide by zero');
    }
  }

  const sqrtAction = async (formData: FormData) => {

    let result: SqrtResponse = {
      message: ''
    }

    try {
      result = await doSquareRoot(formData) as SqrtResponse;
      setSqrtResult(result.message);
    } catch (e) {
      setSqrtResult('');
      setSquareRootAlert('Cannot square root negative numbers');
    }
  }

  const randomStringAction = async () => {
    const result: RandomString = await doRandomString() as RandomString;
    setRandomStringResult(result?.message);
  }

  const retrieveUserBalance = async () => {
    const balance = await getUserBalance() as string;
    setUserBalance(balance);
  }

  const retrieveTotalRequests = async () => {
    const history = await getHistory() as UserRecord[];
    if (history) {
      setTotalRequests(history.length);
    }
  }

  const retrieveUserHistory = async () => {
    const history = await getHistory() as UserRecord[];
    if (history) {
      setUserHistory(history.slice(0, 2));
    }
  }

  const onlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9.]|Backspace|Tab|Enter|Delete|ArrowLeft|ArroRight|-/.test(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {

    retrieveUserBalance().catch((err: unknown) => {
      console.log(err);
    });

    retrieveTotalRequests().catch((err: unknown) => {
      console.log(err);
    });

  }, [])

  useEffect(() => {
    retrieveUserHistory().catch((err: unknown) => {
      console.log(err);
    });
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={0} trend="up" sx={{height: '100%'}} value={userBalance}/>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={0} trend="down" sx={{height: '100%'}} value={totalRequests.toString()}/>
      </Grid>
      <div style={{ width: '100%'}}>
        <Grid lg={7} xs={12}>
          <form action={additionAction}>
            <OutlinedInput name='a' sx={{marginRight: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '23px',
              verticalAlign: 'bottom'
            }}> + </Button>
            <OutlinedInput name='b' sx={{marginLeft: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '20%'}} disabled value={additionResult}/>
          </form>
        </Grid>
        <Grid lg={7} xs={12}>
          <form action={subtractionAction}>
            <OutlinedInput name='a' sx={{marginRight: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '23px',
              verticalAlign: 'bottom'
            }}> - </Button>
            <OutlinedInput name='b' sx={{marginLeft: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '20%'}} disabled value={subtractionResult}/>
          </form>
        </Grid>
        <Grid lg={7} xs={12}>
          <form action={multiplicationAction}>
            <OutlinedInput name='a' sx={{marginRight: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '23px',
              verticalAlign: 'bottom'
            }}> * </Button>
            <OutlinedInput name='b' sx={{marginLeft: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '20%'}} disabled value={multiplicationResult}/>
          </form>
        </Grid>
        <Grid lg={7} xs={12}>
          <form action={divisionAction}>
            <OutlinedInput name='a' sx={{marginRight: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '23px',
              verticalAlign: 'bottom'
            }}> / </Button>
            <OutlinedInput name='b' sx={{marginLeft: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '20%'}} disabled value={divisionResult}/>
          </form>
        </Grid>
        <Alert onClose={() => {
          setDivisionAlert('')
        }} severity="error" style={{width: '300px', display: divisionAlert.length > 0 ? 'flex' : 'none'}}>{divisionAlert}</Alert>
        <Grid lg={7} xs={13}>
          <form action={sqrtAction}>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '23px',
              verticalAlign: 'bottom',
              marginLeft: '0em',
            }}> &#8730; </Button>
            <OutlinedInput name='a' sx={{marginLeft: '10px', minWidth: '60px', width: '10%'}} onKeyDown={onlyNumbers}/>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '28%'}} disabled value={sqrtResult}/>
          </form>
        </Grid>
        <Alert onClose={() => {
          setSquareRootAlert('')
        }} severity="error" style={{width: '400px', display: squareRootAlert.length > 0 ? 'flex' : 'none' }}>{squareRootAlert}</Alert>
        <Grid lg={7} xs={12}>
          <form action={randomStringAction}>
            <Button type="button" variant="contained" disabled sx={{
              backgroundColor: '#677 !important',
              color: 'white !important',
              fontSize: '19.1px',
              verticalAlign: 'bottom',
              marginLeft: '0em'
            }}> Random String </Button>
            <Button type="submit" variant="contained"
                    sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
            <OutlinedInput sx={{marginLeft: '10px', width: '25%'}} disabled value={randomStringResult}/>
          </form>
        </Grid>
      </div>
      {/*<Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{height: '100%'}}/>
      </Grid>*/}
      <Grid lg={8} md={12} xs={12}>
        <LatestOrders
          orders={userHistory}
          sx={{height: '100%'}}
        />
      </Grid>
    </Grid>
  );
}
