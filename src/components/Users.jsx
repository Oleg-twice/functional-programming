import React from "react";
import { compose, pipe, usersWithPromocode, usersWithAccess, ageOfFirstUser } from "../fp";

const UserCard = ({ user }) => (
    <div key={user.id} style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "10px auto"
    }}>
        <span style={{ flexShrink: 0 }}>
            <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ width: "50px", height: "50px", borderRadius: "50%" }} 
            />
        </span>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{user.name}</span>
        <span style={{ color: "#555" }}>{user.age} лет</span>
        {user.presentPromoCode && (
            <span style={{
                backgroundColor: "#ffdf6c",
                padding: "5px 10px",
                borderRadius: "5px",
                fontWeight: "bold"
            }}>
                {user.presentPromoCode}
            </span>
        )}
        {user.accessToData && (
            <button style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer"
            }}>
                Watch Horror movie!
            </button>
        )}
    </div>
);

/* eslint-disable no-unused-vars */
const withLoading = (WrappedComponent) =>
    ({ isLoading, ...rest }) => isLoading ? <>...Loading</> : <WrappedComponent {...rest}/>;
const withError = (WrappedComponent) =>
    ({ isError, ...rest }) => isError ? <>...Проверь ошибки!!!!!</> : <WrappedComponent {...rest}/>

const Users = () => {
    console.log(pipe((v) => v + ' + ', (v) => v + ' - ')('Hello world!'));
    console.log(compose((v) => v + ' + ', (v) => v + ' - ')('Hello world!'));
    console.log(ageOfFirstUser)

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>Users with PROMO codes:</h2>
            {usersWithPromocode.map(user => <UserCard key={user.id} user={user} />)}

            <h2>Users who have access to horror movies:</h2>
            {usersWithAccess.map(user => <UserCard key={user.id} user={user} />)}
        </div>
    );
};

const UsersWithHOCS = pipe(withError, withLoading)(Users);

export default UsersWithHOCS;
