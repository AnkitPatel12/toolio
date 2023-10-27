class Item {
    constructor(name, price, quantity, unit, details, capacity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
        this.details = details;
        this.capacity = capacity;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    getUnit() {
        return this.unit;
    }

    getDetails() {
        return this.details;
    }

    getCapacity() {
        return this.capacity;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    setDetails(details) {
        this.details = details;
    }

    setCapacity(capacity) {
        this.capacity = capacity;
    }
}

 