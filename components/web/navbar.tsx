import { Button } from "../ui/button"
import Link from "next/link"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/session";
import { logout } from '@/app/actions/logout'

export default async function Navbar() {
    const cookieStore = await cookies();
    const session = await decrypt(cookieStore.get('session_id')?.value);
    return (
        <div className="flex flex-row p-4 m-4 flex-wrap">
            <div className="flex flex-row flex-1">
                <Button asChild variant="ghost"><Link href="/">Home</Link></Button>
                <Button asChild variant="ghost"><Link href="/about">About</Link></Button>
                <Button asChild variant="ghost"><Link href="/create">Create</Link></Button>
                
            </div>

            <div className="flex flex-row justify-end p-4">
                {session ? (
                    
                    <form action={logout}>
                        <Button variant="outline">
                            Logout
                        </Button>
                    </form>
                ) : (
                    <>
                        <Button asChild variant="outline">
                            <Link href="/signup">SignUp</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/signin">Login</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

