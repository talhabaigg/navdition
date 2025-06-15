import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ justLogged, auth, tenant }) {
    const submitTenant = (domain: string, email: string) => {
        router.post(route('tenant.generate'), {
            domain,
            email,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {!tenant && justLogged && auth.user.tenants.length > 0 ? (
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
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
            )}
        </AppLayout>
    );
}
