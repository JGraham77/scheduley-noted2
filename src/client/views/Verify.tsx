import React, { useEffect, useState } from "react";

const Verify = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.href);
        const type = params.get("type");
        const token = params.get("token");

        fetch(`http://localhost:3000/auth/verify?type=${type}&token=${token}`)
            .then((res) => res.json())
            .then((data) => alert(data.message));
    }, []);
    return <div>Verify</div>;
};

export default Verify;
