import 'fomantic-ui-css/semantic.css';
import React, { useState, useContext, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Loading from '../loading/Loading';
import Link from 'next/link';
import { userContext } from '../../context/userContext';
import {
  signInUser,
  getGreet,
  getAppointments,
  getCustomers,
} from '../fetching/PostsWithAxios';
import { NotFound } from '../errors/errors';

const LoginForm = ({ isSignUpClick }) => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  const userCtx = useContext(userContext);
  const {
    setUserIsSignIn,
    setAppointmentsData,
    setCustomerData,
    setStaffData,
  } = userCtx;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // fetch staff and customers
    const graphqlQuery = {
      query: `
   {login(username:"${data?.email}", password:"${data?.password}") {
          token
          userId
        }
      }
      `,
    };
    setIsLoading(true);

    const signInData = await signInUser(graphqlQuery);

    console.log('login', signInData);
    if (signInData.errors) {
      setErrors(signInData?.errors);
    }
    const token = signInData?.data?.login?.token;
    if (token) {
      setUserIsSignIn(true);
      localStorage.setItem('token', JSON.stringify(token));
      setIsLoading(false);
      router.push('/');
      let page = 10;
      const queryCustomers = {
        graphqlQuery: {
          query: `
          query {
            getCustomers{
        
              totalCustomers
                customers{
                    _id
                    firstname
                    lastname
                }
                staff{
                    _id
                    firstname
                    lastname
                }
                totalStaff
           }
          }
          `,
        },
        token,
      };
      const customersData = await getCustomers(queryCustomers);
      if (customersData) {
        setCustomerData(customersData.data.getCustomers.customers);
        setStaffData(customersData.data.getCustomers.staff);
        localStorage.setItem(
          'customers',
          JSON.stringify(customersData.data.getCustomers.customers)
        );
        localStorage.setItem(
          'staff',
          JSON.stringify(customersData.data.getCustomers.staff)
        );
      }
      // fetch appointments
      const queryAppt = {
        token,
        graphql: {
          query: `query appointments($page: Int!) {
          appointments(page: $page) {
            appointments {
              _id
              status
              start
              end
              completed
              customer{
                  firstname
                  lastname
              }
              staff{
                  firstname
                  lastname
              }
            }
            totalAppointments
                }
        }`,
          variables: {
            page,
          },
        },
      };

      const appointmentsData = await getAppointments(queryAppt);
      if (appointmentsData) {
        let appt = appointmentsData.data.appointments.appointments;

        let newData = appt.map((appointment) => {
          let start = new Date(appointment.start);
          let end = new Date(appointment.end);
          return { ...appointment, start, end };
        });
        setAppointmentsData(newData);
        localStorage.setItem('appointments', JSON.stringify(newData));
      }
    }
  };

  useEffect(() => {
    if (isShowingSplashAnimation) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        3000 // time of rendering
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, [isLoading]);
  console.log(isShowingSplashAnimation, isLoading);

  return (
    <div>
      {isShowingSplashAnimation || isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="flex justify-center ">
                <Icon
                  size="huge"
                  className="text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                  name="book"
                />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-500">
                Booking
              </h2>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <a
                  href="#test"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {' '}
                  start your 14-day free trial
                </a>
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              {errors
                ? errors.map((err) => (
                    <NotFound key={err} msg={err} setErrors={setErrors} />
                  ))
                : null}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#test"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="grid gap-1 content-between">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Icon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                      name="lock"
                    />
                  </span>
                  Sign in
                </button>
                <Link href="/signup">
                  <button
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={isSignUpClick}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <Icon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                        name="user"
                      />
                    </span>
                    Create Account
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};
export default LoginForm;
