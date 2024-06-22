import {FormEventHandler} from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from "axios";

export default function DeleteUserForm({
                                           className = '', id = 0, onClose = (status) => {
    }
                                       }: { className?: string; id?: number, onClose?: (status: boolean) => void }) {

    const deleteProduct: FormEventHandler = (e) => {
        e.preventDefault();
        axios.delete(route('api.products.destroy', {product: id}))
            .then(() => onClose(true))
            .catch((error: Error) => {
                onClose(false)
            })
    };


    return (
        <section className={`space-y-6 ${className}`}>

            <Modal show={id != 0} onClose={() => onClose(false)}>
                <form onSubmit={deleteProduct} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this product?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => onClose(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3">
                            Delete Product
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
