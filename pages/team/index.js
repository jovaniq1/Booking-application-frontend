import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context/userContext';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  TableFooter,
  Button,
  Badge,
  Avatar,
} from '@windmill/react-ui';
import AddStaffModal from '../../components/staff/AddStaffModal';
import CreateServiceModal from '../../components/services/CreateServiceModal';
import Loading from '../../components/loading/Loading';
import { BlueButton } from '../../components/Global/button/Button';
import {
  CustomersTable,
  ServicesTable,
  StaffTable,
} from '../../components/Global/table/Table';
const StaffPage = () => {
  const userCtx = useContext(userContext);
  const { customers, staff, services, setGetWebsiteData } = userCtx;
  const [isAddModalStaff, setIsAddModalStaff] = useState(false);
  const [isAddModalService, setIsAddModalService] = useState(false);
  const [isAddModalCustomer, setIsAddModalCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getWebsiteData = async () => {
    await setGetWebsiteData();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setGetWebsiteData();
  }, []);

  return (
    <div>
      {isLoading === false ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 gap-2  px-8 mx-8">
          <div className="col-span-6 my-24 py-8">
            <AddStaffModal
              isOpen={isAddModalStaff}
              toggleModal={setIsAddModalStaff}
              user={'New Staff'}
            />
            <div className="flex justify-end">
              <BlueButton
                onClick={() => {
                  setIsAddModalStaff(true);
                }}
                title="New Staff"
              />
            </div>
            <StaffTable data={staff} />
          </div>
          <div className=" col-span-6 my-12">
            <AddStaffModal
              isOpen={isAddModalCustomer}
              toggleModal={setIsAddModalCustomer}
              user={'New Customer'}
            />
            <div className="flex justify-end">
              <BlueButton
                onClick={() => {
                  setIsAddModalCustomer(true);
                }}
                title="New Customer"
              />
            </div>
            <CustomersTable data={customers} />
          </div>
          <div className=" col-span-6 place-content-center ">
            <CreateServiceModal
              isOpen={isAddModalService}
              toggleModal={setIsAddModalService}
            />
            <div className="flex justify-end">
              <BlueButton
                onClick={() => {
                  setIsAddModalService(true);
                }}
                title="New Service"
              />
            </div>
            <ServicesTable data={services} />
          </div>
        </div>
      )}
    </div>
  );
};
export default StaffPage;
