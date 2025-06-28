import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type SubscriptionForm = {
    priceId: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors } = useForm<SubscriptionForm>({
        priceId: 'price_1RerDcQ38rbmYHmWm9AxIWt7',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Redirect to server-side checkout handler
        const params = new URLSearchParams({ priceId: data.priceId }).toString();
        window.location.href = `/checkout?${params}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Billing information" description="Update your billing details" />
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="mt-6 space-y-2">
                        <Label>Subscribe</Label>

                        <RadioGroup value={data.priceId} onValueChange={(value) => setData('priceId', value)}>
                            <Card className="flex flex-row items-start space-x-2 p-4">
                                <RadioGroupItem value="price_1RerDcQ38rbmYHmWm9AxIWt7" id="option-one" />
                                <Label htmlFor="option-one">Yearly @ $49.99</Label>
                            </Card>
                            <Card className="flex flex-row items-start space-x-2 p-4">
                                <RadioGroupItem value="price_1Req0rQ38rbmYHmWcW2ISMMY" id="option-two" />
                                <Label htmlFor="option-two">Monthly @ $4.99</Label>
                            </Card>
                            <Card className="flex flex-row items-start space-x-2 p-4">
                                <RadioGroupItem value="price_1RerDcQ38rbmYHmW57EDPnlU" id="option-three" />
                                <Label htmlFor="option-three">Weekly @ $1.99</Label>
                            </Card>
                        </RadioGroup>

                        <Button variant="default">Subscribe</Button>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
}
