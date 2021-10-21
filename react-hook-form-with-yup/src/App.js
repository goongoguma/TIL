import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function App() {

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().requried().min(6)
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);
  return (
    <div className="app">
      <h4 className='text-center'>Registration Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label>Full Name</label>
          <input type='text' className='form-control font-weight-bold' placeholder='your name' 
            ref={register({required: true})} name='fullName'/>
            { errors.fullName?.type === 'required' && <p className='text-danger'>Name is required</p>}
        </div>

        <div className='form-group'>
          <label>Email Address</label>
          <input type='text' className='form-control font-weight-bold' placeholder='enter email' 
            ref={register({required: true, pattern: /\S+@\S+\.\S+/})} name='email'/>
            { errors.email?.type === 'required' && <p className='text-danger'>Email is required</p>}
            { errors.email?.type === 'pattern' && <p className='text-danger'>Email is not valid</p>}
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control font-weight-bold' placeholder='Password' 
            ref={register({required: true, minLength: 6})} name='password'/>
            { errors.password?.type === 'minLength' && <p className='text-danger'>Password length must be at least 6</p>}
            { errors.password?.type === 'required' && <p className='text-danger'>Password is required</p>}
        </div>
        <button type='submit' className='btn btn-primary text-center'>Register</button>
      </form>
      
    </div>
  );
}

export default App;
