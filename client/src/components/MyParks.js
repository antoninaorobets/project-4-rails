import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserContext } from '../context/user';
import ParkCard from './ParkCard';

function MyParks() {
    const [parks, setParks] = useState([]);
    const { user, setUser, isLoggedIn, setIsLogdedIn } = useContext(UserContext)

    useEffect(() => {
        console.log("useEffect and fetch in MyParks", user)
        if (!user) return
        fetch(`/api/parks?user_id=${user.id}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => setParks(data));
                } else {
                    r.json().then((error) => console.log(error));
                }
            })
    }, [user]);
    const parkCards = parks.map(park => <ParkCard key={park.id} park={park} />)
    return (
        <div>
            <h1 style={{ "margin": "auto", width: "50%", padding: "1rem" }}>My Parks</h1>
            <Container fluid>
                <Row className="justify-content-md-center">
                    {parkCards}
                </Row>
            </Container>
        </div>
    )
}

export default MyParks