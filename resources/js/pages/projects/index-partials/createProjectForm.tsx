import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Link, Plus } from 'lucide-react';
import React from 'react';
const CreateProjectForm = () => {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: '',
        attachment_link: '',
        description: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/projects');
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {' '}
                    <Plus />
                    Add New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new project</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Content type</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="reels">Reels</SelectItem>
                                        <SelectItem value="youtube">Youtube</SelectItem>
                                        <SelectItem value="tiktok">Tiktok</SelectItem>
                                        <SelectItem value="podcast">Podcast</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Content Link </Label>
                            <div className="relative w-full">
                                <Link className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="text"
                                    placeholder="Paste url here"
                                    className="pl-10"
                                    value={data.attachment_link}
                                    onChange={(e) => setData('attachment_link', e.target.value)}
                                />
                            </div>
                            {errors.attachment_link && <p className="text-sm text-red-500">{errors.attachment_link}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Description</Label>
                            <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" className="w-1/2" disabled={processing}>
                            {processing ? 'Creating...' : 'Create'}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-1/2">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectForm;
