import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { usePage } from '@inertiajs/react';
export default function UsersIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const { users, auth } = usePage<{
        users: User[];
        auth: { user: User; permissions: string[] };
    }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mx-2 p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Last login</TableHead>
                            <TableHead>Last Login IP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {Array.isArray(user.roles) && user.roles.length > 0 ? (
                                        <Badge>{user.roles.map((role: { name: string }) => role.name).join(', ')}</Badge>
                                    ) : (
                                        <Badge>Member</Badge>
                                    )}
                                </TableCell>
                                <TableCell>{user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : ''}</TableCell>
                                <TableCell>{user.last_login_ip || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AppLayout>
    );
}
