export const MOCK_CLIENT = {
    id: "client-1",
    name: "Alex Performer",
    email: "alex@example.com",
    status: "Active",
    avatar: "https://github.com/shadcn.png",
    goals: [
        { id: 1, title: "Revenue Target", current: 75000, target: 100000, unit: "$" },
        { id: 2, title: "Workout Sessions", current: 12, target: 20, unit: "sessions" },
        { id: 3, title: "Deep Work Hours", current: 35, target: 50, unit: "hours" },
    ],
    habits: [
        { id: 1, title: "Morning Meditation (10m)", completed: true },
        { id: 2, title: "Cold Plunge", completed: false },
        { id: 3, title: "Read 10 Pages", completed: true },
        { id: 4, title: "No Phone Before 8AM", completed: false },
    ],
    metrics: [
        { date: "Day 1", score: 65 },
        { date: "Day 2", score: 70 },
        { date: "Day 3", score: 68 },
        { date: "Day 4", score: 75 },
        { date: "Day 5", score: 82 },
        { date: "Day 6", score: 78 },
        { date: "Day 7", score: 85 },
        { date: "Day 8", score: 88 },
        { date: "Day 9", score: 92 },
        { date: "Day 10", score: 90 },
    ],
};

export const MOCK_CLIENTS_LIST = [
    { id: "c1", name: "Alex Performer", company: "TechFlow Inc.", rate: 150, status: "Active" },
    { id: "c2", name: "Jordan Builder", company: "ConstructCo", rate: 200, status: "Active" },
    { id: "c3", name: "Casey Writer", company: "Content Kings", rate: 125, status: "Paused" },
    { id: "c4", name: "Taylor Designer", company: "Creative Studio", rate: 175, status: "Active" },
];
