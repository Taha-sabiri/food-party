"use client";

import { Button } from "@/components/ui/button";

export default function Test() {


    async function testApi() {
        const raw = JSON.stringify({
            "v": 1,
            "type": 1,
            "payload": {
                "b0": "10000",
                "b1": "214084478124920011010003863557",
                "a4": "90001"
            }
        });

        const requestOptions = {
            method: "POST",
            body: raw,
        };

        fetch("http://127.0.0.1:8080/txn", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
       
            .catch((error) => console.error(error));
    }
    return (
        <Button onClick={()=>{testApi()}}>page</Button>
    )
}
