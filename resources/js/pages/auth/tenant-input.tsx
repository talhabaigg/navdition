import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type TenantForm = {
    tenant: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TenantForm>>({
        tenant: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tenant.redirect'), {
            onFinish: () => reset('tenant'),
        });
    };

    return (
        <AuthLayout title="Find your account" description="Enter your domain or company below to log in">
            <Head title="Company" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Account URL</Label>
                        <div className="flex rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.tenant}
                                onChange={(e) => setData('tenant', e.target.value)}
                                placeholder="example"
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <span className="flex items-center border-r px-3 text-sm text-muted-foreground">.navdition.com</span>
                        </div>
                        <InputError message={errors.tenant} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Continue
                    </Button>
                </div>

                {/* <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div> */}
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
