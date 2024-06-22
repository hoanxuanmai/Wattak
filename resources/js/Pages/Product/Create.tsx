import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Partials/Form";
import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function Index({auth, product}: PageProps<{
    mustVerifyEmail: boolean,
    status?: string,
    product?: string,
}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={''}
        >
            <Head title="Products"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Form
                            productId={Number(product)}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
