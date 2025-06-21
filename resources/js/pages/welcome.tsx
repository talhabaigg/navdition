import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {/* <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link> */}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-5xl flex-col items-center text-center lg:text-left">
                        {/* Hero Section */}
                        <section className="mb-16 w-full">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Manage Projects. Send Invoices. <br />
                                <span className="text-[#6366f1]">All-in-One for Small Teams.</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4b4b45] lg:mx-0 dark:text-[#bcbcb4]">
                                Navdition is your team’s workspace for planning content, tracking tasks, and billing clients — purpose-built for 3–5
                                person creative teams. No fluff. Just focus and flow.
                            </p>
                            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                                <Link
                                    href={auth.user ? route('dashboard') : route('login')}
                                    className="rounded-md bg-black px-6 py-2 text-white hover:bg-[#333] dark:bg-white dark:text-black dark:hover:bg-[#ccc]"
                                >
                                    {auth.user ? 'Go to Dashboard' : 'Start Free Trial'}
                                </Link>
                                <Link
                                    href="#features"
                                    className="px-6 py-2 text-sm font-medium text-[#1b1b18] underline underline-offset-4 dark:text-[#ededec]"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </section>

                        {/* Features Grid */}
                        <section id="features" className="grid w-full grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <h3 className="text-xl font-semibold">🗂️ Project Management</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Assign tasks, set deadlines, and organize projects for campaigns, YouTube videos, or client work.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">🧾 Smart Invoicing</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Create and send branded invoices. Track paid vs overdue. Get paid faster with auto-reminders.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">👥 Team Collaboration</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Designed for small teams of 3–5. Assign roles, share updates, and track progress in real-time.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">📦 File & Asset Sharing</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Keep brand assets, contracts, and briefs all in one place. Attach files directly to tasks and invoices.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">📈 Progress & Deadlines</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Visual project timelines and deadlines help you deliver on time, every time.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">💳 Client Portal</h3>
                                <p className="mt-2 text-sm text-[#4b4b45] dark:text-[#bcbcb4]">
                                    Let clients log in to view their invoices, see progress, or upload assets. Fully white-labeled.
                                </p>
                            </div>
                        </section>

                        {/* Testimonials (Optional placeholder) */}
                        <section className="mt-20 w-full text-center">
                            <h2 className="mb-6 text-2xl font-semibold">Loved by Creators</h2>
                            <p className="mx-auto max-w-xl text-[#4b4b45] dark:text-[#bcbcb4]">
                                “Navdition has become our go-to workspace. We used to juggle Notion, Trello, and QuickBooks — now we just use this.”
                                <br />
                                <span className="mt-2 block text-sm italic">— Jessica, Creative Director</span>
                            </p>
                        </section>

                        {/* Footer */}
                        <footer className="mt-24 w-full border-t border-[#ddd] pt-6 text-sm text-[#73736c] dark:border-[#333] dark:text-[#99998e]">
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <p>&copy; {new Date().getFullYear()} Navdition. All rights reserved.</p>
                                <div className="flex gap-4">
                                    <Link href="/privacy" className="hover:underline">
                                        Privacy
                                    </Link>
                                    <Link href="/terms" className="hover:underline">
                                        Terms
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
