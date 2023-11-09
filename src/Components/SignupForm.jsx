import { Button, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext'
import { auth } from '../firebaseConfig'
import { toast } from 'react-toastify'
import errorMapping from '../Utils/errorMapping'

const SignupForm = ({handleClose}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { theme } = useTheme()

    function handleSubmit() {

        if (!email || !password || !confirmPassword) {
            toast.warning('All fields required!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.warning('Passwords mismatch!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            toast.success('User created!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleClose()
        }).catch((err) => {
            
            toast.error(errorMapping[err.code] || 'some error occured', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })

    }

    return (
        <Box p={3}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
            <TextField
                onChange={e => setEmail(e.target.value)}
                label='Enter Email'
                type='email'
                variant='outlined'
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }}
                InputProps={
                    {
                        style: {
                            color: theme.textColor
                        }
                    }
                } />
            <TextField
                onChange={e => setPassword(e.target.value)}
                label='Enter Password'
                type='password'
                variant='outlined'
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }}
                InputProps={
                    {
                        style: {
                            color: theme.textColor
                        }
                    }
                } />
            <TextField
                onChange={e => setConfirmPassword(e.target.value)}
                label='Enter Confirm Password'
                type='password'
                variant='outlined'
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }}
                InputProps={
                    {
                        style: {
                            color: theme.textColor
                        }
                    }
                } />
            <Button
                variant='contained'
                size='large'
                onClick={handleSubmit}
                >Signup</Button>
        </Box>
    )
}

export default SignupForm