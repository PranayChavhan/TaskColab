import React, { useState } from 'react'
import { CardBody, Input, IconButton, CardFooter, Button, Typography, Card, Checkbox, CardHeader } from '@material-tailwind/react'

const LoginFromCard = ({ loginData, setLoginData, submitLogin, setForm }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-96 py-4 mt-20">
      <Typography variant={'h5'} className='text-center'>
        SignIn
      </Typography>
      <CardBody className="flex flex-col gap-8">
        <Input label="Email" size="lg" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            label="Password"
            value={loginData.password}
            size='lg'
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
            type={showPassword ? 'text' : 'password'}
          />
          <IconButton
            size="sm"
            variant='text'
            className="!absolute right-1 top-1 rounded"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={"" + (showPassword ? "fas fa-eye-slash" : "fas fa-eye")} />
          </IconButton>
        </div>
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={submitLogin} variant="gradient" fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Forgot Password?
          <Typography
            as="a"
            onClick={() => setForm('forgot')}
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold cursor-pointer"
          >
            Reset
          </Typography>
        </Typography>
      </CardFooter>
    </Card>

  )
}

export default LoginFromCard