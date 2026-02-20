export default class Preview {
    constructor(container) {
        this.container = container;

        this.previewElement = null;
        this.previewLine = null;
        this.weight = null;
    }

    // Function for generating preview weight
    generate(weight) {
        this.weight = weight;
        this.remove();

        // Generating the preview weight
        this.previewElement = document.createElement('div');
        const size = weight.getSize();

        this.previewElement.style.width = `${size}px`;
        this.previewElement.style.height = `${size}px`;
        this.previewElement.style.backgroundColor = weight.color;
        this.previewElement.style.borderRadius = "50%";
        this.previewElement.style.opacity = "0.5";
        this.previewElement.style.position = "absolute";
        this.previewElement.style.pointerEvents = "none";
        this.previewElement.style.top = "40%";
        this.previewElement.style.transform = "translate(-50%, -50%)";
        this.previewElement.style.display = "none";
        this.previewElement.style.zIndex = "10";
        this.previewElement.style.alignItems = "center"; 
        this.previewElement.style.justifyContent = "center";
        this.previewElement.style.fontWeight = "bold";
        this.previewElement.style.color = "#fff";
        this.previewElement.textContent = `${weight.weight}kg`;

        this.container.appendChild(this.previewElement);

        // Generating the preview line
        this.previewLine = document.createElement("div");

        this.previewLine.style.width = "2px";
        this.previewLine.style.height = "10%";
        this.previewLine.style.opacity = "0.3";
        this.previewLine.style.backgroundColor = weight.color;
        this.previewLine.style.position = "absolute";
        this.previewLine.style.pointerEvents = "none";
        this.previewLine.style.top = "40%";
        this.previewLine.style.transform = "translateX(-50%)";
        this.previewLine.style.display = "none";
        this.previewLine.style.zIndex = "0";

        this.container.appendChild(this.previewLine);
    }

    // Update X-Axis on mouse move
    updatePosX(posX) {
        if (!this.previewElement || !this.previewLine) {
            return;
        }

        this.previewElement.style.left = `${posX}px`;
        this.previewLine.style.left = `${posX}px`;

        if(this.weight) {
            this.weight.x = posX;
        }
    }

    show() {
        if (this.previewElement) {
            this.previewElement.style.display = "flex";
        }
            
        if (this.previewLine) {
            this.previewLine.style.display = "block";
        } 
    }

    hide() {
        if (this.previewElement) {
            this.previewElement.style.display = "none";
        } 

        if (this.previewLine) {
            this.previewLine.style.display = "none";
        }
    }

    remove() {
        if(this.previewElement) {
            this.previewElement.remove();
        }

        if(this.previewLine) {
            this.previewLine.remove();
        }

        this.previewElement = null;
        this.previewLine = null;
    }
}