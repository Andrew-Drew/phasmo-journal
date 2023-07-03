/* eslint-disable @typescript-eslint/no-unused-vars */

const evidenceInfo: Record<EvidenceType, Evidence> = {
    [EvidenceType.Emf]: {
        displayName: 'EMF Level 5',
        nameShort: 'EMF'
    },
    [EvidenceType.Dots]: {
        displayName: 'D.O.T.S. Projector',
        nameShort: 'DOTS'
    },
    [EvidenceType.Fingerprints]: {
        displayName: 'Fingerprints',
        nameShort: 'Fingerprints'
    },
    [EvidenceType.Orbs]: {
        displayName: 'Ghost Orbs',
        nameShort: 'Ghost Orbs'
    },
    [EvidenceType.Writing]: {
        displayName: 'Ghost Writing',
        nameShort: 'Writing'
    },
    [EvidenceType.SpiritBox]: {
        displayName: 'Spirit Box',
        nameShort: 'Spirit Box'
    },
    [EvidenceType.FreezingTemps]: {
        displayName: 'Freezing Temperatures',
        nameShort: 'Temperatures'
    }
}

const evidenceItems: EvidenceWrapper[] = []
const evidenceHelper = new EvidenceHelper()
let ghostsFiltered: Ghost[]
const fullInfoThreshold = 5

const objectives: ToggleButton[] = []

$(function () {
    $('#button-reset-evidence').tooltip()

    setupEvidence()
    setupObjectives()
    reloadGhostList()

    const resetButton = document.getElementById('button-reset-evidence')
    resetButton?.addEventListener('click', function () {
        this.blur()
        resetEvidence()
    })
})

function resetEvidence(): void {
    evidenceHelper.clear()
    reloadGhostList()

    for (const evidence of evidenceItems)
        evidence.clear()

    for (const objective of objectives)
        objective.reset()

    const input = document.getElementById('input-ghost-name') as HTMLInputElement | null
    if (input != null) input.value = ''
}

function setResetEvidenceIsVisible(isVisible: boolean): void {
    const elem = document.getElementById('button-reset-evidence')
    if (!elem) return

    if (isVisible) {
        elem.style.visibility = ''
        $(elem).fadeTo('fast', 1)
    } else {
        $(elem).fadeTo('fast', 0, function () {
            this.style.visibility = 'hidden'
        })
    }
}

class EvidenceWrapper {
    private readonly _type: EvidenceType
    private readonly _elem: HTMLDivElement
    private readonly _checkbox: HTMLInputElement

    constructor(type: EvidenceType, label: string, stretch?: boolean) {
        const elem = document.createElement('div')
        elem.id = 'evidence-item-' + type.toString()
        elem.className = stretch != null && stretch ? 'evidence-item stretch' : 'evidence-item'

        const checkbox = createElement('input', 'evidence-item-checkbox')
        checkbox.type = 'checkbox'
        checkbox.tabIndex = -1
        checkbox.addEventListener('focusin', checkbox.blur)
        elem.appendChild(checkbox)

        const text = createElement('span', 'evidence-item-title')
        text.textContent = label
        elem.appendChild(text)

        const func = this.actionEvidenceClick.bind(this)
        elem.addEventListener('click', func)

        this._type = type
        this._elem = elem
        this._checkbox = checkbox
    }

    get type(): EvidenceType {
        return this._type
    }

    get element(): HTMLDivElement {
        return this._elem
    }

    private actionEvidenceClick(): void {
        const checkbox = this._checkbox
        if (checkbox.disabled) return

        if (checkbox.checked) {
            checkbox.checked = false
            checkbox.indeterminate = true
            evidenceHelper.setSelected(this._type, false)
        } else if (checkbox.indeterminate) {
            checkbox.indeterminate = false
            evidenceHelper.remove(this._type)
        } else {
            checkbox.checked = true
            evidenceHelper.setSelected(this._type, true)
        }

        reloadGhostList()
    }

    setEnabled(enabled: boolean): void {
        this._checkbox.disabled = !enabled
        if (enabled)
            this._elem.classList.remove('disabled')
        else
            this._elem.classList.add('disabled')
    }

    clear(): void {
        this._checkbox.disabled = false
        this._checkbox.checked = false
        this._checkbox.indeterminate = false
    }
}

class ToggleButton {
    private readonly _button: HTMLButtonElement
    private _onChange?: (state: boolean | null) => void

    private _state: boolean | null
    private readonly _allowIndeterminate: boolean

    constructor(text: string, tooltip: string, allowIndeterminate: boolean, onChange?: (state: boolean | null) => void) {
        const button = document.createElement('button')
        button.className = 'toggle-button btn btn-outline-info'
        button.type = 'button'
        button.textContent = text

        if (tooltip) {
            button.dataset.toggle = 'tooltip'
            button.title = tooltip
            $(button).tooltip()
        }

        const func = this.actionButtonClick.bind(this)
        button.addEventListener('click', func)

        this._button = button
        this._onChange = onChange
        this._state = false
        this._allowIndeterminate = allowIndeterminate
    }

    get rootElement(): HTMLButtonElement {
        return this._button
    }

    // eslint-disable-next-line accessor-pairs
    set onChange(value: (state: boolean | null) => void) {
        if (typeof value === 'function')
            this._onChange = value
    }

    reset(): void {
        this._state = false
        this._button.className = 'toggle-button btn btn-outline-info'
        this.notifyOnChange()
    }

    private actionButtonClick(): void {
        this._button.blur()
        if (this._state === false) {
            this._state = true
            this._button.className = 'toggle-button btn btn-primary'
        } else if (this._state == null || !this._allowIndeterminate) {
            this._state = false
            this._button.className = 'toggle-button btn btn-outline-info'
        } else {
            this._state = null
            this._button.className = 'toggle-button btn btn-success completed'
        }

        this.notifyOnChange()
    }

    private notifyOnChange(): void {
        if (this._onChange) this._onChange(this._state)
    }
}

function setupEvidence(): void {
    const frag = document.createDocumentFragment()
    addEvidence(frag, EvidenceType.Emf, 'EMF Level 5')
    addEvidence(frag, EvidenceType.Dots, 'D.O.T.S. Projector')
    addEvidence(frag, EvidenceType.Fingerprints, 'Fingerprints')
    addEvidence(frag, EvidenceType.Orbs, 'Ghost Orbs')
    addEvidence(frag, EvidenceType.Writing, 'Ghost Writing')
    addEvidence(frag, EvidenceType.SpiritBox, 'Spirit Box')
    addEvidence(frag, EvidenceType.FreezingTemps, 'Freezing Temperatures', true)

    const wrapper = document.getElementById('evidence-wrapper')
    wrapper?.appendChild(frag)
}

function addEvidence(wrapper: DocumentFragment, id: number, label: string, stretch?: boolean): void {
    const evidence = new EvidenceWrapper(id, label, stretch)
    wrapper.appendChild(evidence.element)
    evidenceItems.push(evidence)
}

function setupObjectives(): void {
    const frag = document.createDocumentFragment()
    addObjective(frag, 'Crucifix', 'Prevent the ghost from hunting with a Crucifix')
    addObjective(frag, 'Motion sensor', "Detect a ghost's presence with a Motion Sensor")
    addObjective(frag, 'Ghost event', 'Have a member of your team witness a Ghost event')
    addObjective(frag, 'Ghost photo', 'Capture a photo of the ghost')
    addObjective(frag, 'EMF', 'Find evidence of paranormal activity with an EMF Reader')
    addObjective(frag, 'Smudge sticks', 'Cleanse the area near the ghost using Smudge Sticks')
    addObjective(frag, 'Candle', 'Get the Ghost to blow out a Candle')
    addObjective(frag, 'Salt', 'Get a Ghost to walk through Salt')
    addObjective(frag, 'Average sanity', 'Get an average sanity below 25%')
    addObjective(frag, 'Hunt', 'Have a member of the team escape the Ghost during a Hunt')
    addObjective(frag, 'Repel', "Repel the Ghost with a Smudge Stick while it's chasing someone")

    const wrapper = document.getElementById('objectives-wrapper')
    wrapper?.appendChild(frag)
}

function addObjective(wrapper: DocumentFragment, label: string, tooltip: string): void {
    const objective = new ToggleButton(label, tooltip, true)
    wrapper.appendChild(objective.rootElement)
    objectives.push(objective)
}

function reloadGhostList(): void {
    applyEvidenceFilter()

    const listFrag = document.createDocumentFragment()
    for (const ghost of ghostsFiltered) {
        const elem = createGhostItem(ghost)
        listFrag.appendChild(elem)
    }

    const wrapper = document.getElementById('ghosts-wrapper')
    if (wrapper != null) {
        wrapper.innerHTML = ''
        wrapper.appendChild(listFrag)
    }
}

function applyEvidenceFilter(): void {
    if (evidenceHelper.countTotal === 0) {
        ghostsFiltered = ghosts
        for (const evidence of evidenceItems)
            evidence.setEnabled(true)
        return
    }

    const enabledEvidence = new Set<EvidenceType>()
    const filteredList = []
    for (const ghost of ghosts) {
        const result = applyFilter(ghost)
        if (!result.isMatch) continue

        if (result.matchedDisabled.length === 0) {
            filteredList.push(ghost)
            for (const evidence of ghost.evidence)
                enabledEvidence.add(evidence)
        } else {
            for (const evidence of result.matchedDisabled)
                enabledEvidence.add(evidence)
        }
    }

    for (const wrapper of evidenceItems) {
        const hasValue = enabledEvidence.has(wrapper.type)
        wrapper.setEnabled(hasValue)
    }

    ghostsFiltered = filteredList
}

interface FilterResult {
    isMatch: boolean
    matchedDisabled: EvidenceType[]
}

function applyFilter(ghost: Ghost): FilterResult {
    const matchedDisabled: EvidenceType[] = []
    let count = 0
    for (const type of ghost.evidence) {
        const status = evidenceHelper.getState(type)
        if (status === false) matchedDisabled.push(type)
        else if (status === true) count++
    }

    return {
        isMatch: count === evidenceHelper.countAllowed,
        matchedDisabled
    }
}

function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, className: string): HTMLElementTagNameMap[K] {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function createGhostItem(ghost: Ghost): HTMLDivElement {
    const portlet = createElement('div', 'portlet portlet-rounded ghost-item')

    const header = createGhostItemHeader(ghost)
    portlet.appendChild(header)

    const body = createGhostItemBody(ghost)
    portlet.appendChild(body)

    const footer = createElement('div', 'portlet-footer')
    portlet.appendChild(footer)

    const span = createElement('div', 'text-muted')
    span.textContent = `Can hunt below ${ghost.sanityThreshold}% average sanity`
    footer.appendChild(span)

    bindGhostItemEvents(ghost, portlet)

    return portlet
}

function createGhostItemHeader(ghost: Ghost): HTMLDivElement {
    const header = createElement('div', 'portlet-header')

    const title = createElement('div', 'portlet-header-title')
    title.textContent = ghost.name
    header.appendChild(title)

    const tools = createElement('div', 'portlet-header-tools')
    header.appendChild(tools)

    const anchor = createElement('a', 'simple-link')
    anchor.href = ghost.wikiUrl
    anchor.textContent = 'wiki'
    anchor.target = '_blank'
    tools.appendChild(anchor)

    return header
}

function createGhostItemBody(ghost: Ghost): HTMLDivElement {
    const portletBody = createElement('div', 'portlet-body')
    const showAllInfo = ghostsFiltered.length <= fullInfoThreshold

    createGhostItemEvidence(portletBody, ghost)
    createGhostItemSection(portletBody, 'Strengths: ', ghost.strengthsShort)
    createGhostItemSection(portletBody, 'Weaknesses: ', ghost.weaknessesShort)

    if (showAllInfo) {
        if (ghost.abilitiesShort && ghost.abilitiesShort.length > 0)
            createGhostItemSection(portletBody, 'Abilities: ', ghost.abilitiesShort)

        if (ghost.notes && ghost.notes.length > 0)
            createGhostItemSectionUl(portletBody, 'Notes:', ghost.notes)
    }

    return portletBody
}

function createGhostItemEvidence(parent: Node, ghost: Ghost): void {
    const wrapper = createElement('div', 'mb-2 ghost-item-evidence')

    for (let i = 0, len = ghost.evidence.length; i < len; i++) {
        const evidenceId = ghost.evidence[i]
        const info = evidenceInfo[evidenceId]

        const state = evidenceHelper.getState(evidenceId)
        const item = document.createElement('div')
        item.textContent = info.nameShort
        item.className = state === true
            ? 'text-success'
            : 'text-muted'
        wrapper.appendChild(item)
    }

    parent.appendChild(wrapper)
}

function createGhostItemSection(parent: Node, title: string, data: string[] | null): void {
    const wrapper = createElement('div', 'mb-2')

    const strong = document.createElement('strong')
    strong.textContent = title
    wrapper.appendChild(strong)

    const text = data != null && data.length > 0 ? data.join(' ') : 'none'
    wrapper.appendChild(document.createTextNode(text))

    parent.appendChild(wrapper)
}

function createGhostItemSectionUl(parent: Node, title: string, data: string[] | null): void {
    const wrapper = createElement('div', 'mb-2')

    const strong = document.createElement('strong')
    strong.textContent = title
    wrapper.appendChild(strong)

    if (data != null && data.length > 0) {
        const ul = document.createElement('ul')
        for (let i = 0, len = data.length; i < len; i++) {
            const li = document.createElement('li')
            li.textContent = data[i]
            ul.appendChild(li)
        }

        wrapper.appendChild(ul)
    } else {
        wrapper.appendChild(document.createTextNode(' none'))
    }

    parent.appendChild(wrapper)
}

function bindGhostItemEvents(ghost: Ghost, portlet: HTMLDivElement): void {
    const evidence = ghost.evidence

    portlet.addEventListener('mouseenter', function () {
        for (let i = 0, len = evidence.length; i < len; i++) {
            const elem = document.getElementById('evidence-item-' + evidence[i].toString())
            if (elem) elem.classList.add('border-primary')
        }
    })

    portlet.addEventListener('mouseleave', function () {
        for (let i = 0, len = evidence.length; i < len; i++) {
            const elem = document.getElementById('evidence-item-' + evidence[i].toString())
            if (elem) elem.classList.remove('border-primary')
        }
    })
}
