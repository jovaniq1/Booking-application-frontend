import React, { useState } from 'react';

const CreateService = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      passconfirm: e.target.passconfirm.value,
      role: e.target.role.value,
      phone: e.target.phone.value,
    };
    if (!user) {
      if (user === 'New Customer') data.role = 'customer';
      if (user === 'New Staff') data.role = 'staff';
    }
    console.log('data', data);
    if (data.role === 'admin') {
      data.domain = e.target.domain.value;
      data.about = e.target.about.value;
      data.webname = e.target.webname.value;
      data.imageUrl = image;
    }

    const graphqlQuery = {
      query: `
          mutation {
            createUser( userInput:{username:"${data?.username}",email:"${data?.email}",firstname:"${data?.firstname}",lastname:"${data?.lastname}",
            password:"${data?.password}",phone:"${data?.phone}", role:"${data?.role}"}) {
              userId
              token
            }
          }
          `,
    };
    const registerData = await registerUser(graphqlQuery);
    if (registerData.errors) {
      setErrors(registerData.errors);
      console.log('registerData.errors', registerData.errors);
    }
    //fetch staff and customers
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

    const token = registerData?.data?.createUser.token;
    console.log(token);
    if (token && data?.role === 'admin') {
      setUserIsSignIn(true);
      localStorage.setItem('token', JSON.stringify(token));
      router.push('/');
    }
  };

  return (
    <div>
      <form
        action="/api/graphql"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Service Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">Filled all inputs.</p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="serviceName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service name
                      </label>
                      <input
                        type="text"
                        name="serviceName"
                        id="serviceName"
                        autoComplete="given-name"
                        className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Duration
                      </label>
                      <input
                        type="duration"
                        name="duration"
                        id="duration"
                        autoComplete="family-name"
                        className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-16 shadow-sm lg:text-lg border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cost"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cost
                      </label>
                      <input
                        type="cost"
                        name="cost"
                        id="cost"
                        autoComplete="family-name"
                        className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-24 shadow-sm lg:text-lg border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700 w-full"
                      >
                        Service description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                          placeholder="info"
                          defaultValue=""
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateService;
