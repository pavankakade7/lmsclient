import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listEmployees, deleteEmployee } from "@/services/EmployeeServices";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/common/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
function Employees() {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  
  }

  function updateEmployee(empId) {
    navigator(`/update-employee/${empId}`);
  }

  function removeEmployee(empId) {
    console.log(empId);

    deleteEmployee(empId)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={addNewEmployee} >Add Employees</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center">
          <Card>
            <CardHeader>
              <CardTitle> list of employees</CardTitle>
            </CardHeader>
            <ScrollArea className="h-72  rounded-md border"> 
            <CardContent>
           
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Title</th>
                    {/* <th className="px-4 py-2">User Id</th> */}
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.empId}> {/* Add the key prop here */}
                      <TableCell>{employee.empId}</TableCell>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.title}</TableCell>
                      {/* <TableCell>{employee.userId}</TableCell> */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="secondary" onClick={() => updateEmployee(employee.empId)}>Update</Button>
                          <Button variant="secondary" onClick={() => removeEmployee(employee.empId)}>Delete</Button>
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>

              </table>
             
            </CardContent>
            </ScrollArea>
          </Card>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default Employees;
