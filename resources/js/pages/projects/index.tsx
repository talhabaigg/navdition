import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CircleCheck, Clock, Folder } from 'lucide-react';
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
    const { projects } = usePage<{ projects: Project[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid auto-rows-min gap-4 p-4 md:grid-cols-3">
                <Card className="flex justify-between p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>Open</span>
                            <span className="text-3xl font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <Folder />
                        </div>
                    </div>
                </Card>
                <Card className="flex justify-between p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>In-Progress</span>
                            <span className="text-3xl font-medium">1</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <Clock />
                        </div>
                    </div>
                </Card>
                <Card className="flex justify-between p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>Completed</span>
                            <span className="text-3xl font-medium">12</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <CircleCheck />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="mt-2 flex justify-end p-4">
                <CreateProjectForm />
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <h1 className="text-lg font-semibold">Open Projects</h1>
                {projects.filter((project) => project.status === 'open').length === 0 ? (
                    <div className="text-center text-gray-500">No open projects available.</div>
                ) : (
                    <Carousel className="w-full">
                        <CarouselContent>
                            {projects
                                .filter((project) => project.status === 'open')
                                .map((project) => (
                                    <CarouselItem key={project.id} className="basis-full pl-2 sm:basis-1/2 md:basis-1/3">
                                        <div className="mx-2 p-1">
                                            <ProjectCard project={project} />
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-lg font-semibold">My projects</h1>
                {projects.filter((project) => project.assigned_to === 1 && project.status === 'claimed').length === 0 ? (
                    <div className="text-center text-gray-500">No claimed projects available.</div>
                ) : null}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {projects
                        .filter((project) => project.assigned_to === 1 && project.status === 'claimed')
                        .map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                </div>
            </div>
        </AppLayout>
    );
}
