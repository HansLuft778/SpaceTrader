"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentData = void 0;
const ListCard_js_1 = require("./Classes/ListCard.js");
function getAgentData() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
            },
        };
        const result = yield fetch('https://api.spacetraders.io/v2/my/agent', options)
            .then(response => response.json());
        console.log(result);
        if (result.error) {
            return;
        }
        const agentDataDiv = document.getElementById("AgentDataDiv");
        const agent = result.data;
        const agentCard = new ListCard_js_1.ListCard(true);
        agentCard.renderCardAndAppendTo(agentDataDiv);
        agentCard.appendListText("Call sign: " + agent.symbol);
        agentCard.appendListText("Credits: " + agent.credits);
        agentCard.appendListText("Headquarters: " + agent.headquarters);
        agentCard.appendListText("Faction: " + agent.startingFaction);
    });
}
exports.getAgentData = getAgentData;
//# sourceMappingURL=index.js.map