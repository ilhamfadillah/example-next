'use client';
import React, { FormEvent, Provider, useEffect, useState } from "react";
import Layout from "../../Layout";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

interface ProviderInterface {
    id: number;
    uuid: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    city: string;
};

const fetchData = async (uuid: string): Promise<ProviderInterface> => {
    try {
        const response: AxiosResponse<ProviderInterface> = await api.get(`/v1/providers/${uuid}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error;
    }
}

const updateData = async (uuid: string, data: ProviderInterface): Promise<ProviderInterface> => {
    try {
        const response: AxiosResponse<ProviderInterface> = await api.put(`/v1/providers/${uuid}`, data);
        return response.data;
    } catch (error) {
        console.error('Error update data:', error)
        throw error;
    }
}

const ProviderDetailPage: React.FC = () => {
    const [data, setData] = useState<ProviderInterface>({
        id: 0,
        uuid: '',
        code: '',
        name: '',
        address: '',
        phone: '',
        city: '',
    });
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { uuid } = useParams();
    const uuidString = uuid as string;

    const getData = async () => {
        if (!uuid) {
            setError('Provider UUID is missing');
            return;
        }

        try {
            const result = await fetchData(uuidString);
            setData(result);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev: ProviderInterface) => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await updateData(uuidString, data);

            router.back();
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <Layout>
            {error ? <p>{error}</p> : null}
            <form onSubmit={onSubmit}>
                <div className="mb-4 w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Code</label>
                    <input type="text"
                        id="code"
                        name="code"
                        placeholder="Enter code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data ? data.code : ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4 w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data ? data.name : ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4 w-1/2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                    <input type="text"
                        id="address"
                        name="address"
                        placeholder="Enter Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data ? data.address : ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4 w-1/2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                    <input type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data ? data.phone : ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4 w-1/2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-2">City</label>
                    <input type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data ? data.city : ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4 w-1/2">
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default ProviderDetailPage;