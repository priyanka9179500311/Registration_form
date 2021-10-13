import React, { useState } from 'react';
import axios from './BaseUrl';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Post = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImage] = useState('');
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [persons, setPersons] = useState([]);
    const [id, setId] = useState('');

    //console.log('/////////////', images)
    let formData = new FormData();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);



    const changePost = (e) => {
        e.preventDefault();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', images)


        let res = { title, content }
        console.log(res);

        const token = localStorage.getItem('auth_token')
        console.log(token);

        const headers = {
            'Authorization': `Token ${token}`
        };

        //console.log('////////////', headers);

        axios.post('/api/posts/', formData, { headers })
            .then((response) => {

                console.log(response.data);
                getData()
                handleClose()

                if (response.status === 201) {
                    setTitle('');
                    setContent('');
                    setImage('');
                    alert("Data send Succesfully");
                }

            }).catch(error => {
                console.log(error);

            });



    }

    useEffect(() => {
        getData()
       
    }, [])
    const getData= ()=>{
        let token = localStorage.getItem('auth_token')
        console.log(token);

        let headers = {
            'Authorization': `Token ${token}`
        };
       //console.log("(((((((((((", headers);
        axios
            .get('/api/posts/', { headers })
            .then(res => {
                console.log(res)
                setPersons(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteRow = (id) => {
        let token = localStorage.getItem('auth_token')
        console.log(token);

        let headers = {
            'Authorization': `Token ${token}`
        };
        //console.log("%%%%%%%%%%%", headers);
        axios.delete(`/api/posts/${id}/`, { headers })
            .then(res => {
                console.log(res)
                //setPersons(res.data)
                getData()
            })
            .catch(err => {
                console.log(err);
            })

    }


    const updateData = () => {

        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', images);

        let response = { title, content }
        console.log(response);
        
        let token = localStorage.getItem('auth_token')
        console.log(token);

        let headers = {
            'Authorization': `Token ${token}`
        };

        //console.log('##########', headers);
        axios
            .put(`/api/posts/${id}/`,formData,{ headers })
            .then(response => {
                console.log(response)
                getData();
                handleCloseUpdate();

                if (response.status === 200) {
                    setTitle('');
                    setContent('');
                    setImage('');
                    
                    alert("Update Successfully")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editData=(id,item)=>{
        setTitle(item.title);
        setContent(item.content);
        setId(id)
        alert(id)
        handleShowUpdate()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-sm-6 offset-sm-3">
                        <form>
                            Title<input type="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" required />
                            <br />
                            Content<input type="content" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" required />
                            <br />
                            Profile image<input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                            <br />
                            <Button onClick={changePost}>Post</Button>

                        </form>
                    </div>
                </Modal.Body>

            </Modal>

            <div className="row">
                <table className="table table-striped table-bordered" >
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Profile image</th>
                            <th colSpan="2">Action</th>

                        </tr>
                        {persons?.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td><img src={item.image} width="45" height="55" /></td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteRow(item.id)}>Delete</Button>
                                    <Button onClick={()=>editData(item.id,item)}>Edit</Button>
                                    
                                    

                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            <Modal
                                        show={showUpdate}
                                        onHide={handleCloseUpdate}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Page</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="col-sm-6 offset-sm-3">
                                                <form>
                                                    Title<input type="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" required />
                                                    <br />
                                                    Content<input type="content" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" required />
                                                    <br />
                                                    Profile image<input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                                                    <br />

                                                    <Button onClick={() => updateData()}>Update</Button>
                                                </form>
                                            </div>
                                        </Modal.Body>

                                    </Modal>

        </>

    )
}

export default Post;