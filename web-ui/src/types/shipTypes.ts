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

    symbol?: string;
    nav?: Nav;
    ceww?: Crew;
    fuel?: Fuel;
}

export interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number
    fuelCapacity: number;
    requirements: Requirement;
    condition?: number;
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
    condition?: number;
}

export interface Engine {
    symbol: string;
    name: string;
    description: string;
    speed: number;
    requirements: Requirement;
    condition?: number;
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

export interface Nav {
    systemSymbol: string;
    waypointSymbol: string;
    route: Route;
    status: string;
    flightMode: string;
}

export interface Route {
    departure: Departure;
    destination: Destination;
    arrival: string;
    departureTime: string;
}

export interface Departure {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
}

export interface Destination {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
}

export interface Crew {
    current: number;
    capacity: number;
    required: number;
    rotation: string;
    morale: number;
    wages: number;
}

export interface Fuel {
    current: number;
    capacity: number;
    consumed: Consumption;
}

export interface Consumption {
    amount: number;
    timestamp: string;
}