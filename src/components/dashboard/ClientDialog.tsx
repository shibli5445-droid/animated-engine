"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Client {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    country?: string;
    age?: number;
    profession?: string;
    company?: string;
    rate?: number;
    status?: string;
}

interface ClientDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    client?: Client | null; // If provided, we are editing. If null, we are adding.
    onSave: (client: Client) => void;
}

export function ClientDialog({ open, onOpenChange, client, onSave }: ClientDialogProps) {
    const isEditing = !!client;

    // Form State
    const [formData, setFormData] = useState<Client>({
        name: "",
        email: "",
        phone: "",
        country: "",
        age: 0,
        profession: "",
        company: "",
        rate: 0,
        status: "Active"
    });

    // Reset form when opening/closing or changing client
    useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                age: undefined,
                profession: "",
                company: "",
                rate: undefined,
                status: "Active"
            });
        }
    }, [client, open]);

    const handleChange = (field: keyof Client, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Basic validation
        if (!formData.name) {
            toast.error("Name is required");
            return;
        }

        onSave(formData);
        onOpenChange(false);
        toast.success(isEditing ? "Client updated successfully" : "Client added successfully");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Client Profile" : "Add New Client"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Update existing client details." : "Enter the details for the new client."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={formData.email || ""}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={formData.phone || ""}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                placeholder="+1 555-0100"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                value={formData.country || ""}
                                onChange={(e) => handleChange("country", e.target.value)}
                                placeholder="USA"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={formData.age || ""}
                                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                                placeholder="30"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="profession">Profession</Label>
                            <Input
                                id="profession"
                                value={formData.profession || ""}
                                onChange={(e) => handleChange("profession", e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                    </div>

                    {/* Additional Business Info could go here if needed, but keeping it simple for now based on user request */}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>{isEditing ? "Save Changes" : "Add Client"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
