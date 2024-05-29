import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "@/services/EmployeeServices";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/common/DashboardLayout";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  // const [userId, setUserId] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
        getEmployee(id)
            .then((response) => {
                const employee = response.data;
                setFirstName(employee.firstName || "");
                setLastName(employee.lastName || "");   
                setEmail(employee.email || "");
                setPhone(employee.phone || "");
                setDepartment(employee.department || "");
                setGender(employee.gender || "");
                setTitle(employee.title || "");
                // setUserId(employee.userId || "");
            })
            .catch((error) => {
                console.error("Failed to fetch employee:", error);
            });
    }
}, [id]);


  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  // const handleUserIdChange = (e) => setUserId(e.target.value);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        email,
        phone,
        gender,
        department,
        title,
        // userId
      };
      if (id) {
        updateEmployee(id, employee)
          .then(() => navigator("/employees"))
          .catch((error) => {
            console.error("Failed to update employee:", error);
          });
      } else {
        createEmployee(employee)
          .then(() => navigator("/employees"))
          .catch((error) => {
            console.error("Failed to create employee:", error);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!firstName?.trim()) {
        errors.firstName = "First Name is required";
        valid = false;
    }

    if (!lastName?.trim()) {
        errors.lastName = "Last Name is required";
        valid = false;
    }
    if (!email?.trim()) {
        errors.email = "Email is required";
        valid = false;
    }

    if (!phone?.trim()) {
        errors.phone = "Phone is required";
        valid = false;
    }

    if (!gender?.trim()) {
        errors.gender = "Gender is required";
        valid = false;
    }

    if (!department?.trim()) {
        errors.department = "Department is required";
        valid = false;
    }

    if (!title?.trim()) {
        errors.title = "Title is required";
        valid = false;
    }

    
  //   if (!userId?.trim()) {
  //     errors.userId = "userId is required";
  //     valid = false;
  // }


    return valid;
};


  const getPageTitle = () => {
    return id ? "Update Employee" : "Add Employee";
  };

  return (
    <DashboardLayout>
      <div className="container">
        <h2 className="text-center">{getPageTitle()}</h2>
        <Card>
          <CardContent>
            <form onSubmit={saveOrUpdateEmployee}>
              <CardHeader>
                <CardTitle>First Name</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />

              <CardHeader>
                <CardTitle>Last Name</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Name"
                value={lastName}
                onChange={handleLastNameChange}
              />

              <CardHeader>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Email"
                value={email}
                onChange={handleEmailChange}
              />

              <CardHeader>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Phone"
                value={phone}
                onChange={handlePhoneChange}
              />

              <CardHeader>
                <CardTitle>Gender</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Gender"
                value={gender}
                onChange={handleGenderChange}
              />

              <CardHeader>
                <CardTitle>Department</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Department"
                value={department}
                onChange={handleDepartmentChange}
              />

              <CardHeader>
                <CardTitle>Title</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Title"
                value={title}
                onChange={handleTitleChange}
              />

              {/* <CardHeader>
                <CardTitle>User Id</CardTitle>
              </CardHeader>
              <Input
                placeholder="Enter Your Title"
                value={userId}
                onChange={handleUserIdChange}
              /> */}

              <CardFooter>
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeComponent;
