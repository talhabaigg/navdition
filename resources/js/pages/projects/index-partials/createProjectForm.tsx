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
import { Link, Plus } from 'lucide-react';
const CreateProjectForm = () => {
    return (
        <Dialog>
            <form>
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
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Content type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="apple">Reels</SelectItem>
                                        <SelectItem value="banana">Youtube</SelectItem>
                                        <SelectItem value="blueberry">Tiktok</SelectItem>
                                        <SelectItem value="grapes">Podcast</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Content Link </Label>
                            <div className="relative w-full">
                                <Link className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                                <Input type="text" placeholder="Paste url here" className="pl-10" />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Description</Label>
                            <Textarea />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-1/2">
                            Create project
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-1/2">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateProjectForm;
