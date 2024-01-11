// // import React from "react";
import './Info.css'
export default function Info() {
    const information = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(information);
    // console.log('Parsed Data:', parsedData);
    return (
        <div>
            <h2>User Details</h2>
            <p><b>ID:</b> {parsedData.id}</p>
            <p><b>Name:</b> {parsedData.name}</p>
            <p><b>Username:</b> {parsedData.username}</p>
            <p><b>Email:</b> {parsedData.email}</p>

            <h3>Address</h3>
            <p><b>Street:</b> {parsedData.address.street}</p>
            <p><b>Suite:</b> {parsedData.address.suite}</p>
            <p><b>City:</b> {parsedData.address.city}</p>
            <p><b>Zipcode:</b> {parsedData.address.zipcode}</p>
            <p><b>Geo:</b> <b>Lat -</b> {parsedData.address.geo.lat}, <b>Lng -</b> {parsedData.address.geo.lng}</p>

            <p><b>Phone:</b> {parsedData.phone}</p>
            <p><b>Website:</b> {parsedData.website}</p>

            <h3>Company</h3>
            <p><b>Company Name:</b> {parsedData.company.companyName}</p>
            <p><b>Catch Phrase:</b> {parsedData.company.catchPhrase}</p>
            <p><b>Business:</b> {parsedData.company.bs}</p>
        </div>

    );
}
