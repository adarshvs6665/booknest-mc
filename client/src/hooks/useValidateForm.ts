import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type SchemaType<T> = z.Schema<T>;

export const useValidateForm = <T extends FieldValues>(
  schema: SchemaType<T>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    setValue,
  };
};
