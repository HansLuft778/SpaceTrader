import type { Ship, Shipyard } from "./shipTypes";

type AllowedDataTypes = Contract[] | Waypoint | Waypoint[] | Account | Shipyard;

export interface ApiResponse<T extends AllowedDataTypes> {
    data: T;
    meta: Meta;
    error?: Error;
}

export interface Error {
    code: number;
    message: string;
}

export interface Account {
    accountId: string;
    credits: number;
    headquarters: string;
    startingFaction: string;
    symbol: string;
}
export interface Waypoint {
    chart: Chart;
    faction: Faction;
    orbitals: Orbitals[];
    symbol: string;
    systemSymbol: string;
    traits: Trait[];
    type: string;
    x: number;
    y: number;
}

export interface Trait {
    description: string;
    name: string;
    symbol: string;
};

export interface Orbital {
    symbol: string;
};

export interface Chart {
    submittedBy: string;
    submittedOn: string;
}

export interface Orbitals {
    symbol: string;
}

export interface Faction {
    symbol: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
}

// ############################## CONTRACT ##############################

export interface Contract {
    accepted: boolean;
    deadlineToAccept: string;
    expiresAt: string;
    factionSymbol: string;
    fulfilled: boolean;
    id: string;
    terms: Terms;
    type: string;
}

export interface Terms {
    deadline: string;
    deliver: Deliver[];
    payment: Payment;
}

export interface Deliver {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
}

export interface Payment {
    onAccepted: number;
    onFulfilled: number;
}


// ############################## SHIP BOUGHT ##############################

export interface ShipBought {
    agent: Account;
    ship: Ship;
    transaction: Transaction;
}

export interface Transaction {
    shipSymbol: string;
    waypointSymbol: string;
    agentSymbol: string;
    price: number;
    timestamp: string;
}