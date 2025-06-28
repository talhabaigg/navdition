import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    justLogged,
    auth,
    tenant,
    users,
}: {
    justLogged: boolean;
    auth: { user: { tenants: { tenant_id: string; domain: string }[]; email: string } };
    tenant?: { tenant_id: string; domain: string };
    users: User[];
}) {
    const submitTenant = (domain: string, email: string) => {
        router.post(route('tenant.generate'), {
            domain,
            email,
        });
    };
    const chartConfig = {
        projects: {
            label: 'Projects',
            color: '#2563eb',
        },
    } satisfies ChartConfig;

    const chartData = users.map((user: User) => ({
        name: user.name,
        projects: user.projects_count,
    }));

    console.log(justLogged, tenant, auth.user.tenants);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {justLogged && !tenant ? (
                <div>
                    <AlertDialog open={true}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Select Workspace</AlertDialogTitle>
                                <AlertDialogDescription>Please select main tenant :</AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="mt-4 flex flex-col gap-2">
                                {auth.user.tenants.map((tenant, i) => (
                                    <button
                                        onClick={() => submitTenant(tenant.domain, auth.user.email)}
                                        key={i}
                                        className="cursor-pointer rounded bg-primary px-4 py-2 text-center text-white transition hover:bg-primary/80"
                                    >
                                        {tenant.tenant_id} ({tenant.domain})
                                    </button>
                                ))}
                            </div>
                            <AlertDialogCancel className="cursor-pointer" onClick={() => window.location.reload()}>
                                Central
                            </AlertDialogCancel>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ) : (
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Label></Label>
                    <Card className="w-full">
                        <CardTitle className="p-2">This Month - Projects by users</CardTitle>
                        <CardContent className="p-0">
                            {' '}
                            <ChartContainer config={chartConfig} className="h-[400px] w-full p-2">
                                <BarChart data={chartData} width={600} height={300}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value} // Optional truncation
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="projects" fill="var(--color-projects)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}
