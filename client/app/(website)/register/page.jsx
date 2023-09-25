'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Logo from '@/components/Logo';
import Button from '@/components/Button';
import config from '../../../config';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';

export const metadata = {
  title: 'Register | Speed Reader',
  description: 'Speed Reader Register Page',
};

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${config.SERVER_URL}/auth/register`, {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        setLoading(false);
        toast.success('You have registered. Redirected to login page...', config.TOASTIFY_CONFIG);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      })
      .catch(function (error) {
        setLoading(false);
        toast.error(error.response.data.message, config.TOASTIFY_CONFIG);
      });
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col">
          <Logo className="text-brand-color" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-dark-color">
                Email address
              </label>
              <Controller name="email" control={control} rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }} render={({ field }) => <input {...field} id="email" placeholder="Email" name="email" type="text" autoComplete="email" className="text-input" />} />
              {errors.email && <p>Your email is not valid.</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-dark-color">
                Password
              </label>
              <Controller name="password" control={control} rules={{ required: true, minLength: 6 }} render={({ field }) => <input {...field} id="password" placeholder="Password" name="password" type="password" autoComplete="password" className="text-input" />} />
              {errors.password && <p>Your password length must be 6 or more.</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-dark-color">
                Confirm password
              </label>
              <Controller name="confirmPassword" control={control} rules={{ required: true, validate: (value) => value === password || 'Your passwords do not match.' }} render={({ field }) => <input {...field} id="confirmPassword" placeholder="Confirm password" name="confirmPassword" type="password" autoComplete="confirmPassword" className="text-input" />} />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <Button className="flex justify-center items-center button-dark w-full" isLoading={loading}>
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Do you have an account?
            <Link className="font-semibold leading-6 text-dark-color hover:opacity-80 ml-2" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
