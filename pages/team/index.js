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
        <div className="grid grid-cols-6 gap-2 ">
          <div className="col-span-6 place-content-center my-12 px-8 mx-8">
            <AddStaffModal
              isOpen={isAddModalStaff}
              toggleModal={setIsAddModalStaff}
              user={'New Staff'}
            />
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Staff</TableCell>
                    <TableCell>Appointments</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setIsAddModalStaff(true);
                          }}
                          className=" text-white bg-blue-500 hover:bg-blue-500 "
                        >
                          New Staff
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                    <TableRow key={person._id} info={person}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          {/* <Avatar src="/img/avatar-1.jpg" alt="Judith" /> */}
                          <span className="font-semibold ml-2">
                            {person.firstname} {person.lastname}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">7</span>
                      </TableCell>
                      <TableCell>
                        <Badge type="success">active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className=" col-span-6 place-content-center my-12 px-8 mx-8">
            <AddStaffModal
              isOpen={isAddModalCustomer}
              toggleModal={setIsAddModalCustomer}
              user={'New Customer'}
            />
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Appointments</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setIsAddModalCustomer(true);
                          }}
                          className=" text-white bg-blue-500 hover:bg-blue-500 "
                        >
                          New Customer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((person) => (
                    <TableRow key={person._id} info={person}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          {/* <Avatar src="/img/avatar-1.jpg" alt="Judith" /> */}
                          <span className="font-semibold ml-2">
                            {person.firstname} {person.lastname}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">5</span>
                      </TableCell>
                      <TableCell>
                        <Badge type="success">active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className=" col-span-6 place-content-center my-12 px-8 mx-8">
            <CreateServiceModal
              isOpen={isAddModalService}
              toggleModal={setIsAddModalService}
            />
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setIsAddModalService(true);
                            console.log('--- is click Modal');
                          }}
                          className=" text-white bg-blue-500 hover:bg-blue-500 "
                        >
                          New Service
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service._id} info={service}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          {/* <Avatar src="/img/avatar-1.jpg" alt="Judith" /> */}
                          <span className="font-semibold ml-2">
                            {service.serviceName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{service.description}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {service.duration}
                          {' Minutes'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge type="success">
                          {'$'}
                          {service.cost}
                          {' USD'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};
export default StaffPage;
