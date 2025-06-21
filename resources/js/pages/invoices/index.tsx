import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { DollarSign, Pencil, Search } from 'lucide-react';
export default function UsersIndex({ invoices }: { invoices: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoices',
            href: '/invoices',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex items-center justify-between p-2">
                <Link href="/invoices/create">
                    {' '}
                    <Button>Create Invoice</Button>
                </Link>

                <div className="relative w-[300px]">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </span>
                    <Input placeholder="Search invoices..." className="pl-9" />
                </div>
            </div>
            <Card className="mx-2 p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Due date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.name}</TableCell>
                                <TableCell>{invoice.email}</TableCell>
                                <TableCell>{new Date(invoice.invoice_date).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-1">
                                        {' '}
                                        <DollarSign className="h-3 w-3" />
                                        {Number(invoice.amount).toFixed(2)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Link href={`/invoices/${invoice.id}`}>
                                            <Button variant="secondary">View</Button>
                                        </Link>
                                        <a href={`/invoices/${invoice.id}/print`} target="_blank" rel="noopener noreferrer">
                                            <Button variant="secondary">Print</Button>
                                        </a>
                                        <Link href={`/invoices/${invoice.id}/edit`}>
                                            <Button variant="secondary" className="">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AppLayout>
    );
}
