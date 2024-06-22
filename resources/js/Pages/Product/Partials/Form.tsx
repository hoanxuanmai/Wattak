import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {router, useForm} from '@inertiajs/react';
import {Transition} from '@headlessui/react';
import {FormEventHandler, useEffect} from 'react';
import Textarea from "@/Components/Textarea";
import axios from "axios";

export default function Form({className = '', productId = 0}: { className?: string, productId: number }) {

    const {data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors, progress} = useForm({
        id: 0,
        name: '',
        description: '',
        price: 0,
        stock: 0,
    });
    useEffect(() => {
        productId && axios.get(route('api.products.show', {product: productId})).then(res => {
            setData(res.data);
        })
    }, []);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        (productId ? axios.patch(route('api.products.update', {product: productId}), data) : axios.post(route('api.products.store'), data))
            .then(response => {
                router.visit(route('products.index'))
            })
            .catch(({response}) => {
                if (response.status == 422) {
                    setError(response.data.errors)
                } else {
                    console.log(response)
                }
            })
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Product Information</h2>

            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Description"/>

                    <Textarea
                        id="email"
                        rows={6}
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.description}/>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Price"/>

                    <TextInput
                        id="price"
                        type="number"
                        step="0.01"
                        min={0}
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value))}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.price}/>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Stock"/>

                    <TextInput
                        id="stock"
                        type="number"
                        min={0}
                        className="mt-1 block w-full"
                        value={data.stock}
                        onChange={(e) => setData('stock', Number(e.target.value))}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.stock}/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
