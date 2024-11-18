import {Button} from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default async function Index() {
    return (
        <>
            <section className="flex-1 flex flex-col bg-dotted-pattern bg-contain py-5 md:py-10 p-4 w-full md:w-1/2 min-w-64 mx-auto">
                <div className="wrapper grid grid-cols-1 gap-10 md:grid-cols-2 2xl:gap-0">
                    <div className="flex flex-col justify-center gap-8 p-2">
                        <h1>Community and Activity</h1>
                        <h3 className="p-regular-20 md:p-regular-24">
                            A place to connect you to what you need </h3>
                        <Button size="lg" asChild className="button w-full sm:w-fit">
                            <Link href="/feed">
                                Explore Now
                            </Link>
                        </Button>
                    </div>

                    <Image
                        src="/hero.png"
                        alt="hero"
                        width={1000}
                        height={1000}
                        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                    />
                </div>
            </section>
        </>
    );
}

