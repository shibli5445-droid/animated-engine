import { ClientGoals } from "@/components/dashboard/ClientGoals";
import { ClientHabits } from "@/components/dashboard/ClientHabits";
import { ClientMetrics } from "@/components/dashboard/ClientMetrics";
import { MOCK_CLIENT } from "@/lib/data";
import { User, Bell } from "lucide-react";

export default function ClientDashboardPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        {MOCK_CLIENT.greeting}
                    </h1>
                    <p className="text-muted-foreground">
                        {MOCK_CLIENT.motivationalMessage}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-muted/50 transition relative">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                    </button>
                    <div className="flex items-center gap-2 pr-4 border-r border-border">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium leading-none">{MOCK_CLIENT.name}</p>
                            <p className="text-xs text-muted-foreground">Pro Plan</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Goals - Top Row */}
                <div className="col-span-full">
                    <h2 className="text-lg font-semibold mb-4 text-foreground/90">Active Growth Goals</h2>
                    <ClientGoals goals={MOCK_CLIENT.goals} />
                </div>

                {/* Habits - Left Col */}
                <div className="md:col-span-3 lg:col-span-2">
                    <ClientHabits habits={MOCK_CLIENT.habits} />
                </div>

                {/* Metrics - Right Col */}
                <div className="md:col-span-4 lg:col-span-5">
                    <ClientMetrics metrics={MOCK_CLIENT.metrics} />
                </div>
            </div>
        </div>
    );
}
