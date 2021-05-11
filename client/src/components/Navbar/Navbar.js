import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux'
import { authLogout } from '../../actions/auth'

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch(authLogout());
        history.push('/');
    }
    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp* 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="Memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user && (user.profileObj || user.result) ? (
                    <div className={classes.profile}>
                        <div className={classes.profileName}>
                        <Avatar
                            className={classes.purple}
                            alt={user.profileObj ? user.profileObj.name : user.result.name}
                            src={user.profileObj ? user.profileObj.imageUrl : null}>
                            {user.profileObj ? user.profileObj.name.charAt(0) : user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.profileObj ? user.profileObj.name : user.result.name}
                        </Typography>
                        </div>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" className={classes.login} component={Link} to="/auth" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;