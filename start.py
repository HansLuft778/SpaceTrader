import requests
import json

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
        
        self.header = {'Authorization': "Bearer " + str(token)}

    def get_details(self):
        url = "https://api.spacetraders.io/v2/my/agent"
        result = requests.get(url, headers=self.header).json()
        print(result)
        
        
    def get_starting_waypoint(self):
        url = 'https://api.spacetraders.io/v2/systems/X1/waypoints/X1-QB20-61050B'
        result = requests.get(url, headers=self.header).json()
        print(result)

    def get_contracts(self):
        url = 'https://api.spacetraders.io/v2/my/contracts'
        result = requests.get(url, headers=self.header).text  # Get the response text
        result_dict = json.loads(result) 
        result_with_double_quotes = result_dict.replace("'", "\"")
        print(result_with_double_quotes)
    
    def accept_contract(self, contract_id):
        url = 'https://api.spacetraders.io/v2/my/contracts/' + str(contract_id) + '/accept'
        result = requests.put(url, headers=self.header).json()
        print(result)

if __name__ == "__main__":
    space_trader = SpaceTraders()
    space_trader.set_header()
    # space_trader.get_details(token)
    # space_trader.get_starting_waypoint(token)
    space_trader.get_contracts()