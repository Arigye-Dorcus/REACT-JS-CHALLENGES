import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Box,
  Alert,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

function SignupPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (values) => {
    console.log('Signup form values:' , values)
    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log('Existing users in localStorage:', users)

    // Check if user already exists
    if (users.some((user) => user.email === values.email)) {
      notifications.show({
        title: "Error",
        message: "User with this email already exists",
        color: "red",
      });
      return;
    }

    // Add new user (excluding confirmPassword from storage)
    const { confirmPassword, ...userData } = values;
    console.log('User data to be stored:', userData)
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

     console.log('Updated users array in localStorage:', users);
  console.log('All localStorage data:', {
    users: localStorage.getItem('users'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    currentUser: localStorage.getItem('currentUser')
     });
    // Show success notification
    notifications.show({
      title: "Success",
      message: "Account created successfully! Redirecting to login...",
      color: "green",
    });

    // Force redirect after 1.5 seconds
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <Box maw={400} mx="auto" pt={50}>
      <Title order={1} mb="xl" align="center">
        Sign Up
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Full Name"
          placeholder="Your name"
          withAsterisk
          {...form.getInputProps("name")}
          mb="sm"
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          withAsterisk
          {...form.getInputProps("email")}
          mb="sm"
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          {...form.getInputProps("password")}
          mb="sm"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          withAsterisk
          {...form.getInputProps("confirmPassword")}
          mb="xl"
        />

        <Button type="submit" fullWidth mb="md" size="md">
          Create Account
        </Button>

        <Text ta="center" mt="sm">
          Already have an account?{" "}
          <Text component={Link} to="/login" color="blue" td="underline">
            Log in
          </Text>
        </Text>
      </form>

    
    </Box>
  );
}

export default SignupPage;
