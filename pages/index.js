import { useState, useEffect, useContext } from 'react';
import { Image } from 'semantic-ui-react';
import { getAppointments } from '../components/fetching/PostsWithAxios';
import Loading from '../components/loading/Loading';
import { useRouter } from 'next/router';
import { userContext } from '../context/userContext';
const Home = () => {
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);
  const userCtx = useContext(userContext);
  const router = useRouter();
  const { domain } = userCtx;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-gray-700 md:p-10">
      <h2
        className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
        aria-label="Website Name"
      >
        {domain}
      </h2>
      <h2 className="text-2xl font-extrabold">Memberships</h2>

      <div className="flex flex-wrap items-center justify-center w-full max-w-4xl mt-4">
        <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center p-10 bg-gray-200">
            <span className="font-semibold">Free</span>
            <div className="flex items-center">
              <span className="text-3xl">$</span>
              <span className="text-5xl font-bold">0</span>
              <span className="text-2xl text-gray-500">/mo</span>
            </div>
          </div>
          <div className="p-10">
            <ul>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">30 appointments monthly</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">Free Website</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">1 Staff</span>
              </li>
            </ul>
          </div>
          <div className="flex px-10 pb-10 justfy-center">
            <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
              Join now
            </button>
          </div>
        </div>

        <div className="z-10 flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110">
          <div className="flex flex-col items-center p-10 bg-gray-200">
            <span className="font-semibold">Platinum</span>
            <div className="flex items-center">
              <span className="text-3xl">$</span>
              <span className="text-6xl font-bold">6.99</span>
              <span className="text-2xl text-gray-500">/mo</span>
            </div>
          </div>
          <div className="p-10">
            <ul>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2 italic">Unlimited appointments</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">Free Website</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">3 Staff</span>
              </li>
            </ul>
          </div>
          <div className="flex px-10 pb-10 justfy-center">
            <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
              Join now
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg mt-19">
          <div className="flex flex-col items-center p-10 bg-gray-200">
            <span className="font-semibold">Jedi Master</span>
            <div className="flex items-center">
              <span className="text-3xl">$</span>
              <span className="text-5xl font-bold">12.99</span>
              <span className="text-2xl text-gray-500">/mo</span>
            </div>
          </div>
          <div className="p-10">
            <ul>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2 italic">Unlimited Appointments</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">Free Website</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">Costume Website</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span className="ml-2">unlimited staff</span>
              </li>
            </ul>
          </div>
          <div className="flex px-10 pb-10 justfy-center">
            <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
              Join now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
