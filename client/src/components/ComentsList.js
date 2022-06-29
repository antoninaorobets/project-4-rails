import React, { useState, useContext } from 'react'
import Comment from './Comment'
import { UserContext } from '../context/user';
import { Container, Form, Button, Card } from 'react-bootstrap';

function ComentsList({ allComments, park_id }) {
    const [text, setText] = useState('')
    const { user, isLoggedIn } = useContext(UserContext)
    const [comments, setComments] = useState(allComments)

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoggedIn) {
            fetch(`/api/parks/${park_id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "text": text,
                    "user_id": user.id
                })
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(newComent => {
                            setComments([...comments, newComent])
                            setText('')
                            console.log('cleanup?')
                        })
                    } else {
                        r.json().then(error => console.log(error))
                    }
                })
        }
        else {
            //"state for error"
            console.error("login")
        }
    }
    const handleDelete = (id) => {
        const updatedList = comments.filter(comment => comment.id !== id)
        setComments(updatedList)
    }
    const handleUpdate = (updatedComment) => {
        const updates = comments.map(comment => {
            if (comment.id === updatedComment.id) { return updatedComment }
            else { return comment }
        })
        setComments(updates)
    }
    const list = comments.map(comment => <Comment key={comment.id} comment={comment} handleDelete={handleDelete} handleUpdate={handleUpdate} />)
    return (
        <div style={{ width: '50%', margin: "auto" }} >
            <Card border="success" style={{ margin: "12px" }}>
            <Form  className="mb-3"  style={{ padding: "12px" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>New comment:</Form.Label>
                    <Form.Control type="text" value={text} onChange={handleChange} />
                </Form.Group>

                <Button variant="success" type="submit" >
                    Submit
                </Button>
            </Form>
            </Card>
            <p>All comments:</p>
            <Container >
                {list}
            </Container>
        </div>
    )
}

export default ComentsList