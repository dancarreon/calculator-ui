'use server'

import {cookies} from "next/headers";

const baseUrl: string = process.env.BACK_END_URL!;

export const login = async (email: string, password: string) => {
  try {

    const loginResponse = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': email,
        password,
      }),
      cache: "no-cache",
      credentials: 'include',
    });

    console.log("Login Status: {}", loginResponse.status);

    if (loginResponse.ok) {

      const cookieParams = loginResponse.headers.getSetCookie()[0].toString().split(';');
      const cookieNameValue = cookieParams[0].split('=');

      cookies().set({
        name: 'JSESSIONID',
        value: cookieNameValue[1],
        sameSite: 'none',
        secure: true,
        path: '/',
        httpOnly: true,
      });

      return true;
    }

  } catch (error) {
    console.log("Error: {}", error);
  }

  return false;
}

export const logout = async () => {

  const logoutResponse = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
    },
  });

  if (logoutResponse.ok) {
    console.log("Logout Status: {}", logoutResponse.status);
    cookies().delete('JSESSIONID')
    cookies().set('JSESSIONID', '', {maxAge: 0})
    return true;
  }

  return false;
}

export const getUserInfo = async () => {

  const cookie = cookies().get('JSESSIONID')?.value

  if (cookie) {
    try {
      const userInfo = await fetch(`${baseUrl}/user/me`, {
        method: 'GET',
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `JSESSIONID=${cookie}`,
        },
      });

      console.log("User Info Status: {}", userInfo.status);

      if (userInfo.ok) {
        return userInfo.json();
      }

    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export const getUserBalance = async () => {

  const cookie = cookies().get('JSESSIONID')?.value

  if (cookie) {
    try {
      const userBalance = await fetch(`${baseUrl}/user/balance`, {
        method: 'GET',
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `JSESSIONID=${cookie}`,
        },
      });

      console.log("User Balance Status: {}", userBalance.status);

      if (userBalance.ok) {
        return userBalance.json();
      }

    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export const getHistory = async () => {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const userHistory = await fetch( `${baseUrl}/user/records`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("User History Status: {}", userHistory.status);

      if (userHistory.ok) {
        return userHistory.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doAddition (formData: FormData) {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const a = formData?.get('a') as string;
      const b = formData?.get('b') as string;
      const additionResponse = await fetch(`${baseUrl}/calculator/addition?a=${a}&b=${b}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("Addition Status: {}", additionResponse.status);

      if (additionResponse.ok) {
        return additionResponse.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doSubtraction (formData: FormData) {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const a = formData?.get('a') as string;
      const b = formData?.get('b') as string;
      const subtractionResponse = await fetch(`${baseUrl}/calculator/subtraction?a=${a}&b=${b}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("Subtraction Status: {}", subtractionResponse.status);

      if (subtractionResponse.ok) {
        return subtractionResponse.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doMultiplication(formData: FormData) {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const a = formData?.get('a') as string;
      const b = formData?.get('b') as string;
      const multiplicationResponse = await fetch(`${baseUrl}/calculator/multiplication?a=${a}&b=${b}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("Multiplication Status: {}", multiplicationResponse.status);

      if (multiplicationResponse.ok) {
        return multiplicationResponse.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doDivision(formData: FormData) {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const a = formData?.get('a') as string;
      const b = formData?.get('b') as string;
      const divisionResponse = await fetch(`${baseUrl}/calculator/division?a=${a}&b=${b}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("Division Status: {}", divisionResponse.status);

      if (divisionResponse.ok) {
        return divisionResponse.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doSquareRoot(formData: FormData) {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const a = formData?.get('a') as string;
      const b = formData?.get('b') as string;
      const squareRootResponse = await fetch(`${baseUrl}/calculator/square-root?a=${a}&b=${b}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("SquareRoot Status: {}", squareRootResponse.status);

      if (squareRootResponse.ok) {
        return squareRootResponse.json()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function doRandomString() {

  const cookie = cookies().get('JSESSIONID')?.value;

  if (cookie) {
    try {
      const randomStringResponse = await fetch(`${baseUrl}/calculator/random-string`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Cookie': `JSESSIONID=${cookies().get('JSESSIONID')?.value}`,
        },
      })

      console.log("Random String Status: {}", randomStringResponse.status);

      if (randomStringResponse.ok) {
        return randomStringResponse.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
