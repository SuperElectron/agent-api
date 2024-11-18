import Link from "next/link";
import {Button} from "./ui/button";


export default async function AuthButton() {

    return (
        <div className="flex gap-2 text-gray-500">
            <Button asChild size="sm" variant={"default"}>
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}
