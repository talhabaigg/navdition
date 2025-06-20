import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BadgeAlert, CircleCheck, Clock, Folder } from 'lucide-react';
import CreateProjectForm from './index-partials/createProjectForm';
import { ProjectCard } from './index-partials/projectCard';
import { Project } from './project';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface ProjectStats {
    open: number;
    active: number;
    under_review: number;
    completed: number;
}

export default function Dashboard() {
    const { projects, projectStats, auth } = usePage<{
        projects: Project[];
        projectStats: ProjectStats;
        auth: { user: User; permissions: string[] };
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <h1 className="px-2 text-lg font-semibold">This month</h1>
            <div className="grid auto-rows-min gap-2 p-2 md:grid-cols-4">
                <Card className="flex justify-between p-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>Open</span>
                            <span className="text-3xl font-medium">{projectStats.open}</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <Folder />
                        </div>
                    </div>
                </Card>
                <Card className="flex justify-between p-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>In-Progress</span>
                            <span className="text-3xl font-medium">{projectStats.active}</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <Clock />
                        </div>
                    </div>
                </Card>
                <Card className="flex justify-between p-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>Under review</span>
                            <span className="text-3xl font-medium">{projectStats.under_review}</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <BadgeAlert />
                        </div>
                    </div>
                </Card>
                <Card className="flex justify-between p-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <span>Completed</span>
                            <span className="text-3xl font-medium">{projectStats.completed}</span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
                            <CircleCheck />
                        </div>
                    </div>
                </Card>
            </div>
            {auth.permissions.includes('create projects') && (
                <div className="flex justify-between px-2">
                    <CreateProjectForm />
                </div>
            )}
            <div></div>
            <Tabs defaultValue="open" className="w-full p-2">
                <TabsList className="w-full justify-between">
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="claimed">In-Progress</TabsTrigger>
                    <TabsTrigger value="waiting">Waiting for review</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="w-full">
                    {' '}
                    <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                        {projects
                            .filter((project) => project.status === 'open')
                            .map((project) => (
                                <ProjectCard project={project} key={project.id} permissions={auth.permissions} />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="claimed">
                    {(() => {
                        // Group claimed projects by assignee name
                        const claimedProjects = projects.filter((project) => project.status === 'claimed');
                        const grouped: Record<string, Project[]> = {};
                        claimedProjects.forEach((project) => {
                            const assignee = project.assignee?.name || 'Unassigned';
                            if (!grouped[assignee]) grouped[assignee] = [];
                            grouped[assignee].push(project);
                        });
                        return Object.entries(grouped).map(([assignee, projects]) => (
                            <div key={assignee} className="mb-6">
                                <h2 className="mb-2 text-lg font-semibold">
                                    <Badge variant="outline">{assignee}</Badge>
                                </h2>
                                <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                                    {projects.map((project) => (
                                        <ProjectCard project={project} key={project.id} permissions={auth.permissions} />
                                    ))}
                                </div>
                            </div>
                        ));
                    })()}
                </TabsContent>
                <TabsContent value="waiting">
                    {(() => {
                        // Group waiting projects by assignee name
                        const waitingProjects = projects.filter((project) => project.status === 'under_review');
                        const grouped: Record<string, Project[]> = {};
                        waitingProjects.forEach((project) => {
                            const assignee = project.assignee?.name || 'Unassigned';
                            if (!grouped[assignee]) grouped[assignee] = [];
                            grouped[assignee].push(project);
                        });
                        return Object.entries(grouped).map(([assignee, projects]) => (
                            <div key={assignee} className="mb-6">
                                <h2 className="mb-2 text-lg font-semibold">{assignee}</h2>
                                <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                                    {projects.map((project) => (
                                        <ProjectCard project={project} key={project.id} permissions={auth.permissions} />
                                    ))}
                                </div>
                            </div>
                        ));
                    })()}
                </TabsContent>
                <TabsContent value="completed">
                    {(() => {
                        // Group completed projects by assignee name
                        const completedProjects = projects.filter((project) => project.status === 'completed');
                        const grouped: Record<string, Project[]> = {};
                        completedProjects.forEach((project) => {
                            const assignee = project.assignee?.name || 'Unassigned';
                            if (!grouped[assignee]) grouped[assignee] = [];
                            grouped[assignee].push(project);
                        });
                        return Object.entries(grouped).map(([assignee, projects]) => (
                            <div key={assignee} className="mb-6">
                                <h2 className="mb-2 text-lg font-semibold">{assignee}</h2>
                                <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                                    {projects.map((project) => (
                                        <ProjectCard project={project} key={project.id} permissions={auth.permissions} />
                                    ))}
                                </div>
                            </div>
                        ));
                    })()}
                </TabsContent>
            </Tabs>
        </AppLayout>
    );
}
