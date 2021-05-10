import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import GoogleLogin from 'react-google-login'
import AuthInput from './Input'
import Icon from './Icon'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authLogin, signIn, signUp } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const switchMode = () => {
        setIsSignUp((prevSignUp) => !prevSignUp);
    }

    const googleSuccess = (res) => {
        const profileObj = res ? res.profileObj : null;
        const token = res ? res.tokenId : null;
        try {
            dispatch(authLogin(profileObj, token));

            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        alert('Google Login Failed. Please try again later')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <AuthInput name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <AuthInput name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <AuthInput name="email" label="Email Address" handleChange={handleChange} autoFocus type="email" />
                        <AuthInput name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <AuthInput name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="700856995635-eft1afm2oqm9acp1j20rvnvf2546sp5g.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} color="primary">{isSignUp ? "Already have an account ? Sign In" : "Don't have an account ? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}
export default Auth;