class Trait:
    symbol: str
    name: str
    description: str

    def __init__(self, name, description, symbol) -> None:
        self.name = name
        self.description = description
        self.symbol = symbol


class Waypoint:
    systemSymbol: str
    symbol: str
    type: str

    x: int
    y: int

    orbitals: list

    traits: list[Trait]

    def __init__(self, systemSymbol, symbol, type, x, y, orbitals, traits) -> None:
        self.systemSymbol = systemSymbol
        self.symbol = symbol
        self.type = type
        self.x = x
        self.y = y
        self.orbitals = orbitals
        self.traits = traits
