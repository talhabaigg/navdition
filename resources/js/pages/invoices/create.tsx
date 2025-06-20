import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { CircleMinus, CirclePlus, IndianRupee } from 'lucide-react';
import React from 'react';
export default function UsersIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];
    const { data, setData, post, processing, errors } = useForm({
        invoice_number: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        invoice_date: '',
        due_date: '',
        amount: '',
        notes: '',
        payment_method: '',
        invoice_items: [
            {
                description: '',
                quantity: 1,
                rate: 0,
                total: 0,
            },
        ],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                setData({ name: '', email: '' }); // Reset form after successful submission
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit}>
                <Card className="mx-2 p-0">
                    <div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                            <Label>Invoice Number</Label>
                            <Input value={data.invoice_number} onChange={(e) => setData('invoice_number', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Email</Label>
                            <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Address</Label>
                            <Input value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Phone</Label>
                            <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Invoice Date</Label>
                            <Input type="date" value={data.invoice_date} onChange={(e) => setData('invoice_date', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Due Date</Label>
                            <Input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Pay Details</Label>
                            <Input value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Notes</Label>
                            <Input value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                        </div>
                    </div>
                </Card>
                <Card className="e mx-2 mt-4 p-0">
                    <div className="grid grid-cols-1 gap-1 p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Item </TableHead>
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
                                                placeholder="Enter item description "
                                                value={item.description}
                                                onChange={(e) => setData('invoice_items', [{ ...item, description: e.target.value }])}
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
                                                <IndianRupee className="absolute left-2 h-3 w-3 text-muted-foreground" />
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
                                                    <IndianRupee className="h-3 w-3 text-muted-foreground" />
                                                </span>
                                                <Input
                                                    className="w-[100px] border-none pl-5 shadow-none"
                                                    disabled
                                                    type="number"
                                                    value={item.total}
                                                    onChange={(e) => setData('invoice_items', [{ ...item, total: Number(e.target.value) }])}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={4} className="text-right font-bold">
                                        Total
                                    </TableCell>
                                    <TableCell className="flex items-center gap-1 font-bold">
                                        <IndianRupee className="h-3 w-3" />
                                        {data.invoice_items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
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
                                setData({ ...data, invoice_items: [...data.invoice_items, { description: '', quantity: 1, rate: 0, total: 0 }] })
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
                        Create
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
