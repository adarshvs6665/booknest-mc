import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { TextField } from "../components";
import { signupSchema } from "../validations";
import { useValidateForm } from "../hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton, Link } from "@mui/material";
import { useSignUpMutation } from "../api";
import { toastOptionsAtom } from "../store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const { register, handleSubmit, errors } = useValidateForm(signupSchema);
  const navigate = useNavigate();
  const signUpMutation = useSignUpMutation();

  useEffect(() => {
    if (signUpMutation.isSuccess) {
      setLoading(false);
      navigate("/sign-in");
    }

    if (signUpMutation.isError) {
      setLoading(false);

      if (signUpMutation.error.status === 409) {
        setToastOptions({
          open: true,
          message:
            signUpMutation.error.response?.data.message ||
            "UserName or email already exists",
          severity: "error",
        });
      } else {
        setToastOptions({
          open: true,
          message: "Cannot register at this moment",
          severity: "error",
        });
      }
    }

    if (signUpMutation.isLoading) {
      setLoading(true);
    }
  }, [
    signUpMutation.isSuccess,
    signUpMutation.isError,
    signUpMutation.data,
    signUpMutation.error,
    signUpMutation.isLoading,
  ]);

  const handleSignUp = (data: any) => {
    signUpMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSignUp)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          <TextField
            label={"Name"}
            register={register}
            error={errors["fullName"]}
            id="fullName"
            name="fullName"
            placeholder="Name"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label={"Username"}
            register={register}
            error={errors["userName"]}
            id="userName"
            name="userName"
            placeholder="Username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: "username" }}
          />
          <TextField
            label={"Email"}
            register={register}
            error={errors["email"]}
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: "username" }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label={"Password"}
            register={register}
            error={errors["password"]}
            name="password"
            placeholder="••••••"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
          >
            {loading ? "Creating account" : "Sign Up"}
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link href="/sign-in" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};
