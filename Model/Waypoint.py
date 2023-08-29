import requests
import json
import re
from types import SimpleNamespace

class WaypointManager:
    
    header = ""

    def __init__(self, header) -> None:
        self.header = header

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
        
    def view_waypoint_info(self, ui):
        print("Ender Waypoint Symbol (q to return): ")
        waypointSymbol = input()

        if waypointSymbol == "q":
            ui.print_ui()

        # check if input is valid        
        regex = re.compile(r"^[a-zA-Z0-9]+-[a-zA-Z0-9]+-[a-zA-Z0-9]+$")
        if not regex.match(waypointSymbol):
            print("Invalid Waypoint Symbol")
            self.view_waypoint_info(ui)
        
        # get system symbol from waypoint symbol
        regex = re.compile(r"^([a-zA-Z0-9]+)-[a-zA-Z0-9]+")
        system_symbol = regex.match(waypointSymbol).group(1)
        
        self.get_waypoint_info(system_symbol, waypointSymbol)
    



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
