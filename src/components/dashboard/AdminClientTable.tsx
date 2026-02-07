"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MOCK_CLIENT } from "@/lib/data"; // Import mock client to simulate update

import { ClientDialog } from "./ClientDialog";

interface Client {
    id: string;
    name: string;
    company: string;
    rate: number;
    status: string;
    email?: string;
    phone?: string;
    country?: string;
    age?: number;
    profession?: string;
}

export function AdminClientTable({ clients, onUpdateClient }: { clients: Client[], onUpdateClient: (client: Client) => void }) {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [greeting, setGreeting] = useState(MOCK_CLIENT.greeting);
    const [message, setMessage] = useState(MOCK_CLIENT.motivationalMessage);
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    // Edit Profile State
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const handleEditMessageClick = (client: Client) => {
        setSelectedClient(client);
        setGreeting(MOCK_CLIENT.greeting);
        setMessage(MOCK_CLIENT.motivationalMessage);
        setIsMessageOpen(true);
    };

    const handleEditProfileClick = (client: Client) => {
        setEditingClient(client);
        setIsEditProfileOpen(true);
    };

    const handleMessageSave = () => {
        if (!selectedClient) return;
        // Simulate API call
        MOCK_CLIENT.greeting = greeting;
        MOCK_CLIENT.motivationalMessage = message;
        toast.success("Client dashboard updated");
        setIsMessageOpen(false);
    };

    const handleProfileSave = (updatedClient: Client) => {
        onUpdateClient(updatedClient);
        setIsEditProfileOpen(false);
    };

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
                            <TableCell className="font-medium">
                                <div>{client.name}</div>
                                <div className="text-xs text-muted-foreground">{client.email}</div>
                            </TableCell>
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
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditProfileClick(client)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditMessageClick(client)}
                                        className="text-primary hover:text-primary/80"
                                    >
                                        Edit Message
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Message Dialog */}
            <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Client Dashboard</DialogTitle>
                        <DialogDescription>
                            Customize the welcome message for {selectedClient?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="greeting">Greeting Headline</Label>
                            <Input
                                id="greeting"
                                value={greeting}
                                onChange={(e) => setGreeting(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Motivational Message</Label>
                            <Input
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMessageOpen(false)}>Cancel</Button>
                        <Button onClick={handleMessageSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Profile Dialog */}
            <ClientDialog
                open={isEditProfileOpen}
                onOpenChange={setIsEditProfileOpen}
                client={editingClient}
                onSave={handleProfileSave}
            />
        </div>
    );
}
