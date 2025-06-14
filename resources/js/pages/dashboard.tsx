import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Building2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ justLogged, auth, tenant, }) {

    const submitTenant = (domain: string, email: string) => {
        router.post(route('tenant.generate'), {
            domain,
            email,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {! tenant && justLogged && auth.user.tenants.length > 0 ? (
            <div>
                <AlertDialog open={true}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>
                            Select Workspace
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Please select main tenant :
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex flex-col gap-2 mt-4">
                            {auth.user.tenants.map((tenant, i) => (
                                <button onClick={() => submitTenant(tenant.domain, auth.user.email)} key={i} className="cursor-pointer rounded bg-primary px-4 py-2 text-white text-center hover:bg-primary/80 transition">
                                    {tenant.tenant_id} ({tenant.domain})
                                </button>
                            ))}
                        </div>
                        <AlertDialogCancel className="cursor-pointer" onClick={() => window.location.reload()}>
                            Central
                        </AlertDialogCancel>
                    </AlertDialogContent>
                </AlertDialog>
            </div>) : (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
            )}
        </AppLayout>
    );
}
