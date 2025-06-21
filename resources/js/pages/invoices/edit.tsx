import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { CircleMinus, CirclePlus, DollarSign } from 'lucide-react';
import React, { useEffect } from 'react';

export default function InvoiceEdit({ auth, invoice }: { auth: { user: any; permissions: string[] }; invoice: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoices',
            href: '/invoices',
        },
        {
            title: `Edit Invoice #${invoice.invoice_number}`,
            href: `/invoices/${invoice.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        invoice_number: invoice?.invoice_number || '',
        name: invoice?.name || '', // or user name
        email: invoice?.email || '',
        address: invoice?.address || '',
        phone: invoice?.phone || '',
        invoice_date: invoice?.invoice_date ? new Date(invoice.invoice_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        due_date: invoice?.due_date
            ? new Date(invoice.due_date).toISOString().split('T')[0]
            : new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
        amount: invoice?.amount || 0,
        notes: invoice?.notes || '',
        payment_method: invoice?.payment_method || '',
        invoice_items: invoice?.items?.map((item: any) => ({
            id: item.id || null,
            description: item.description || '',
            quantity: item.quantity || 1,
            rate: item.rate || 0,
            total: item.total || 0,
        })) || [
            {
                description: '',
                quantity: 1,
                rate: 0,
                total: 0,
            },
        ],
    });

    const total = data.invoice_items.reduce((sum, item) => sum + (Number(item.total) || 0), 0).toFixed(2);

    useEffect(() => {
        if (data.invoice_items.length > 0) {
            setData('amount', Number(total));
        }
    }, [data.invoice_items]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('amount', Number(total));
        put(`/invoices/${invoice.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {errors && Object.keys(errors).length > 0 && (
                <div className="mb-4 rounded bg-red-100 p-4 text-red-800">
                    <h3 className="font-semibold">There were errors with your submission:</h3>
                    <ul className="list-disc pl-5">
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Card className="mx-2 p-0">
                    <div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                            <Label>Invoice Number</Label>
                            <Input value={data.invoice_number} onChange={(e) => setData('invoice_number', e.target.value)} />
                            {errors.invoice_number && <div className="text-red-500">{errors.invoice_number}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Email</Label>
                            <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Address</Label>
                            <Input value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            {errors.address && <div className="text-red-500">{errors.address}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Phone</Label>
                            <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Invoice Date</Label>
                            <Input type="date" value={data.invoice_date} onChange={(e) => setData('invoice_date', e.target.value)} />
                            {errors.invoice_date && <div className="text-red-500">{errors.invoice_date}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Due Date</Label>
                            <Input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />
                            {errors.due_date && <div className="text-red-500">{errors.due_date}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Pay Details</Label>
                            <Input value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} />
                            {errors.payment_method && <div className="text-red-500">{errors.payment_method}</div>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Notes</Label>
                            <Input value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                            {errors.notes && <div className="text-red-500">{errors.notes}</div>}
                        </div>
                    </div>
                </Card>

                <Card className="mx-2 mt-4 p-0">
                    <div className="grid grid-cols-1 gap-1 p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Item</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.invoice_items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>
                                            <Input
                                                className="min-w-[300px] border-none shadow-none"
                                                placeholder="Enter item description"
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updatedItems = [...data.invoice_items];
                                                    updatedItems[index].description = e.target.value;
                                                    setData('invoice_items', updatedItems);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                className="w-[100px] border-none shadow-none"
                                                placeholder="Enter item quantity"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const quantity = Number(e.target.value);
                                                    const updatedItems = [...data.invoice_items];
                                                    updatedItems[index].quantity = quantity;
                                                    updatedItems[index].total = quantity * updatedItems[index].rate;
                                                    setData('invoice_items', updatedItems);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center">
                                                <DollarSign className="absolute left-2 h-3 w-3 text-muted-foreground" />
                                                <Input
                                                    className="w-[100px] border-none pl-5 shadow-none"
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => {
                                                        const rate = Number(e.target.value);
                                                        const updatedItems = [...data.invoice_items];
                                                        updatedItems[index].rate = rate;
                                                        updatedItems[index].total = rate * updatedItems[index].quantity;
                                                        setData('invoice_items', updatedItems);
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2">
                                                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                                                </span>
                                                <Input className="w-[100px] border-none pl-5 shadow-none" disabled type="number" value={item.total} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={4} className="text-right font-bold">
                                        Total
                                    </TableCell>
                                    <TableCell className="flex items-center gap-1 font-bold">
                                        <DollarSign className="h-3 w-3" />
                                        {total}
                                        {errors.amount && <div className="text-red-500">{errors.amount}</div>}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                <div className="flex justify-between p-4">
                    <div className="flex items-center">
                        <Button
                            type="button"
                            variant="secondary"
                            className="mr-2"
                            onClick={() =>
                                setData({
                                    ...data,
                                    invoice_items: [...data.invoice_items, { description: '', quantity: 1, rate: 0, total: 0 }],
                                })
                            }
                        >
                            <CirclePlus /> Add Item
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setData({ ...data, invoice_items: data.invoice_items.slice(0, -1) })}
                            disabled={data.invoice_items.length <= 1}
                        >
                            <CircleMinus /> Remove Item
                        </Button>
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
