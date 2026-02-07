import { AdminClientTable } from "@/components/dashboard/AdminClientTable";
import { AdminTimeTracker } from "@/components/dashboard/AdminTimeTracker";
import { MOCK_CLIENTS_LIST } from "@/lib/data";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Admin Overview
                    </h1>
                    <p className="text-muted-foreground">
                        Manage clients, track time, and handle billing.
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Client
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Time Tracker - Takes up 1 column on large screens */}
                <div className="md:col-span-1">
                    <AdminTimeTracker clients={MOCK_CLIENTS_LIST} />
                </div>

                {/* Client List - Takes up 2 columns on large screens */}
                <div className="md:col-span-1 lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Active Clients
                        </h2>
                    </div>
                    <AdminClientTable clients={MOCK_CLIENTS_LIST} />
                </div>
            </div>
        </div>
    );
}
