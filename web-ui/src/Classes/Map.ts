export class Map {

    private svg: HTMLElement;
    private mapContainer: HTMLDivElement;
    private svgNS: string = "http://www.w3.org/2000/svg";

    private xMin: number;
    private xMax: number;
    private yMin: number;
    private yMax: number;

    constructor(xMin: number, xMax: number, yMin: number, yMax: number) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;

        console.log("xMin: " + this.xMin);
        console.log("xMax: " + this.xMax);
        console.log("yMin: " + this.yMin);
        console.log("yMax: " + this.yMax);

        this.getMapBondaries(true);

        this.svg = document.getElementById("systemMap") as HTMLElement;
        this.mapContainer = document.getElementById("mapContainer") as HTMLDivElement;

        // add event listener for resizing
        window.addEventListener("resize", () => {
            this.resize();
        });

        this.drawMap();
        this.resize();
    }

    private getMapBondaries(option: boolean = true) {
        const xMinAbs = Math.abs(this.xMin);
        const yMinAbs = Math.abs(this.yMin);

        let biggestNumber = 0;

        if (option) {
            // option 1: x-axis and y-axis are the same length, depending on the biggest coordinate from a waypoint
            if (xMinAbs > this.xMax) {
                biggestNumber = xMinAbs;
            } else {
                biggestNumber = this.xMax;
            }
            if (yMinAbs > biggestNumber) {
                biggestNumber = yMinAbs;
            } else {
                biggestNumber = this.yMax;
            }

            console.log("biggestNumber: " + biggestNumber);

            this.xMin = -biggestNumber;
            this.xMax = biggestNumber;
            this.yMin = -biggestNumber;
            this.yMax = biggestNumber;
        } else {
            // option 2: x-axis and y-axis are diffrent length, depending on the corresponding coordinate
            if (xMinAbs > this.xMax) {
                this.xMax = xMinAbs;
            } else {
                this.xMin = -this.xMax;
            }
            if (yMinAbs > this.yMax) {
                this.yMax = yMinAbs;
            } else {
                this.yMin = -this.yMax;
            }
        }

        console.log("new xMin: " + this.xMin);
        console.log("new xMax: " + this.xMax);
        console.log("new yMin: " + this.yMin);
        console.log("new yMax: " + this.yMax);
    }

    private drawMap() {
        this.svg.style.backgroundColor = "lightblue";

        // add x-axis
        const xAxis = document.createElementNS(this.svgNS, "line");
        xAxis.setAttribute("x1", "0%");
        xAxis.setAttribute("y1", "50%");
        xAxis.setAttribute("x2", "100%");
        xAxis.setAttribute("y2", "50%");
        xAxis.setAttribute("stroke", "black");
        xAxis.setAttribute("stroke-width", "1");
        this.svg.appendChild(xAxis);

        // add y-axis
        const yAxis = document.createElementNS(this.svgNS, "line");
        yAxis.setAttribute("x1", "50%");
        yAxis.setAttribute("y1", "0%");
        yAxis.setAttribute("x2", "50%");
        yAxis.setAttribute("y2", "100%");
        yAxis.setAttribute("stroke", "black");
        yAxis.setAttribute("stroke-width", "1");
        this.svg.appendChild(yAxis);
    }

    addWaypoint(x: number, y: number) {
        const containerWidth = this.mapContainer.clientWidth;
        const containerHeight = this.mapContainer.clientHeight;

        // Map the coordinates to the new coordinate system
        const mappedX = (x - this.xMin) / (this.xMax - this.xMin) * containerWidth;
        const mappedY = (y - this.yMin) / (this.yMax - this.yMin) * containerHeight;

        const scaledX = (mappedX / containerWidth) * 100;
        const scaledY = (mappedY / containerHeight) * 100;

        const circle = document.createElementNS(this.svgNS, "circle");
        circle.setAttribute("cx", `${scaledX}%`);
        circle.setAttribute("cy", `${scaledY}%`);
        circle.setAttribute("r", "1.5%");
        circle.setAttribute("fill", "red");
        this.svg.appendChild(circle);
    }



    resize() {
        // resize the entire svg element
        this.svg.setAttribute("width", `${this.mapContainer.clientWidth}`);
        this.svg.setAttribute("height", `${this.mapContainer.clientWidth}`);
    }
}
