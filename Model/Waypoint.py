import requests
import json
from types import SimpleNamespace

class WaypointManager:
    
    header = ""
    
    def get_waypoint_info(self, systemSymbol, waypointSymbol=""):
        url = (
            "https://api.spacetraders.io/v2/systems/"
            + systemSymbol
            + "/waypoints/"
            + waypointSymbol
        )
        result = requests.get(url, headers=self.header).json()
        result = json.dumps(result["data"])
        waypoint = json.loads(result, object_hook=lambda d: SimpleNamespace(**d))
        print(waypoint.orbitals[0].symbol)
    
    def __init__(self, header) -> None:
        self.header = header


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
