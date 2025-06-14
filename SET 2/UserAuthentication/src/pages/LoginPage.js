import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Box,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function LoginForm() {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handle Auth0 authentication state
  useEffect(() => {
    if (isLoading) return; // Wait for Auth0 to finish loading

    if (isAuthenticated && user) {
      // User authenticated via Auth0
      setIsRedirecting(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );

      notifications.show({
        title: "Success",
        message: "Welcome back!",
        color: "green",
      });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 100);
    }
    
  }, [isAuthenticated, isLoading, user, navigate]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  const handleSubmit = (values) => {
    try {
      console.log("Login form values:", values);

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("All users from localStorage:", users);

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      console.log("Found user:", user);

      if (user) {
        console.log("Login successful for user:", user);
        setIsRedirecting(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        console.log("Updated localStorage after login:", {
          isAuthenticated: localStorage.getItem("isAuthenticated"),
          currentUser: localStorage.getItem("currentUser"),
          allUsers: localStorage.getItem("users"),
        });

        notifications.show({
          title: "Success",
          message: "Welcome back!",
          color: "green",
        });

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 100);
      } else {
        notifications.show({
          title: "Error",
          message: "Invalid email or password",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Login failed. Please try again.",
        color: "red",
      });
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    try {
      loginWithRedirect({
        authorizationParams: {
          prompt: "login",
        },
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Google sign-in failed. Please try again.",
        color: "red",
      });
      console.error("Google login error:", error);
    }
  };

  // Show loading state during Auth0 loading or redirecting
  if (isLoading || isRedirecting) {
    return (
      <Box maw={400} mx="auto" pt={50} pos="relative" h={400}>
        <LoadingOverlay visible />
        <Title order={1} mb="xl" align="center">
          Log In
        </Title>
      </Box>
    );
  }

  return (
    <Box maw={400} mx="auto" pt={50}>
      <Title order={1} mb="xl" align="center">
        Log In
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          mb="xl"
        />

        <Button type="submit" fullWidth mb="md" size="md">
          Log In
        </Button>

        <Group position="center" mb="md">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            fullWidth
            size="md"
          >
            Sign in with Google
          </Button>
        </Group>

        <Text ta="center" mt="sm">
          Don't have an account?{" "}
          <Text component={Link} to="/signup" color="blue" td="underline">
            Sign up
          </Text>
        </Text>
      </form>
    </Box>
  );
}

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
