type AllowedDataTypes = Contract[] | Waypoint | Waypoint[] | Account | Shipyard;

export interface ApiResponse<ResponseType extends AllowedDataTypes> {
    data: ResponseType;
    meta: Meta;
    error?: Error;
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

export interface Account {
    accountId: string;
    credits: number;
    headquarters: string;
    startingFaction: string;
    symbol: string;
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

// ############################## SHIPYARD ##############################
export interface Shipyard {
    symbol: string;
    shipTypes: ShipType[];
    transactions: Transaction[];
    ships: Ship[];
}

export interface ShipType {
    type: string;
}

export interface Transaction {
    shipSymbol: string;
    waypointSymbol: string;
    agentSymbol: string;
    price: number;
    timestamp: string;
}

export interface Ship {
    type: string;
    name: string;
    description: string;
    purchasePrice: number;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
}

export interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number
    fuelCapacity: number;
    requirements: Requirement;
}

export interface Requirement {
    crew?: number;
    power?: number;
    slots?: number;
}

export interface Reactor {
    symbol: string;
    name: string;
    description: string;
    powerOutput: number;
    requirements: Requirement;
}

export interface Engine {
    symbol: string;
    name: string;
    description: string;
    speed: number;
    requirements: Requirement;
}

interface Module {
    symbol: string;
    name: string;
    description: string;
    requirements: Requirement;
}

export interface CrewQuarter extends Module {
    capacity: number;
}

export interface CargoHold extends Module {
    capacity: number;
}

export interface Refinery extends Module {
    production: string[];
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    requirements: Requirement;
}
export interface Probe extends Mount {
    strength: number;
    deposits: string[];
}

export interface Weapon extends Mount {
}

export interface MiningLaser extends Mount {
    strength: number;
}
