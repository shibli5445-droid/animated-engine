"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, DollarSign, Mail, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Client {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
}

export function AdminTimeTracker({ clients }: { clients: Client[] }) {
    const [selectedClientId, setSelectedClientId] = useState("");
    const [hours, setHours] = useState("");
    const [notes, setNotes] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState<"email" | "whatsapp">("email");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const generatePDF = (client: Client, invoiceId: string, date: string, amount: string, hours: string, notes: string) => {
        const doc = new jsPDF();

        // Color Palette
        const bgDark = [9, 9, 11]; // Zinc-950
        const textLight = [250, 250, 250]; // Zinc-50
        const textMuted = [161, 161, 170]; // Zinc-400
        const accentGreen = [16, 185, 129]; // Emerald-500
        const borderGray = [39, 39, 42]; // Zinc-800

        // Background
        doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

        // Header Section
        doc.setFontSize(24);
        doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
        doc.setFont("helvetica", "bold");
        doc.text("PerformOS", 20, 25);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text("ELITE PERFORMANCE COACHING", 20, 32);

        // Divider Line
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.line(20, 40, 190, 40);

        // Invoice Details (Right Aligned)
        doc.setFontSize(32);
        doc.setTextColor(textLight[0], textLight[1], textLight[2]);
        doc.text("INVOICE", 190, 30, { align: "right" });

        doc.setFontSize(10);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text(`#${invoiceId}`, 190, 36, { align: "right" });

        // Bill To Section
        doc.setFontSize(10);
        doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
        doc.text("BILL TO", 20, 55);

        doc.setFontSize(14);
        doc.setTextColor(textLight[0], textLight[1], textLight[2]);
        doc.text(client.name, 20, 62);

        doc.setFontSize(10);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        if (client.company) doc.text(client.company, 20, 68);
        if (client.email) doc.text(client.email, 20, 74);

        // Date/Total Section (Right Side)
        doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
        doc.text("DATE", 140, 55);
        doc.text("TOTAL DUE", 190, 55, { align: "right" });

        doc.setTextColor(textLight[0], textLight[1], textLight[2]);
        doc.text(date, 140, 62);
        doc.setFontSize(14);
        doc.text(`$${amount}`, 190, 62, { align: "right" });

        // Table
        autoTable(doc, {
            startY: 90,
            head: [['DESCRIPTION', 'HOURS', 'RATE', 'AMOUNT']],
            body: [
                [notes || "Performance Coaching Session", hours + " hrs", "$150.00/hr", `$${amount}`],
            ],
            foot: [
                ['', '', 'TOTAL', `$${amount}`]
            ],
            theme: 'plain',
            styles: {
                fillColor: [9, 9, 11], // Match bg
                textColor: [250, 250, 250],
                lineColor: [39, 39, 42],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [9, 9, 11],
                textColor: [16, 185, 129],
                fontStyle: 'bold',
                lineWidth: 0, // No border for head
            },
            footStyles: {
                fillColor: [9, 9, 11],
                textColor: [16, 185, 129],
                fontStyle: 'bold',
                halign: 'right'
            },
            columnStyles: {
                0: { cellWidth: 'auto' }, // Description
                3: { halign: 'right' }, // Amount
            },
            margin: { left: 20, right: 20 }
        });

        // Footer Message
        const finalY = (doc as any).lastAutoTable.finalY + 30;
        doc.setFontSize(10);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text("Thank you for your trust and commitment to excellence.", 105, finalY, { align: "center" });

        doc.save(`Invoice-${invoiceId}.pdf`);
    };

    const handleInvoice = async () => {
        if (!selectedClientId || !hours) {
            toast.error("Please select a client and enter hours.");
            return;
        }

        const client = clients.find(c => c.id === selectedClientId);
        if (!client) return;

        setIsSubmitting(true);

        // Calculate amount
        const amount = (parseFloat(hours) * 150).toFixed(2);
        const invoiceId = `INV-${Math.floor(Math.random() * 10000)}`;
        const date = new Date().toLocaleDateString();

        // Construct Message
        const messageSubject = `Invoice ${invoiceId} from Performance Coach`;
        const messageBody = `Hi ${client.name},\n\nPlease find attached the invoice for our recent session.\n\nDate: ${date}\nAmount: $${amount}\n\nBest,\nYour Coach`;

        // Generate and Download PDF
        generatePDF(client, invoiceId, date, amount, hours, notes);

        toast.info("Invoice PDF Downloaded", {
            description: "Please attach this file to your message."
        });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (deliveryMethod === "email") {
            if (client.email) {
                const mailtoLink = `mailto:${client.email}?subject=${encodeURIComponent(messageSubject)}&body=${encodeURIComponent(messageBody)}`;
                window.open(mailtoLink, '_blank');
            } else {
                toast.error("Client email not found.");
            }
        } else if (deliveryMethod === "whatsapp") {
            if (client.phone) {
                const waLink = `https://wa.me/${client.phone}?text=${encodeURIComponent(messageBody)}`;
                window.open(waLink, '_blank');
            } else {
                toast.error("Client phone not found.");
            }
        }

        setIsSubmitting(false);
        setHours("");
        setNotes("");
        setSelectedClientId("");
    };

    return (
        <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time Tracker & Billing
                </CardTitle>
                <CardDescription>Log sessions and generate PDF invoices instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClientId} onValueChange={setSelectedClientId}>
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

                <div className="space-y-2">
                    <Label>Delivery Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant={deliveryMethod === "email" ? "default" : "outline"}
                            className={cn("w-full justify-start", deliveryMethod === "email" && "bg-primary text-primary-foreground")}
                            onClick={() => setDeliveryMethod("email")}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                        </Button>
                        <Button
                            variant={deliveryMethod === "whatsapp" ? "default" : "outline"}
                            className={cn("w-full justify-start", deliveryMethod === "whatsapp" && "bg-green-600 hover:bg-green-700 text-white")}
                            onClick={() => setDeliveryMethod("whatsapp")}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp
                        </Button>
                    </div>
                </div>

                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2"
                    onClick={handleInvoice}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        "Generating..."
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Generate PDF & Send
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
