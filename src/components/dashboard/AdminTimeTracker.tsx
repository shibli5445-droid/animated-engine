"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, DollarSign, Send } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils is available

interface Client {
    id: string;
    name: string;
}

export function AdminTimeTracker({ clients }: { clients: Client[] }) {
    const [selectedClient, setSelectedClient] = useState("");
    const [hours, setHours] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInvoice = async () => {
        if (!selectedClient || !hours) {
            toast.error("Please select a client and enter hours.");
            return;
        }

        setIsSubmitting(true);

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const amount = parseFloat(hours) * 150;
        const invoiceId = `INV-${Math.floor(Math.random() * 10000)}`;

        toast.success(`Invoice ${invoiceId} generated for $${amount}`, {
            description: `Sent to client successfully.`,
        });

        setIsSubmitting(false);
        setHours("");
        setNotes("");
        // Keep client selected or reset? Resetting for now.
        setSelectedClient("");
    };

    return (
        <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time Tracker & Billing
                </CardTitle>
                <CardDescription>Log sessions and generate invoices instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map(client => (
                                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="hours">Hours Worked</Label>
                        <div className="relative">
                            <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="hours"
                                type="number"
                                placeholder="0.0"
                                className="pl-9"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Total Value</Label>
                        <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                            <DollarSign className="mr-2 h-4 w-4 opacity-50" />
                            {hours ? (parseFloat(hours) * 150).toFixed(2) : "0.00"}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Session Notes</Label>
                    <Input
                        id="notes"
                        placeholder="What did you assume or achieve?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={handleInvoice}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        "Generating..."
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Generate & Send Invoice
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
