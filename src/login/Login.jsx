import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/authuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        let data;
        try {
          data = await response.json(); // Attempt to parse as JSON
        } catch (jsonError) {
          console.error("Failed to parse response as JSON:", jsonError);
          alert("Unexpected server response. Please try again later.");
          return; // Exit if parsing fails
        }

        console.log("Login successful:", data);

        if (data && data.userId) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('role', data.role);

          if (data.role) {
            if (data.role === "ADMIN") {
              navigate("/admin-dashboard");
            } else if (data.role === "USER") {
              navigate("/user-dashboard");
            } else {
              console.warn("Unknown role:", data.role);
              alert("Unknown user role. Unable to proceed.");
            }
          } else {
            console.warn("Role data missing");
            alert("Role information not available. Please contact support.");
          }
        } else {
          console.warn("User ID missing in response");
          alert("User information is missing in the response. Please contact support.");
        }
      } else {
        console.warn("Login failed with status:", response.status);
        const errorMessage = await response.text(); // Get the error message as text
        alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Welcome back! Please enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-left">
            <div>
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
            <div>
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
            <Button type="button" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="underline">Sign up</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
