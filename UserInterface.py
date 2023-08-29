import tkinter as tk

from Model.Contract import ContractManager
from Model.Waypoint import WaypointManager

class UserInterface:
    def __init__(self) -> None:
        pass

    def print_ui(self):
        print("Press the following keys to navigate the UI:")
        print("\t1: View contracts")
        print("\t2: Accept contracts")
        print("\t3: waypoint info for current Waypoint: X1-QB20-61050B")
        print("\t4: waypoint info for current System: X1-QB20")


    def get_ui_event():
        value = input("Enter a value: ")
        
        match value:
            case "1":
                print("View contracts")
            case "2":
                print("Accept contracts")
            case "3":
                print("waypoint info for current Waypoint: X1-QB20-61050B")
            case "4":
                print("waypoint info for current System: X1-QB20")
            case _:
                print("Invalid input")

if __name__ == "__main__":
    ui = UserInterface()
    ui.print_ui()
    pass
