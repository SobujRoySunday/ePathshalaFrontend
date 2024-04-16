import { Link } from "react-router-dom";

import { useRef } from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
    avatar: null,
  });
  const fileRef = useRef(null);

  const handleChange = (event) => {
    setFormData((previousFormData) => {
      const { name, value, type, files } = event.target;
      if (type === "file") {
        fileRef.current = files[0];
        return {
          ...previousFormData,
          [name]: files[0],
        };
      } else {
        return {
          ...previousFormData,
          [name]: value,
        };
      }
    });
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { fullName, email, username, password, rePassword, avatar } =
      formData;
    if (password === rePassword) {
      const data = new FormData();
      data.append("fullName", fullName);
      data.append("email", email);
      data.append("username", username);
      data.append("password", password);
      data.append("avatar", avatar);
      data.append("userRole", "STUDENT");

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/users/register",
          {
            method: "post",
            body: data,
          }
        );
        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "Something went wrong while registering",
            description: `Make sure you are not already registered and you are giving all the required details`,
          });
        } else {
          toast({
            variant: "",
            title: "Registered",
            description: `Your username is ${formData.username}`,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: `Try again! Contact developer if you face this issue often`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: `Password and retyped password are not matching`,
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={registerUser}
      className="w-screen min-h-[85vh] flex justify-center items-center"
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="fullName">Fullname</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="eg. Sorbopriyo Roy"
              onChange={handleChange}
              value={formData.fullName}
              name="fullName"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="eg. dev@ePathshala.com"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="eg. sobuj337"
              onChange={handleChange}
              value={formData.username}
              name="username"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Your password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="rePassword">Retype Password</Label>
            <Input
              type="password"
              id="rePassword"
              placeholder="Retype your password"
              onChange={handleChange}
              value={formData.rePassword}
              name="rePassword"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="avatar">Profile Picture</Label>
            <Input
              id="avatar"
              type="file"
              name="avatar"
              onChange={handleChange}
              ref={fileRef}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            {loading ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button>Register</Button>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Register;
