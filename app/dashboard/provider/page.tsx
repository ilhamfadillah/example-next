'use client';
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Layout from "../Layout";
import Link from "next/link";

interface ProviderInterface {
    id: number;
    uuid: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    city: string;
}

const fetchData = async (): Promise<ProviderInterface[]> => {
    try {
        const response: AxiosResponse<ProviderInterface[]> = await api.get('/v1/providers');
        return response.data || [];
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error;
    }
}

const ProviderPage = () => {
    const [data, setData] = useState<ProviderInterface[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getData = async () => {
        try {
            const result = await fetchData();
            setData(result);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <Link href={{ pathname: `provider/create` }}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
                    CREATE
                </button>
            </Link>
            {error ? <p>{error}</p> : null}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((provider) => (
                        <tr key={provider.id}>
                            <td>
                                <Link href={{
                                    pathname: `provider/${provider.uuid}`,
                                }}>
                                    <span className="hover:text-blue-500">
                                        {provider.name}
                                    </span>
                                </Link>
                            </td>
                            <td>{provider.code}</td>
                            <td>{provider.address}</td>
                            <td>{provider.city}</td>
                            <td>{provider.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default ProviderPage;