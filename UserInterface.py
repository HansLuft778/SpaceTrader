import re

from Model.Contract import ContractManager
from Model.Waypoint import WaypointManager
from start import SpaceTraders


class UserInterface:
    contractMngr: ContractManager = None
    waypointMngr: WaypointManager = None
    spaceTraders: SpaceTraders = None

    def __init__(
        self, contragtMngr: ContractManager, waypointMngr: WaypointManager, spaceTraders: SpaceTraders
    ) -> None:
        self.contractMngr = contragtMngr
        self.waypointMngr = waypointMngr
        self.spaceTraders = spaceTraders

        self.menu_options = {
            "1": (contractMngr.view_contracts, []),
            "2": (contractMngr.accept_contract, []),
            "3": (waypointMngr.view_waypoint_info, [self]),
            "4": waypointMngr.get_waypoint_info,
        }
        

    def print_ui(self):
        print("Press the following keys to navigate the UI:")
        print("\t1: View contracts")
        print("\t2: Accept contract + id")
        print("\t3: waypoint info for current Waypoint: X1-QB20-61050B")
        print("\t4: waypoint info for current System: X1-QB20")
        
        self.get_ui_event()


    def view_waypoint_info(self):
        print("Ender Waypoint Symbol (q to return): ")
        waypointSymbol = input()

        if waypointSymbol == "q":
            self.print_ui()

        # check if input is valid        
        regex = re.compile(r"^[a-zA-Z0-9]+-[a-zA-Z0-9]+-[a-zA-Z0-9]+$")
        if not regex.match(waypointSymbol):
            print("Invalid Waypoint Symbol")
            self.view_waypoint_info()
        
        # get system symbol from waypoint symbol
        regex = re.compile(r"^([a-zA-Z0-9]+)-[a-zA-Z0-9]+")
        system_symbol = regex.match(waypointSymbol).group(1)
        
        self.waypointMngr.get_waypoint_info(system_symbol, waypointSymbol)

    def get_ui_event(self):
        value = input("Enter a value: ")
        
        if value == "":
            self.print_ui()
        
        if value == "q":
            return

        action, args = self.menu_options.get(value, [])
        if action:
            action(*args)
        else:
            print("Invalid input")


if __name__ == "__main__":
    sp = SpaceTraders()
    header = sp.set_header()
    contractMngr = ContractManager(header)
    waypointMngr = WaypointManager(header)

    ui = UserInterface(contractMngr, waypointMngr, sp)
    ui.print_ui()
    
    pass
