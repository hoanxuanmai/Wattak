import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {PageProps} from "@/types";
import axios from "axios";
import {useEffect, useState} from "react";
import DeleteForm from "./Partials/Delete";

type Product = { id: string, name: string, description: string, price: number, stock: number }


export default function Index({auth, mustVerifyEmail, status}: PageProps<{
    mustVerifyEmail: boolean,
    status?: string
}>) {

    const [products, setProducts] = useState<Product[]>([])
    const [links, setLinks] = useState<{ next: string | null, prev: string | null }>({next: null, prev: null})
    const [deleteModal, setDeleteModal] = useState<number>(0)

    function loadData(url: string = '/api/products') {
        axios.get(url).then(({data: {data, links: {next, prev}}}) => {
            setProducts(data)
            setLinks({next, prev})
        })
    }

    useEffect(() => {
        loadData()
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Products | <Link
                    className={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}
                    href={route('products.create')}>Create New</Link>
                </h2>}
        >
            <Head title="Products"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (

                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td className={'truncate hover:text-clip'}>{product.description}</td>
                                    <td className={'text-center'}>{product.price}$</td>
                                    <td className={'text-center'}>{product.stock}</td>
                                    <td className={'text-center'}>
                                        <>
                                            <button
                                                className={'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}
                                            >
                                                <Link
                                                    href={route('products.show', {product: product.id})}>Edit</Link>
                                            </button>

                                            <button
                                                className={'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'}
                                                onClick={() => setDeleteModal(Number(product.id))}>Delete
                                            </button>
                                        </>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                    <div className={'pagination'}>
                        <div className="flex justify-center">
                            {links.prev && (<a href="#" onClick={() => loadData(links.prev || undefined)}
                                               className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                </svg>
                                Previous
                            </a>)}

                            {links.next && (<a href="#" onClick={() => loadData(links.next || undefined)}
                                               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>)}
                        </div>
                    </div>
                    <DeleteForm className="max-w-xl" id={deleteModal} onClose={() => {
                        setDeleteModal(0);
                        loadData();
                    }}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
