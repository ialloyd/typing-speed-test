import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tabs, Tab, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
const AccountCircle = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const { theme } = useTheme();

    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    function handleModalOpen() {

        if (user) {
            navigate('/user')
        }
        else {
            setOpen(true)
        }

        setOpen(true)

    }

    function handleClose() {

        setOpen(false)
    }

    function handleValueChange(_, v) {

        setValue(v)

    }
    function logout() {
        auth.signOut().then(res => {
            toast.success('Logged out!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });


        }).catch(err => {

            toast.error('Not able to Logout!' || 'some error occured', {
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
    const googleProvider = new GoogleAuthProvider()

    function handleGoogleSignIn() {
        signInWithPopup(auth, googleProvider).then(res => {
            toast.success('Google auth successful!', {
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

        }).catch(err => {

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
        <div>
            <AccountCircleIcon onClick={handleModalOpen} style={{ cursor: 'pointer' }} />
            {user && <LogoutIcon onClick={logout} style={{ cursor: 'pointer', marginLeft: '10px' }} />}
            <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '400px', textAlign: 'center' }}>
                    <AppBar position='static' style={{ background: 'transparent' }}>
                        <Tabs variant='fullWidth' value={value} onChange={handleValueChange}>
                            <Tab label='login' style={{ color: theme.textColor }}></Tab>
                            <Tab label='signup' style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleClose={handleClose} />}
                    {value === 1 && <SignupForm handleClose={handleClose} />}
                    <Box>
                        <span>OR</span>
                        <GoogleButton style={{ width: '100%', marginTop: '10px' }} onClick={handleGoogleSignIn} />
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle