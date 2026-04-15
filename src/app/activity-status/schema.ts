export interface HappeningNowDTO {
    id: string
    badge: string
    startedAgo: string
    title: string
    progress: number
}

export interface UpcomingActivityDTO {
    id: string
    period: "AM" | "PM"
time: string
title: string
location: string
}

export interface DoneActivityDTO {
id: string
date: string
time: string
title: string
location: string
}

export const mockHappeningNow: HappeningNowDTO = {
id: "1",
badge: "Live Activity",
startedAgo: "Started 15 mins ago",
title: "Walking Assistance",
progress: 60,
}

export const mockUpcoming: UpcomingActivityDTO[] = [
{
id: "1",
period: "AM",
time: "09:00",
title: "Morning Yoga Session",
location: "Community Center • Room 302",
},
{
id: "2",
period: "AM",
time: "11:30",
title: "Therapeutic Art Class",
location: "Main Lounge Area",
},
]

export const mockDone: DoneActivityDTO[] = [
{
id: "1",
date: "11/02/2025",
time: "09:00 AM",
title: "Morning Yoga Session",
location: "Community Center • Room 302",
},
{
id: "2",
date: "10/02/2025",
time: "06:00 PM",
title: "Group Walk",
location: "Lumphini Park",
},
]