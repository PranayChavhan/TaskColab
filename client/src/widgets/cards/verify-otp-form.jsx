import React from 'react'
import { CardBody, Input, CardFooter, Button, Typography, Card, Checkbox, CardHeader } from '@material-tailwind/react'

const VerifyOtpForm = ({ otp, setOtp, verifyOtp }) => {
    return (
        <Card className="w-96 py-4 mt-20">
            <Typography variant={'h5'} className='text-center'>
                Verify Your Account
            </Typography>

            <CardBody className="flex flex-col gap-8">
                <Input label="OTP" size="lg" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Typography className='text-center text-xs'>
                    We have emaild you OTP, enter that otp to verify your account!
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button onClick={verifyOtp} variant="gradient" fullWidth>
                    Verify
                </Button>
            </CardFooter>
        </Card>
    )
}

export default VerifyOtpForm