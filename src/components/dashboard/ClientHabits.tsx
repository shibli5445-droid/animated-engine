"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Habit {
    id: number;
    title: string;
    completed: boolean;
}

export function ClientHabits({ habits }: { habits: Habit[] }) {
    // Local state for demo interactivity
    const [localHabits, setLocalHabits] = useState(habits);

    const toggleHabit = (id: number) => {
        setLocalHabits(localHabits.map(h =>
            h.id === id ? { ...h, completed: !h.completed } : h
        ));
    };

    return (
        <Card className="h-full bg-card/50 backdrop-blur border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Daily Wins
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {localHabits.map((habit) => (
                    <div key={habit.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition bg-muted/20">
                        <Checkbox
                            id={`habit-${habit.id}`}
                            checked={habit.completed}
                            onCheckedChange={() => toggleHabit(habit.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/50"
                        />
                        <label
                            htmlFor={`habit-${habit.id}`}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                        >
                            {habit.title}
                        </label>
                    </div>
                ))}
                {localHabits.every(h => h.completed) && (
                    <div className="text-center text-sm text-primary mt-4 animate-pulse">
                        All wins secured! Great job.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
