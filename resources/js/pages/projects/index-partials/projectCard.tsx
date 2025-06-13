import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { CalendarDays, CircleDollarSign, User } from 'lucide-react';
import { Project } from '../project';
interface ProjectCardProps {
    project: Project;
}
const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Card className="p-4">
            <CardTitle className="flex justify-between">
                <div>{project.title}</div>
                <div className="ml-auto">In-Progress</div>
            </CardTitle>
            <CardDescription>{project.type}</CardDescription>
            <CardDescription>{project.description}</CardDescription>
            <CardContent className="space-y-1 p-0">
                <div className="flex items-center justify-start space-x-2">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs">{new Date(project.due_date).toDateString()}</span>
                </div>
                <div className="flex items-center justify-start space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs">{project.assignee.name}</span>
                </div>
                <div className="flex items-center justify-start space-x-2">
                    <CircleDollarSign className="h-4 w-4" />
                    <span className="text-xs">${project.price}</span>
                </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2 p-0">
                {' '}
                <div className="mt-2">
                    <Button variant="secondary">View Details</Button>
                </div>
                <div className="mt-2">
                    <Button className="bg-yellow-500 hover:bg-yellow-600">Claim task</Button>
                </div>
                <div className="mt-2">
                    <Button variant="secondary">Assign Editor</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export { ProjectCard };
