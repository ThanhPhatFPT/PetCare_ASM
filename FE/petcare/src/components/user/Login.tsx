import { useState } from "react";
import React from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div className=" border border-gray-250 max-w-[440px] w-full mx-auto p-10 rounded-md">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Đăng Nhập
        </Typography>
        <Typography className="mb-10 text-gray-600 font-extralight text-base">
          Nhập email và mật khẩu của bạn để đăng nhập
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900">
                Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900">
                Mật khẩu
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 absolute right-1 top-3" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 absolute right-1 top-3" />
                  )}
                </i>
              }
            />
          </div>
          <Button color="gray" size="lg" className="mt-6 p-3" fullWidth>
            đăng nhập
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium">
              Quên mật khẩu?
            </Typography>
          </div>
          <button
            className="border border-gray-300 w-full p-3 mt-6 rounded-md font-medium hover:bg-gray-100 flex items-center justify-center gap-3"
            type="button"
            style={{ border: "1px solid #eee" }}>
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Đăng nhập với Google
          </button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal">
            Chưa có tài khoản?{" "}
            <a href="#" className="font-medium text-gray-900">
              Đăng ký ngay
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;
