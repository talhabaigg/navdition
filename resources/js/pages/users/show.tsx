import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Project } from '../projects/project';
export default function UserShow({
    user,
    projects_this_month,
    projects_last_month,
}: {
    user: User;
    projects_this_month: Project[];
    projects_last_month: Project[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];
    console.log(projects_this_month);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mx-2 px-0 py-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableCell className="font-medium">{user.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableCell>{user.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Created at</TableHead>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Roles</TableHead>
                            <TableCell>
                                {Array.isArray(user.roles) && user.roles.length > 0
                                    ? user.roles.map((role: { name: string }) => role.name).join(', ')
                                    : 'Member'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Last login</TableHead>
                            <TableCell>{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                            <TableHead>Last Login IP</TableHead>
                            <TableCell>{user.last_login_ip || 'N/A'}</TableCell>
                        </TableRow>
                    </TableHeader>
                </Table>
            </Card>
            <Card className="mx-2 p-2 px-0">
                <CardTitle className="mx-2">Projects This Month</CardTitle>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Assuming projects is an array of project objects */}
                    {projects_this_month.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                                No projects created this month.
                            </TableCell>
                        </TableRow>
                    ) : (
                        projects_this_month.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>{project.type}</TableCell>
                                <TableCell>
                                    <Badge>{project.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </Table>
            </Card>
            <Card className="mx-2 p-2 px-0">
                <CardTitle className="mx-2">Projects Last Month</CardTitle>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Assuming projects is an array of project objects */}
                    {projects_last_month.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                                No projects created last month.
                            </TableCell>
                        </TableRow>
                    ) : (
                        projects_last_month.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>{project.type}</TableCell>
                                <TableCell>
                                    <Badge>{project.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </Table>
            </Card>
        </AppLayout>
    );
}
