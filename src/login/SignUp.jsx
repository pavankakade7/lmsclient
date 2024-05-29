import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from 'axios'; // Use axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // To navigate on successful sign-up

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/adduser', {
        firstName,
        lastName,
        email,
        password,
        role
      });

      if (response.status === 200) {
        // User created successfully
        navigate('/login'); // Redirect to login after successful sign-up
      }
    } catch (error) {
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-left"> {/* Ensure text is aligned to the left */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <RadioGroup
                id="role"
                value={role}
                onValueChange={(newValue) => setRole(newValue)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <RadioGroupItem value="ADMIN" id="role-admin" />
                    <Label htmlFor="role-admin" className="ml-2">Admin</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="USER" id="role-user" />
                    <Label htmlFor="role-user" className="ml-2">User</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Button type="button" className="w-full" onClick={handleSignUp}>
              Create an Account
            </Button>
            <Button type="button" variant="outline" className="w-full mt-2">
              Sign Up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
