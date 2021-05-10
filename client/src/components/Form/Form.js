import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    })

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user && user.result ? user.result.name : user && user.profileObj ? user.profileObj.name : '' }))
        } else {
            dispatch(createPost({ ...postData, name: user && user.result ? user.result.name : user && user.profileObj ? user.profileObj.name : '' }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        })
    }

    if (!((user && user.result && user.result.name) || (user && user.profileObj && user.profileObj.name))) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to create a memory or like other memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'}  a Memory</Typography>
                <TextField
                    variant="outlined"
                    name="title"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    name="message"
                    label="Message"
                    multiline
                    fullWidth
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    name="tags"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >Submit</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;