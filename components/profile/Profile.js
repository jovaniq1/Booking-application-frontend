/* This example requires Tailwind CSS v2.0+ */

import { Icon } from 'semantic-ui-react';
import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../../context/userContext';
import { getUserInfo } from '../fetching/PostsWithAxios';
import Loading from '../loading/Loading.js';
const Profile = () => {
  const [openTab, setOpenTab] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(userContext);
  const { isSignIn, setUserIsSignIn, user } = userCtx;
  const token = userCtx.token;

  const setActiveTab = (name) => {
    setOpenTab(name);
  };
  const signOut = () => {
    localStorage.removeItem('token');
    setUserIsSignIn(false);
  };

  // useEffect(() => {
  //   if (token !== '' && !user) {
  //     setIsLoading(true);
  //     const fetchData = async (token) => {
  //       const data = await getUserInfo(token);
  //       setUserData(data?.data?.userInfo);
  //       setIsLoading(false);
  //     };
  //     fetchData(token);
  //   }
  // }, [user]);

  const Rows = ({ name, val }) => {
    return (
      <div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">{name}</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {val}
          </dd>
        </div>
      </div>
    );
  };

  console.log('user data', user);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg md:container md:mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <Rows name={'username'} val={user.username} />
              <Rows name={'Name'} val={user.firstname + ' ' + user.lastname} />
              <Rows name={'Email'} val={user.email} />
              <Rows name={'Phone'} val={user.phone} />
              <Rows name={'Role'} val={user.role} />
            </dl>
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <Icon
                          name="paperclip"
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          resume_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#test"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <Icon
                          name="paperclip"
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          coverletter_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#test"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
