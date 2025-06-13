import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import CreateProjectForm from './index-partials/createProjectForm';
import { ProjectCard } from './index-partials/projectCard';
import { Project } from './project';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { projects, flash } = usePage<{ projects: Project[]; flash: { success?: string } }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mt-2 flex justify-end">
                <CreateProjectForm />
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard project={project} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
