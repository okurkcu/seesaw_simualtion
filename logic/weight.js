export default class Weight {
    constructor(x, weight, color){
        this.x = x,
        this.weight = weight,
        this.color = color;
    }

    getSize() {
      // Base weight is 34kg. Every kg is adding 4 kg more.
      return 34 + (this.weight - 1) * 4;
    }
}