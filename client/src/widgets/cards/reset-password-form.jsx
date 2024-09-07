import React from 'react'
import { CardBody, Input, CardFooter, Button, Typography, Card, Checkbox, CardHeader } from '@material-tailwind/react'

const ResetPasswordFrom = ({ loginData, setLoginData, otp, setOtp, resetPassword }) => {
    return (
        <Card className="w-96 py-4 mt-20">
            <Typography variant={'h5'} className='text-center'>
                Reset Your Password
            </Typography>
            <CardBody className="flex flex-col gap-8">
                <Input label="OTP" size="lg" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Input label="New Password" size="lg" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

            </CardBody>
            <CardFooter className="pt-0">
                <Button onClick={resetPassword} variant="gradient" fullWidth>
                    Update Password
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ResetPasswordFrom