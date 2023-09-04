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
    modules: IModule[];
    mounts: Mount[];
}

export interface ShipOwned extends Ship {
    symbol?: string;
    nav?: Nav;
    ceww?: Crew;
    fuel?: Fuel;
    registration?: Registration;
    cargo?: Cargo;
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

export interface IModule {
    symbol: string;
    name: string;
    description: string;
    requirements: Requirement;

    capacity?: number;
    production?: string[];
    rage?: number;
}

export interface CrewQuarter extends IModule {
    capacity: number;
}

export interface CargoHold extends IModule {
    capacity: number;
}

export interface Refinery extends IModule {
    production: string[];
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    requirements: Requirement;

    strength?: number;
    deposits?: string[];
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

export interface Registration {
    name: string;
    factionSymbol: string;
    role: string;
}

export interface Cargo {
    capacity: number;
    units: number;
    inventory: Inventory[];
}

export interface Inventory {
}