class EvidenceHelper {
    #data = {}
    #countTotal = 0
    #countAllowed = 0

    get countTotal() {
        return this.#countTotal
    }

    get countAllowed() {
        return this.#countAllowed
    }

    setSelected(type, isAllowed) {
        var hasVal = this.#data.hasOwnProperty(type);
        if (!hasVal) {
            this.#countTotal++;
            if (isAllowed) this.#countAllowed++;
        } else if (this.#data[type] !== isAllowed) {
            if (isAllowed) this.#countAllowed++;
            else this.#countAllowed--;
        }

        this.#data[type] = !!isAllowed;
    }

    remove(type) {
        if (!this.#data.hasOwnProperty(type)) return;

        if (this.#data[type] === true) this.#countAllowed--;
        this.#countTotal--;
        delete this.#data[type]
    }

    contains(type) {
        return this.#data.hasOwnProperty(type)
    }

    getState(type) {
        return this.#data[type]
    }

    clear() {
        this.#data = {}
        this.#countTotal = 0
        this.#countAllowed = 0
    }
}
