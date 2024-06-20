import React, { useState } from 'react'
import { CardBody, Input, CardFooter, Button, Typography, Card, Checkbox, IconButton } from '@material-tailwind/react'

const SignupFromCard = ({ signUpData, setSignUpData, submitSignUp }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="w-96 py-4 mt-20">
            <Typography variant={'h5'} className='text-center'>
                SignUp
            </Typography>
            <CardBody className="flex flex-col gap-8">
                <Input label="First Name" size="lg" onChange={(e) => { setSignUpData({ ...signUpData, firstname: e.target.value }) }} />
                <Input label="Last Name" size="lg" onChange={(e) => { setSignUpData({ ...signUpData, lastname: e.target.value }) }} />
                <Input label="Email" size="lg" onChange={(e) => { setSignUpData({ ...signUpData, email: e.target.value }) }} />
                <Input label="Username" size="lg" onChange={(e) => { setSignUpData({ ...signUpData, username: e.target.value }) }} />
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        label="Password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="pr-20"
                        size='lg'
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
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" onClick={submitSignUp} fullWidth>
                    Sign Up
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignupFromCard