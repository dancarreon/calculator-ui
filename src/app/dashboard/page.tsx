'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
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

interface DivisionResponse {
  message: string;
}

interface RandomString {
  message: string;
}

export default function Page(): Promise<any> {

  const [additionResult, setAdditionResult] =  useState('');
  const [subtractionResult, setSubtractionResult] =  useState('');
  const [multiplicationResult, setMultiplicationResult] =  useState('');
  const [divisionResult, setDivisionResult] =  useState('');
  const [sqrtResult, setSqrtResult] =  useState('');
  const [randomStringResult, setRandomStringResult] =  useState('');
  const [userBalance, setUserBalance] = useState('');
  const [totalRequests, setTotalRequests] = useState(0);
  const [userHistory, setUserHistory] = useState<UserRecord[] | null>();

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
    const result: DivisionResponse = await doDivision(formData) as DivisionResponse;
    console.log(result);
    setDivisionResult(result.message);
  }

  const sqrtAction = async (formData: FormData) => {
    const result = await doSquareRoot(formData) as string;
    setSqrtResult(result);
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

  const onlyNumbers = (e) => {
    if (!/[0-9.]|Backspace|Tab|Enter|Delete|ArrowLeft|ArroRight/.test(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    retrieveUserBalance();
    retrieveTotalRequests();
  })

  useEffect(() => {
    retrieveUserHistory();
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={0} trend="up" sx={{height: '100%'}} value={userBalance}/>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={0} trend="down" sx={{height: '100%'}} value={totalRequests}/>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={additionAction}>
          <OutlinedInput name='a' sx={{marginRight: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '23px', verticalAlign: 'bottom'}}> + </Button>
          <OutlinedInput name='b' sx={{marginLeft: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={additionResult}/>
        </form>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={subtractionAction}>
          <OutlinedInput name='a' sx={{marginRight: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '23px', verticalAlign: 'bottom'}}> - </Button>
          <OutlinedInput name='b' sx={{marginLeft: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={subtractionResult}/>
        </form>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={multiplicationAction}>
          <OutlinedInput name='a' sx={{marginRight: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '23px', verticalAlign: 'bottom'}}> * </Button>
          <OutlinedInput name='b' sx={{marginLeft: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={multiplicationResult}/>
        </form>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={divisionAction}>
          <OutlinedInput name='a' sx={{marginRight: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '23px', verticalAlign: 'bottom'}}> / </Button>
          <OutlinedInput name='b' sx={{marginLeft: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={divisionResult}/>
        </form>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={sqrtAction}>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '23px', verticalAlign: 'bottom', marginLeft: '110px'}}> &#8730; </Button>
          <OutlinedInput name='a' sx={{marginLeft: '10px', width: '100px'}} onKeyDown={onlyNumbers}/>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={sqrtResult}/>
        </form>
      </Grid>
      <Grid lg={7} xs={12}>
        <form action={randomStringAction}>
          <Button type="button" variant="contained" disabled sx={{backgroundColor: '#677 !important', color: 'white !important', fontSize: '19.1px', verticalAlign: 'bottom', marginLeft: '110px'}}> Random String </Button>
          <Button type="submit" variant="contained" sx={{marginLeft: '10px', fontSize: '23px', verticalAlign: 'bottom'}}> = </Button>
          <OutlinedInput sx={{marginLeft: '10px', width: '30%'}} disabled value={randomStringResult}/>
        </form>
      </Grid>
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
