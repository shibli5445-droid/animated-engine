"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveUpRight } from "lucide-react";

interface Goal {
    id: number;
    title: string;
    current: number;
    target: number;
    unit: string;
}

export function ClientGoals({ goals }: { goals: Goal[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {goals.map((goal) => {
                const percentage = Math.round((goal.current / goal.target) * 100);
                const radius = 40;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percentage / 100) * circumference;

                return (
                    <Card key={goal.id} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {goal.title}
                            </CardTitle>
                            <MoveUpRight className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center py-4">
                                <div className="relative h-32 w-32">
                                    <svg className="h-full w-full -rotate-90 text-dashed-circle" viewBox="0 0 100 100">
                                        <circle
                                            className="text-muted/20"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r={radius}
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-primary transition-all duration-1000 ease-out"
                                            strokeWidth="8"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r={radius}
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-2xl font-bold text-foreground">{percentage}%</span>
                                        <span className="text-xs text-muted-foreground">
                                            {goal.current} / {goal.target}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
