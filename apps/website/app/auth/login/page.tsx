'use client';

import { FormInput } from '@/apps/website/components/Form/Input';
import { login } from '@/apps/website/services/auth';
import { UserLoginDto } from '@/types/src';
import { useFormik } from 'formik';
import { IconGoogle } from 'library';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

const LoginPage = () => {
  const { handleSubmit, handleChange, isValid, isSubmitting, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email('Please enter your email')
          .required('This field is required'),
        password: Yup.string().required('This field is required'),
      }),
      onSubmit: async (values) => {
        console.log(values);
        login(values);
      },
    });

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 w-full">
        <FormInput<UserLoginDto>
          errors={errors.email}
          onChange={handleChange}
          value={values.email}
          type="email"
          name="email"
          label="Email"
          placeholder="Eg. abc@gmail.com"
        />

        <FormInput<UserLoginDto>
          errors={errors.password}
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          label="Password"
          placeholder="Eg.12*****"
        />

        <div className="flex justify-between mb-[40px]">
          <Link href="#" className="baseText">
            Forgot Password?
          </Link>
        </div>

        <div className="flex gap-5 flex-col">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`flexCenter border rounded-lg lg:w-[275px] h-[52px] text-white text-xl font-bold ${
              isValid ? 'bg-primaryColor' : 'bg-primaryColor/50'
            }`}
            onClick={() => handleSubmit()}
          >
            Log in
          </button>

          <button
            type="button"
            className="flexCenter border rounded-lg lg:w-[275px] h-[52px] gap-3 text-lg text-grayColor font-medium"
          >
            <IconGoogle />
            Log in with the Google
          </button>

          <p className="md:hidden text-center mt-[22px] text-grayColor">
            Don&rsquo;t have an account?{' '}
            <Link href="/auth/register" className="text-primaryColor font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
