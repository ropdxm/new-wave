import { Timestamp } from "firebase/firestore";


interface UserF {
    email: string;
    gender: string;
    country: string;
    password: string;
    firstName: string;
    instagram: string;
    secondName: string;
    location: Location;
    dateOfBirth: string;
    phoneNumber: string;
    affiliation: Affiliation;
    status: string;
}
interface Location {
    city: string;
    country: string;
}
  
interface Affiliation {
    type: string;
    name: string;
    studyYear: Number;
    degree: string;
}

// inventory and stuff
interface InventoryF {
    item_id: string;
    item_name: string;
    item_quantity: string;
    item_owner: string;
}
interface FinancesF {
    owner_id: string;
    amount: number;
    currency: string;
}
interface InventoryTransactionsF {
    transaction_id: string;
    event_id: string;
    issued_by: string; // user id
    issued_at: Timestamp;
    item_id: string;
    item_quantity: number;
    note: string;
}
interface TasksF {
    completed: boolean;
    issuer: string; // user_id
    issuedTo: string; // user_id
    createdAt: Timestamp;
    completedAt: Timestamp;
    content: string;
  }  

// events
interface EventF {
    text: string // description
    type: string
    city: string
    location: string // 2gis link
    title: string
    image?: string
    format: string
    places: number
    plannedStartTime: string
    plannedEndTime: string
    registrationStartTime: string
    registrationEndTime: string
    duration: number
    date: Timestamp
    created_at: Timestamp
    partners: string[]
    organizators: string[]
    host_id: string; // user_id
}
interface EventReportsF {
    event_id: string;
    description: string;
    actualStartTime: Timestamp;
    actualEndTime: Timestamp;
}
interface CleanUpReportDetailsF {
    report_id: string; // EventReportsF reference
    totalBagsCollected: string;
    cleanedArea: string;
}
interface CollectionsReportDetailsF {
    report_id: string; // EventReportsF reference
    plasticCollected: number; // kg
    paperCollected: number; // kg
    glassCollected: number; // kg
    MetalCollected: number; // kg
}
interface TreePlanningReportDetailsF {
    report_id: string; // EventReportsF reference
    treesPlanted: number; // How many trees planted
}
interface EventParticipantsF {
    volunteer_id: string;
    event_id: string;
    registraionTime: Timestamp;
    checkInTime: Timestamp;
    checkOutTime: Timestamp;
  }  

export { UserF, InventoryF, FinancesF, EventF };
