"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hexagon, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        // Mock Authentication Logic
        setTimeout(() => {
            if (email === "admin@perform.os" && password === "admin123") {
                toast.success("Welcome back, Admin");
                router.push("/admin");
            } else if (email === "client@perform.os" && password === "client123") {
                toast.success("Welcome back, Alex");
                router.push("/dashboard");
            } else {
                toast.error("Invalid credentials", {
                    description: "Try admin@perform.os / admin123"
                });
                setIsLoading(false);
            }
        }, 1000); // Simulate network delay
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur border-primary/20">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <Hexagon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Sign in to PerformOS</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <div className="bg-muted/50 p-2 rounded text-xs w-full">
                        <p><strong>Admin:</strong> admin@perform.os / admin123</p>
                        <p><strong>Client:</strong> client@perform.os / client123</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
