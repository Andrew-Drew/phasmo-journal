var evidence = {
    dots: 1,
    emf: 2,
    fingerprints: 3,
    freezingTemps: 4,
    orbs: 5,
    writing: 6,
    spiritBox: 7
}

var evidenceInfo = {
    [evidence.emf]: {
        displayName: "EMF Level 5",
        nameShort: "EMF"
    },
    [evidence.dots]: {
        displayName: "D.O.T.S. Projector",
        nameShort: "DOTS"
    },
    [evidence.fingerprints]: {
        displayName: "Fingerprints",
        nameShort: "Fingerprints"
    },
    [evidence.orbs]: {
        displayName: "Ghost Orbs",
        nameShort: "Ghost Orbs"
    },
    [evidence.writing]: {
        displayName: "Ghost Writing",
        nameShort: "Writing"
    },
    [evidence.spiritBox]: {
        displayName: "Spirit Box",
        nameShort: "Spirit Box"
    },
    [evidence.freezingTemps]: {
        displayName: "Freezing Temperatures",
        nameShort: "Temperatures"
    }
}

var evidenceItems = []
var evidenceHelper = new EvidenceHelper()
var ghostsFiltered;
var fullInfoThreshold = 5;

var objectives = []

$(function () {
    $("#button-reset-evidence").tooltip()

    setupEvidence()
    setupObjectives()
    reloadGhostList()

    document.getElementById("button-reset-evidence")
        .addEventListener('click', function () {
            this.blur()
            resetEvidence()
        });
});

function resetEvidence() {
    evidenceHelper.clear()
    reloadGhostList()

    for (var evidence of evidenceItems)
        evidence.clear()

    for (var objective of objectives)
        objective.reset()

    document.getElementById("input-ghost-name").value = ""
}

function setResetEvidenceIsVisibile(isVisible) {
    var elem = document.getElementById("button-reset-evidence")
    if (!elem) return;

    if (isVisible) {
        elem.style.visibility = ""
        $(elem).fadeTo("fast", 1)
    } else {
        $(elem).fadeTo("fast", 0, function () {
            this.style.visibility = "hidden"
        })
    }
}

class EvidenceWrapper {
    #type
    #elem
    #checkbox

    constructor(type, label, stretch) {
        var elem = document.createElement("div")
        elem.id = "evidence-item-" + type;
        elem.className = stretch ? "evidence-item stretch" : "evidence-item"

        var checkbox = createElement("input", "evidence-item-checkbox")
        checkbox.type = "checkbox"
        checkbox.tabIndex = -1
        checkbox.addEventListener("focusin", checkbox.blur)
        elem.appendChild(checkbox)

        var text = createElement("span", "evidence-item-title")
        text.textContent = label
        elem.appendChild(text)

        var func = this.#actionEvidenceClick.bind(this)
        elem.addEventListener('click', func)

        this.#type = type
        this.#elem = elem
        this.#checkbox = checkbox
    }

    get type() {
        return this.#type
    }

    get element() {
        return this.#elem
    }

    #actionEvidenceClick() {
        var checkbox = this.#checkbox
        if (checkbox.disabled) return;

        if (checkbox.checked) {
            checkbox.checked = false
            checkbox.indeterminate = true
            evidenceHelper.setSelected(this.#type, false)
        } else if (checkbox.indeterminate) {
            checkbox.indeterminate = false
            evidenceHelper.remove(this.#type)
        } else {
            checkbox.checked = true
            evidenceHelper.setSelected(this.#type, true)
        }

        reloadGhostList()
    }

    setEnabled(enabled) {
        this.#checkbox.disabled = !enabled
        if (enabled) {
            this.#elem.classList.remove("disabled")
        } else {
            this.#elem.classList.add("disabled")
        }
    }

    clear() {
        this.#checkbox.disabled = false
        this.#checkbox.checked = false
        this.#checkbox.indeterminate = false
    }
}

class ToggleButton {
    #button
    #onChange

    #state
    #allowIndeterminate

    constructor(text, tooltip, allowIndeterminate, onChange) {
        var button = document.createElement("button")
        button.className = "toggle-button btn btn-outline-info"
        button.type = "button"
        button.textContent = text

        if (tooltip) {
            button.dataset.toggle = "tooltip"
            button.title = tooltip
            $(button).tooltip()
        }

        var func = this.#actionButtonClick.bind(this)
        button.addEventListener('click', func)

        this.#button = button
        this.#state = false
        this.#allowIndeterminate = !!allowIndeterminate
    }

    get rootElement() {
        return this.#button
    }

    /**
     * @param {function} value
     */
    set onChange(value) {
        if (typeof value === "function")
            this.#onChange = value
    }

    reset() {
        this.#state = false
        this.#button.className = "toggle-button btn btn-outline-info"
        this.#notifyOnChange()
    }

    #actionButtonClick() {
        this.#button.blur()
        if (this.#state === false) {
            this.#state = true
            this.#button.className = "toggle-button btn btn-primary"
        } else if (this.#state !== true || !this.#allowIndeterminate) {
            this.#state = false
            this.#button.className = "toggle-button btn btn-outline-info"
        } else {
            this.#state = null
            this.#button.className = "toggle-button btn btn-success completed"
        }

        this.#notifyOnChange()
    }

    #notifyOnChange() {
        if (this.#onChange) this.#onChange.call(this, this.#state)
    }
}

function setupEvidence() {
    var frag = document.createDocumentFragment()
    addEvidence(frag, evidence.emf, "EMF Level 5")
    addEvidence(frag, evidence.dots, "D.O.T.S. Projector")
    addEvidence(frag, evidence.fingerprints, "Fingerprints")
    addEvidence(frag, evidence.orbs, "Ghost Orbs")
    addEvidence(frag, evidence.writing, "Ghost Writing")
    addEvidence(frag, evidence.spiritBox, "Spirit Box")
    addEvidence(frag, evidence.freezingTemps, "Freezing Temperatures", true)

    var wrapper = document.getElementById("evidence-wrapper")
    wrapper.appendChild(frag)
}

function addEvidence(wrapper, id, label, stretch) {
    var evidence = new EvidenceWrapper(id, label, stretch)
    wrapper.appendChild(evidence.element)
    evidenceItems.push(evidence)
}

function setupObjectives() {
    var frag = document.createDocumentFragment()
    addObjective(frag, "Crucifix", "Prevent the ghost from hunting with a Crucifix")
    addObjective(frag, "Motion sensor", "Detect a ghost's presence with a Motion Sensor")
    addObjective(frag, "Ghost event", "Have a member of your team witness a Ghost event")
    addObjective(frag, "Ghost photo", "Capture a photo of the ghost")
    addObjective(frag, "EMF", "Find evidence of paranormal activity with an EMF Reader")
    addObjective(frag, "Smudge sticks", "Cleanse the area near the ghost using Smudge Sticks")
    addObjective(frag, "Candle", "Get the Ghost to blow out a Candle")
    addObjective(frag, "Salt", "Get a Ghost to walk through Salt")
    addObjective(frag, "Average sanity", "Get an average sanity below 25%")
    addObjective(frag, "Hunt", "Have a member of the team escape the Ghost during a Hunt")
    addObjective(frag, "Repel", "Repel the Ghost with a Smudge Stick while it's chasing someone")

    var wrapper = document.getElementById("objectives-wrapper")
    wrapper.appendChild(frag)
}

function addObjective(wrapper, label, tooltip) {
    var objective = new ToggleButton(label, tooltip, true)
    wrapper.appendChild(objective.rootElement)
    objectives.push(objective)
}

function reloadGhostList() {
    applyEvidenceFilter()

    var listFrag = document.createDocumentFragment()
    for (const ghost of ghostsFiltered) {
        var elem = createGhostItem(ghost)
        listFrag.appendChild(elem)
    }

    var wrapper = document.getElementById("ghosts-wrapper")
    wrapper.innerHTML = ""
    wrapper.appendChild(listFrag)
}

function applyEvidenceFilter() {
    if (evidenceHelper.countTotal === 0) {
        ghostsFiltered = ghosts
        for (var evidence of evidenceItems)
            evidence.setEnabled(true)
        return
    }

    var enabledEvidence = {};
    var filteredList = [];
    for (const ghost of ghosts) {
        var result = applyFilter(ghost);
        if (!result.isMatch) continue;

        if (result.matchedDisabled.length === 0) {
            filteredList.push(ghost)
            for (const evidence of ghost.evidence)
                enabledEvidence[evidence] = true;
        } else {
            for (const evidence of result.matchedDisabled)
                enabledEvidence[evidence] = true;
        }
    }

    for (const wrapper of evidenceItems)
        wrapper.setEnabled(!!enabledEvidence[wrapper.type]);

    ghostsFiltered = filteredList
}

function applyFilter(ghost) {
    var matchedDisabled = [];
    var count = 0
    for (const type of ghost.evidence) {
        var status = evidenceHelper.getState(type)
        if (status === false) matchedDisabled.push(type);
        else if (status === true) count++;
    }

    return {
        isMatch: count === evidenceHelper.countAllowed,
        matchedDisabled: matchedDisabled
    };
}

function createElement(name, className) {
    var elem = document.createElement(name)
    elem.className = className
    return elem;
}

function createGhostItem(ghost) {
    var portlet = createElement("div", "portlet portlet-rounded ghost-item")

    var header = createGhostItemHeader(ghost)
    portlet.appendChild(header)

    var body = createGhostItemBody(ghost)
    portlet.appendChild(body)

    var footer = createElement("div", "portlet-footer")
    portlet.appendChild(footer)

    var span = createElement("div", "text-muted")
    span.textContent = "Can hunt below " + ghost.sanityThreshold + "% average sanity"
    footer.appendChild(span)

    bindGhostItemEvents(ghost, portlet)

    return portlet;
}

function createGhostItemHeader(ghost) {
    var header = createElement("div", "portlet-header")

    var tempElem = createElement("div", "portlet-header-title")
    tempElem.textContent = ghost.name
    header.appendChild(tempElem)

    var tools = createElement("div", "portlet-header-tools")
    header.appendChild(tools)

    tempElem = createElement("a", "simple-link")
    tempElem.href = ghost.wikiUrl
    tempElem.textContent = "wiki"
    tempElem.target = "_blank"
    tools.appendChild(tempElem)

    return header
}

function createGhostItemBody(ghost) {
    var portletBody = createElement("div", "portlet-body")
    var showAllInfo = ghostsFiltered.length <= fullInfoThreshold

    createGhostItemEvidence(portletBody, ghost)
    createGhostItemSection(portletBody, "Strengths: ", ghost.strengthsShort)
    createGhostItemSection(portletBody, "Weaknesses: ", ghost.weaknessesShort)

    if (showAllInfo) {
        if (ghost.abilitiesShort && ghost.abilitiesShort.length > 0)
            createGhostItemSection(portletBody, "Abilities: ", ghost.abilitiesShort)

        if (ghost.notes && ghost.notes.length > 0)
            createGhostItemSectionUl(portletBody, "Notes:", ghost.notes)
    }

    return portletBody
}

function createGhostItemEvidence(parent, ghost) {
    var wrapper = createElement("div", "mb-2 ghost-item-evidence")

    for (var i = 0, len = ghost.evidence.length; i < len; i++) {
        var evidenceId = ghost.evidence[i]
        var info = evidenceInfo[evidenceId]

        var item = document.createElement("div")
        item.textContent = info.nameShort
        item.className = evidenceHelper.getState(evidenceId)
            ? "text-success" : "text-muted"
        wrapper.appendChild(item)
    }

    parent.appendChild(wrapper)
}

function createGhostItemSection(parent, title, data) {
    var wrapper = createElement("div", "mb-2")

    var strong = document.createElement("strong")
    strong.textContent = title
    wrapper.appendChild(strong)

    var text = data && data.length > 0 ? data.join(" ") : "none"
    wrapper.appendChild(document.createTextNode(text))

    parent.appendChild(wrapper)
}

function createGhostItemSectionUl(parent, title, data) {
    var wrapper = createElement("div", "mb-2")

    var strong = document.createElement("strong")
    strong.textContent = title
    wrapper.appendChild(strong)

    if (data && data.length > 0) {
        var ul = document.createElement("ul")
        for (var i = 0, len = data.length; i < len; i++) {
            var li = document.createElement("li")
            li.textContent = data[i]
            ul.appendChild(li)
        }

        wrapper.appendChild(ul)
    } else {
        wrapper.appendChild(document.createTextNode(" none"))
    }

    parent.appendChild(wrapper)
}

function bindGhostItemEvents(ghost, portlet) {
    var evidence = ghost.evidence

    portlet.addEventListener('mouseenter', function () {
        for (var i = 0, len = evidence.length; i < len; i++) {
            var elem = document.getElementById("evidence-item-" + evidence[i])
            if (elem) elem.classList.add("border-primary")
        }
    });

    portlet.addEventListener('mouseleave', function () {
        for (var i = 0, len = evidence.length; i < len; i++) {
            var elem = document.getElementById("evidence-item-" + evidence[i])
            if (elem) elem.classList.remove("border-primary")
        }
    });
}
