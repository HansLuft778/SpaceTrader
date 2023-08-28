import requests
import json

from Contract import *
from Model.Waypoint import Waypoint


class SpaceTraders:
    header = ""

    def register_new_agent():
        url = "https://api.spacetraders.io/v2/register"
        data = {"symbol": "GORG", "faction": "COSMIC"}
        result = requests.post(url, json=data)
        print(result.text)

    def set_header(self):
        with open("token.txt", "r") as f:
            token = f.read()

        self.header = {"Authorization": "Bearer " + str(token)}

    def get_header(self):
        return self.header

    def get_agent_details(self):
        url = "https://api.spacetraders.io/v2/my/agent"
        result = requests.get(url, headers=self.header).json()
        print(result)

    def get_waypoint_info(self, systemSymbol, waypointSymbol = ""):
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


if __name__ == "__main__":
    space_trader = SpaceTraders()
    space_trader.set_header()
    space_trader.get_agent_details()
    space_trader.get_waypoint_info("X1-QB20", "X1-QB20-61050B")
    header = space_trader.get_header()

    contractMngr = ContractManager(header)
    contracts: Contract = contractMngr.get_contracts()

    contractMngr.accept_contract(contracts[0].id)
