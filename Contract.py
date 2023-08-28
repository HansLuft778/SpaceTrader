import requests
import json
from types import SimpleNamespace


class ContractManager:
    header = ""

    def __init__(self, header) -> None:
        self.header = header

    def get_contracts(self):
        url = "https://api.spacetraders.io/v2/my/contracts"
        result = requests.get(url, headers=self.header).json()  # Get the response text
        result = json.dumps(result["data"])  # Convert the response text to a string
        contract = json.loads(result, object_hook=lambda d: SimpleNamespace(**d))
        return contract

    def accept_contract(self, contract_id):
        url = (
            "https://api.spacetraders.io/v2/my/contracts/"
            + str(contract_id)
            + "/accept"
        )
        result = requests.put(url, headers=self.header).json()
        print(result)


class Payment:
    onAccepted: int
    onFulfilled: int

    def __init__(self, onAccepted, onFulfilled) -> None:
        self.onAccepted = onAccepted
        self.onFulfilled = onFulfilled


class Deliver:
    tradeSymbol: str
    destinationSymbol: str
    unitsRequired: int
    unitsFulfilled: int

    def __init__(
        self, tradeSymbol, destinationSymbol, unitsRequired, unitsFulfilled
    ) -> None:
        self.tradeSymbol = tradeSymbol
        self.destinationSymbol = destinationSymbol
        self.unitsRequired = unitsRequired
        self.unitsFulfilled = unitsFulfilled


class Terms:
    deadline: str
    payment: Payment
    deliver: Deliver

    def __init__(self, deadline, payment, deliver) -> None:
        self.deadline = deadline
        self.payment = payment
        self.deliver = deliver


class Contract:
    id: str
    factionSymbol: str
    type: str
    terms: Terms
    accepted: bool
    fulfilled: bool
    expiration: str
    deadlineToAccept: str

    def __init__(
        self,
        id,
        factionSymbol,
        type,
        terms,
        accepted,
        fulfilled,
        expiration,
        deadlineToAccept,
    ) -> None:
        self.id = id
        self.factionSymbol = factionSymbol
        self.type = type
        self.terms = terms
        self.accepted = accepted
        self.fulfilled = fulfilled
        self.expiration = expiration
        self.deadlineToAccept = deadlineToAccept