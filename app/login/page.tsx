'use client'

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Login() {
    const [data, setData] = useState<{
        email: string,
        password:  string
    }>({
        email: '',
        password: ''
    });
    const router = useRouter();
    const login = async () => {
        try {
            let { data: dataUser, error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            }); 

            if (dataUser) {
                console.log(dataUser);
                // router.refresh();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="container mx-auto w-[400px] p-6 bg-green-200 rounded-md">
            <div className="grid">
                <label>Email</label>
                <input
                    type='text'
                    name='email'
                    value={data?.email}
                    onChange={handleChange}
                />
            </div>
            <div className="grid">
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={data?.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button className="bg-blue-200 mt-2" onClick={login}>Log in</button>
            </div>
        </div>
    )
}