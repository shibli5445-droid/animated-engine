"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "lucide-react"; // Import Badge icon or use pure CSS badge? Shadcn usually has a Badge component. I forgot to install it. I'll use tailwind classes.

interface Client {
    id: string;
    name: string;
    company: string;
    rate: number;
    status: string;
}

export function AdminClientTable({ clients }: { clients: Client[] }) {
    return (
        <div className="rounded-md border border-border bg-card/50 backdrop-blur">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.company}</TableCell>
                            <TableCell>${client.rate}/hr</TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${client.status === 'Active'
                                        ? 'bg-green-500/10 text-green-500 ring-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/20'
                                    }`}>
                                    {client.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <button className="text-primary hover:text-primary/80 transition text-sm font-medium">View</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
