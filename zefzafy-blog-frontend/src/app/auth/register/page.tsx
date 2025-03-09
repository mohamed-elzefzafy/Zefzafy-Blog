import { useForm } from "react-hook-form";
import * as z from "zod";

const RegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).max(30),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>();
  
  return <div>Register</div>;
};

export default Register;
