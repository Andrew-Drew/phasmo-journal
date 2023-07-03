/* eslint-disable @typescript-eslint/no-unused-vars */

class EvidenceHelper {
    #data = new Map<EvidenceType, boolean>()
    #countTotal = 0
    #countAllowed = 0

    get countTotal(): number {
        return this.#countTotal
    }

    get countAllowed(): number {
        return this.#countAllowed
    }

    setSelected(type: EvidenceType, isAllowed: boolean): void {
        const hasVal = this.#data.has(type)
        if (!hasVal) {
            this.#countTotal++
            if (isAllowed) this.#countAllowed++
        } else if (this.#data.get(type) !== isAllowed) {
            if (isAllowed) this.#countAllowed++
            else this.#countAllowed--
        }

        this.#data.set(type, !!isAllowed)
    }

    remove(type: EvidenceType): void {
        if (!this.#data.has(type)) return

        if (this.#data.get(type) === true) this.#countAllowed--
        this.#countTotal--
        this.#data.delete(type)
    }

    contains(type: EvidenceType): boolean {
        return this.#data.has(type)
    }

    getState(type: EvidenceType): boolean | undefined {
        return this.#data.get(type)
    }

    clear(): void {
        this.#data.clear()
        this.#countTotal = 0
        this.#countAllowed = 0
    }
}
