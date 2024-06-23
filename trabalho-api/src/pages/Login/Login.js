import Header from "../../components/Header"
import './Login.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    email: z.string().email({ message: ' Email Invalid Format' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});


const Login = () => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });
    const navigate = useNavigate()


    function handleFormUser(data) {
        navigate('/list')

    }



    return (
        <div className="loginPage">

            <Header title={"Login"} />

            <div className="formContainer">
                <div className="loginContainer">
                    <form onSubmit={handleSubmit(handleFormUser)}>
                        <label htmlFor="useremail">User Email:</label>
                        <input type="text" id="email" {...register('email')} placeholder="Insira seu Email" />
                        {errors.email && <p className="errorMessage">{errors.email.message}</p>}

                        <label htmlFor="userpassword">User Password:</label>
                        <input type="password" id="password" {...register('password')} placeholder="Insira sua senha" />
                        {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                        <button type="submit">LOGIN</button>
                    </form>
                </div>

            </div>


        </div>
    );
}

export default Login;