import React from 'react'
import { CardBody, Input, CardFooter, Button, Typography, Card, Checkbox, CardHeader } from '@material-tailwind/react'

const ForgotPasswordCard = ({ sendOTP, loginData, setLoginData }) => {
    return (
        <Card className="w-96 py-4 mt-20 ">
            <Typography variant={'h5'} className='text-center'>
                Sent OTP
            </Typography>
            <CardBody className="flex flex-col gap-8">
                <Input label="Email" size="lg" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />

                <Typography>
                    We will send you OTP to reset your password!
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={sendOTP}>
                    Send OTP
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ForgotPasswordCard