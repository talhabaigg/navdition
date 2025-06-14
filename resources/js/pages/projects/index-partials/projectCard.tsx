import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { CalendarDays, CircleCheck, User } from 'lucide-react';
import { Project } from '../project';
import DeleteProjectDialog from './deleteProjectModal';

interface ProjectCardProps {
    project: Project;
}
const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Card className="p-4">
            <CardTitle className="flex justify-between">
                <div className="max-w-1/2 overflow-hidden break-all text-ellipsis whitespace-normal">{project.title}</div>
                <div className="ml-auto">
                    <Badge variant="outline">{project.status}</Badge>
                </div>
            </CardTitle>
            <CardDescription>{project.type}</CardDescription>
            <CardDescription>
                <small className="text-sm leading-none font-medium">{project.description}</small>
            </CardDescription>
            <CardContent className="space-y-1 p-0">
                <div className="flex items-center justify-start space-x-2">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs">{project.due_date ? new Date(project.due_date).toDateString() : 'No due date'}</span>
                </div>
                <div className="flex items-center justify-start space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs">{project.creator?.name}</span>
                </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2 p-0">
                <div>
                    {project.assigned_to ? (
                        <Link href={route('projects.release', project.id)}>
                            <Button variant="secondary">Release</Button>
                        </Link>
                    ) : (
                        <Link href={route('projects.claim', project.id)}>
                            <Button>Claim</Button>
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end space-x-2">
                    <div>
                        {project.assigned_to ? (
                            <Link href={route('projects.complete', project.id)}>
                                <Button variant="secondary">
                                    <CircleCheck />
                                </Button>
                            </Link>
                        ) : (
                            ''
                        )}
                    </div>
                    <DeleteProjectDialog projectId={project.id} />
                </div>
            </CardFooter>
        </Card>
    );
};

export { ProjectCard };
