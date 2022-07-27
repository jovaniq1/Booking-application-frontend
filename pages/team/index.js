import React, { useContext, useState } from 'react';
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

const StaffPage = () => {
  const userCtx = useContext(userContext);
  const { customers, staff } = userCtx;
  const [isAddModalStaff, setIsAddModalStaff] = useState(false);
  const [isAddModalCustomer, setIsAddModalCustomer] = useState(false);
  console.log('-Staff', staff);
  return (
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
    </div>
  );
};
export default StaffPage;
