import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { TextField } from "../components";
import { signInSchema } from "../validations";
import { useValidateForm } from "../hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useSignInMutation } from "../api";
import { toastOptionsAtom, userAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../enums";
import { StatusCodes } from "http-status-codes";

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

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const [, setUser] = useAtom(userAtom);
  const { register, handleSubmit, errors } = useValidateForm(signInSchema);
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  useEffect(() => {
    if (signInMutation.isSuccess) {
      const user = signInMutation.data;
      setUser(user);
      setLoading(false);

      if (user.role === Role.LIBRARIAN) {
        navigate("/librarian");
      } else if (user.role === Role.USER) {
        navigate("/student");
      }
    }

    if (signInMutation.isError) {
      if (
        signInMutation.error.status === StatusCodes.UNAUTHORIZED ||
        signInMutation.error.status === StatusCodes.NOT_FOUND
      ) {
        setToastOptions({
          open: true,
          message: "Invalid credentials",
          severity: "error",
        });
      }
      setLoading(false);
    }

    if (signInMutation.isLoading) {
      setLoading(true);
    }
  }, [
    signInMutation.isSuccess,
    signInMutation.isError,
    signInMutation.data,
    signInMutation.error,
    signInMutation.isLoading,
  ]);

  const handleSignIn = (data: any) => {
    signInMutation.mutate(data);
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
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          <TextField
            label={"Username"}
            register={register}
            error={errors["userName"]}
            id="userName"
            name="userName"
            placeholder="username"
            autoComplete="username"
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
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link href="/sign-up" sx={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};
