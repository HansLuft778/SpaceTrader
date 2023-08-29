import tkinter as tk

from Model.Contract import ContractManager
from Model.Waypoint import WaypointManager
from start import SpaceTraders


class UserInterface:
    contractMngr: ContractManager = None
    waypointMngr: WaypointManager = None

    def __init__(
        self, contragtMngr: ContractManager, waypointMngr: WaypointManager
    ) -> None:
        self.contractMngr = contragtMngr
        self.waypointMngr = waypointMngr

        self.menu_options = {
            "1": (self.view_contracts, []),
            "2": (contractMngr.accept_contract),
            "3": waypointMngr.get_waypoint_info,
            "4": waypointMngr.get_waypoint_info,
        }
        
        # TODO: Accepted: 📝, Not accepted: 🟡, Failed: ❌, Fulfilled: ✅
        self.accepted_state = {
            True: "📝",
            False: "🟡"
        }

    def print_ui(self):
        print("Press the following keys to navigate the UI:")
        print("\t1: View contracts")
        print("\t2: Accept contracts")
        print("\t3: waypoint info for current Waypoint: X1-QB20-61050B")
        print("\t4: waypoint info for current System: X1-QB20")

    def view_contracts(self):
        contracts = self.contractMngr.get_contracts()

        for contract in contracts:
            sign = self.accepted_state[contract.accepted]
            print("====================================\n"+ sign + contract.id)
            for delivery in contract.terms.deliver:
                print(
                    "Deliver "
                    + str(delivery.unitsRequired)
                    + " "
                    + str(delivery.tradeSymbol)
                    + " to "
                    + delivery.destinationSymbol
                    + " by "
                    + contract.terms.deadline
                )
            print("====================================")

    def get_ui_event(self):
        value = input("Enter a value: ")

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

    ui = UserInterface(contractMngr, waypointMngr)
    ui.print_ui()
    ui.get_ui_event()
    pass
