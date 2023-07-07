/* eslint-disable @typescript-eslint/no-unused-vars */

const ghosts: Ghost[] = [
    {
        name: 'Banshee',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Banshee',
        sanityThreshold: 50,
        strengthsShort: [
            'Focuses on the same player until that player is killed or has left the game.'
        ],
        abilitiesShort: [
            'When it performs a singing event near its target, they will have an additional 5% sanity drop on top of the standard sanity drain.'
        ],
        weaknessesShort: [
            'Has a chance of making a unique shriek\u2011like paranormal sound on a parabolic microphone.'
        ],
        notes: [
            'Banshees prefer singing ghost events over other types of ghost events.',
            'Only checks the sanity level of the target player when attempting to hunt.',
            'If the target is inside the investigation area during a hunt, the Banshee will ignore all other players.',
            'A Banshee will still attack other players if the target is outside of the investigation area.'
        ],
        evidence: [
            EvidenceType.Fingerprints,
            EvidenceType.Orbs,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Demon',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Demon',
        sanityThreshold: 70,
        strengthsShort: [
            'Demons are aggressive and will initiate hunts more often than other ghosts.'
        ],
        abilitiesShort: [
            'Can hunt from 70% sanity.',
            'Rare chance to hunt at any sanity percentage.'
        ],
        weaknessesShort: [
            'Crucifix effectiveness is increased to 5 m.'
        ],
        notes: [
            'Smudge sticks prevent hunts for only 60 seconds (instead of 90 s).',
            'Shorter cooldown between hunts (20 s instead of 25 s).'
        ],
        evidence: [
            EvidenceType.Fingerprints,
            EvidenceType.Writing,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Deogen',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Deogen',
        sanityThreshold: 40,
        strengthsShort: [
            'Always knows where players are during a hunt.',
            'Moves at a high speed with no player nearby.'
        ],
        abilitiesShort: [
            'Produces a unique response through the Spirit Box.'
        ],
        weaknessesShort: [
            'Significantly slows down when near the player.',
            'Has a lower hunt sanity threshold.'
        ],
        notes: [
            'The unique response can be triggered while standing within 1 metre of the Deogen (33% chance).',
            'The response is constant heavy bull-like breathing.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Writing,
            EvidenceType.Dots
        ],
        guaranteedEvidence: [
            EvidenceType.SpiritBox
        ]
    },
    {
        name: 'Goryo',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Goryo',
        sanityThreshold: 50,
        strengthsShort: [
            'Only interacts with a D.O.T.S. Projector if no players are in the same room as the ghost.',
            'Usually only shows itself on camera if there are no people nearby.'
        ],
        abilitiesShort: [
            'Only shows itself passing through D.O.T.S. Projector on a video camera.'
        ],
        weaknessesShort: [
            'They are are rarely seen far from their place of death.'
        ],
        notes: [
            'Cannot change favorite rooms by itself.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Fingerprints,
            EvidenceType.Dots
        ],
        guaranteedEvidence: [
            EvidenceType.Dots
        ]
    },
    {
        name: 'Hantu',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Hantu',
        sanityThreshold: 50,
        strengthsShort: [
            'Lower temperatures allow the Hantu to move faster.'
        ],
        abilitiesShort: [
            'During a hunt it emits frosty breath in any room as long as the breaker is off.'
        ],
        weaknessesShort: [
            'Moves slower in warmer areas.'
        ],
        notes: [
            "The Hantu is highly dependent on the map's fuze box state, as the presence of power keeps the investigation area warm and thus slows the Hantu down.",
            'The Hantu is twice as likely to choose turning off the breaker as an interaction, compared to other ghosts.',
            'Use smudge sticks to stop it from hunting and look for its freezing breath.',
            'Dead players cannot see the freezing breath.'
        ],
        evidence: [
            EvidenceType.Fingerprints,
            EvidenceType.Orbs,
            EvidenceType.FreezingTemps
        ],
        guaranteedEvidence: [
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Jinn',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Jinn',
        sanityThreshold: 50,
        strengthsShort: [
            'Travels at a faster speed if its victim is far away.'
        ],
        weaknessesShort: [
            "Turning off the location's power source will prevent the Jinn from using its ability."
        ],
        abilitiesShort: [
            'Can lower the sanity of all players inside the ghost room by 25% if the breaker is on.',
            'An EMF reading is generated at the fuse box after activating it\'s ability.'
        ],
        notes: [
            'A Jinn cannot turn off a breaker directly through interacting with it. It can still turn it off indirectly by turning on a light to exceed the limit on the number of lights that can be turned on.',
            'The Jinn will move at normal speeds if the breaker is off or the player is closer than 3 meters.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Fingerprints,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Mare',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Mare',
        sanityThreshold: 60,
        strengthsShort: [
            'Has an increased chance to attack in the dark.'
        ],
        abilitiesShort: [
            'Can hunt at higher sanity levels.'
        ],
        weaknessesShort: [
            'Turning the lights on will reduce the chance of an attack.'
        ],
        notes: [
            'Turning lights on will lower its hunt sanity threshold to 40%.',
            'Will try to turn off lights more often.',
            'If a player turns on a light near a Mare, it has a chance of turning the light off almost immediately.',
            'When performing a ghost event, Mares are more likely to choose one where the light bulbs explode.',
            'Mares cannot turn on lights by interacting with them, though they can turn them off.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Orbs,
            EvidenceType.Writing
        ]
    },
    {
        name: 'Moroi',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Moroi',
        sanityThreshold: 50,
        strengthsShort: [
            'Moves noticeably faster at low player sanity.'
        ],
        abilitiesShort: [
            'Can curse players, making them lose sanity faster while investigating.'
        ],
        weaknessesShort: [
            'Smudge sticks blind the ghost for longer during hunts (12 s instead of 6 s).'
        ],
        notes: [
            'A player will be cursed when receiving a response on the spirit box or by hearing ghost sounds on the parabolic microphone.',
            "When cursed, sanity drain is doubled and doesn't stop in lit areas.",
            'The curse is paused outside of the investigation area (e.g. the house).',
            'The curse can be removed using sanity pills.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Writing,
            EvidenceType.FreezingTemps
        ],
        guaranteedEvidence: [
            EvidenceType.SpiritBox
        ]
    },
    {
        name: 'Myling',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Myling',
        sanityThreshold: 50,
        strengthsShort: [
            'Known to be quieter when hunting.'
        ],
        abilitiesShort: [
            'Has quieter footsteps and vocalizations during hunts.'
        ],
        weaknessesShort: [
            'Produces paranormal sounds more frequently, these can be heard through a Parabolic Microphone.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Fingerprints,
            EvidenceType.Writing
        ]
    },
    {
        name: 'Obake',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Obake',
        sanityThreshold: 50,
        strengthsShort: [
            'Occasionally fails to leave fingerprints.'
        ],
        abilitiesShort: [
            'Fingerprints can disappear faster than usual.',
            'Has a chance to blink in a different ghost model when hunting.'
        ],
        weaknessesShort: [
            'May leave behind six\u2011fingered handprints (~16.7% chance).',
            'May leave two fingerprints on a light switch instead of one.'
        ],
        notes: [
            'Only has a 75% chance of leaving fingerprints when interacting with objects.',
            'Because the six\u2011fingered handprint is unique to the Obake, it conclusively identifies it.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Fingerprints,
            EvidenceType.Orbs
        ],
        guaranteedEvidence: [
            EvidenceType.Fingerprints
        ]
    },
    {
        name: 'Oni',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Oni',
        sanityThreshold: 50,
        strengthsShort: [
            'More active, interacting with objects more often, especially when people are nearby.'
        ],
        abilitiesShort: [
            'Model remains visible for longer periods when hunting.'
        ],
        weaknessesShort: [
            'Onis are very active, making them easier to find.'
        ],
        notes: [
            'An Oni will never perform the smoke\u2011type ghost event ("airball").',
            'Double the sanity drain (20% instead of 10%) when colliding with a player during a ghost event.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.FreezingTemps,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Onryo',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Onryo',
        sanityThreshold: 60,
        strengthsShort: [
            'Extinguishing a flame can cause an Onryo to attack.'
        ],
        weaknessesShort: [
            'The presence of flames prevents the ghost from hunting.'
        ],
        abilitiesShort: [
            'Has a higher chance to blow out a flame than other ghosts.'
        ],
        notes: [
            'If it attempts to start a hunt within 4 meters of a lit flame (candle, lighter, or campfire), the hunt will fail and it will blow out the flame instead.',
            'An Onryo will attempt a hunt for every third flame it blows out.',
            'The frequency of blowing out flames increases each time it kills a player.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Orbs,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Phantom',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Phantom',
        sanityThreshold: 50,
        strengthsShort: [
            "Looking at a Phantom will lower the player's sanity considerably faster."
        ],
        weaknessesShort: [
            'Taking a photo of the Phantom will cause it to briefly disappear.'
        ],
        notes: [
            'During a hunt, a Phantom will flash visible less frequently than other ghosts (every 1 to 2 seconds).',
            "A Phantom will never be visible in photos (even during a hunt) and photos won't contain any interference."
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Fingerprints,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Poltergeist',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Poltergeist',
        sanityThreshold: 50,
        strengthsShort: [
            'Can throw multiple objects at once.'
        ],
        abilitiesShort: [
            "After activating its ability to throw multiple objects, the players' sanity will decrease by a percentage based on the amount of objects thrown."
        ],
        weaknessesShort: [
            'With nothing to throw, Poltergeists become powerless.'
        ],
        notes: [
            'Throwing objects will create an EMF level 3 reading.',
            'Poltergeists will sometimes throw items with higher force than other ghosts.',
            'Has an increased rate of interacting with objects during a hunt.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Writing,
            EvidenceType.Fingerprints
        ]
    },
    {
        name: 'Raiju',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Raiju',
        sanityThreshold: 50,
        strengthsShort: [
            'Nearby active electronics allow it to move faster during hunts.'
        ],
        weaknessesShort: [
            'Raiju are constantly disrupting electronic equipment when attacking, making it easier to track.'
        ],
        notes: [
            'If the ghost continues to walk very quickly when roaming (and not chasing particular players), then it is most likely a Raiju.',
            "When near activated electronic equipment, the Raiju's hunt sanity threshold is increased to 65%."
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Orbs,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Revenant',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Revenant',
        sanityThreshold: 50,
        strengthsShort: [
            'Travels significantly faster when chasing its prey.'
        ],
        weaknessesShort: [
            'Hiding from the Revenant will cause it to move very slowly.'
        ],
        notes: [
            'Speeds up immediately after detecting a player (visually or through speech/electronics).',
            'Will not slow down until it reaches last known player location.',
            'Slows down gradually (deceleration rate of 0.75 m/s²).'
        ],
        evidence: [
            EvidenceType.Orbs,
            EvidenceType.Writing,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Shade',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Shade',
        sanityThreshold: 35,
        strengthsShort: [
            'Shades are generally less active, which makes them much harder to find.'
        ],
        weaknessesShort: [
            'Cannot interact with objects or start a hunt if a player is in the same room as the ghost.'
        ],
        abilitiesShort: [
            'Produces hissing and shadowy form ghost events more often.'
        ],
        notes: [
            'Prefers to do the "ghost mist" event rather than manifesting.',
            'During manifestations, it has a higher chance of appearing as a shadow.',
            'Can still perform interactions or start a hunt if it wanders into a room without players.',
            'Shades can only hunt below an average sanity of 35%, lower than most other ghosts.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.Writing,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Spirit',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Spirit',
        sanityThreshold: 50,
        strengthsShort: [],
        weaknessesShort: [
            'A Spirit can be temporarily stopped by burning Smudge Sticks near them.'
        ],
        notes: [
            'When a Smudge Stick is used near a Spirit, it cannot initiate a hunt for 180 seconds (instead of 90 s).',
            'The delay will apply even if the Spirit was smudged during a hunt.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.SpiritBox,
            EvidenceType.Writing
        ]
    },
    {
        name: 'Thaye',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Thaye',
        sanityThreshold: 75,
        strengthsShort: [
            'Becomes very active the first time a player gets nearby.'
        ],
        weaknessesShort: [
            'The more time players spend near it, the quieter and slower it becomes.'
        ],
        notes: [
            'The Thaye has an "age" parameter that decreases its general activity.',
            'Every 1 to 2 minutes, the Thaye attempts to age if players are nearby.',
            'Hunt sanity threshold changes depending on age from 75% down to 15% at steps of 6%.',
            "The age also decreases the ghost's activity and movement speed."
        ],
        evidence: [
            EvidenceType.Orbs,
            EvidenceType.Writing,
            EvidenceType.Dots
        ]
    },
    {
        name: 'The Mimic',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/The_Mimic',
        sanityThreshold: 50,
        strengthsShort: [
            'Can mimic the abilities and traits of other ghosts.'
        ],
        abilitiesShort: [
            'Several reports have noted ghost orb sightings near mimics.'
        ],
        weaknessesShort: [],
        notes: [
            'The Mimic is able to mirror the traits of other ghosts, such as leaving a six\u2011fingered handprint that would otherwise identify an Obake.',
            "Also mimics hunt thresholds (including Demon's hunt ability) and hunt movement speeds.",
            'The Mimic may occasionally change the ghost type that it chooses to imitate every 30 seconds to about 2 minutes.'
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Fingerprints,
            EvidenceType.FreezingTemps,
            EvidenceType.Orbs
        ],
        guaranteedEvidence: [
            EvidenceType.Orbs
        ]
    },
    {
        name: 'The Twins',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/The_Twins',
        sanityThreshold: 50,
        strengthsShort: [
            'Either Twin may start a hunt, though not at the same time.'
        ],
        weaknessesShort: [
            'The Twins will often interact with the environment at the same time.'
        ],
        abilitiesShort: [
            'When The Twins uses its ability, it will perform one interaction in the normal radius (up to 3 metres) and one within a larger radius (up to 16 metres).'
        ],
        notes: [
            'Each Twin has a different moving speed during hunts. The "main" Twin is said to move at either the normal ghost speed or 10% slower, while the "decoy" Twin will move 10% faster.',
            'The "decoy" Twin does not set off motion sensors, and cannot respond to the Spirit Box nor spread Freezing Temperatures, but its interactions can give off EMF Level 5.',
            'Regardless of which Twin tries to hunt, a crucifix will only check the location of the "main" Twin.'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.SpiritBox,
            EvidenceType.FreezingTemps
        ]
    },
    {
        name: 'Wraith',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Wraith',
        sanityThreshold: 50,
        strengthsShort: [
            "Almost never touches the ground and doesn't leave footprints."
        ],
        weaknessesShort: [
            'Never steps in salt piles.'
        ],
        notes: [
            'When the Wraith is not hunting, it has a chance to teleport within 3 meters of a random player, generating an EMF Level 2 reading, with a 25% chance for this to be an EMF Level 5 reading instead.',
            'You cannot identify a Wraith just by looking at its ghost model.',
            'Wraiths will emit footstep noises at the same volume as most other ghosts'
        ],
        evidence: [
            EvidenceType.Emf,
            EvidenceType.SpiritBox,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Yokai',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Yokai',
        sanityThreshold: 50,
        strengthsShort: [
            'Talking near a Yokai will increase its activity rate and hunt threshold.'
        ],
        weaknessesShort: [
            'When hunting, a Yokai can only hear voices close to it (2.5 m).'
        ],
        notes: [
            "The Yokai's hunt sanity threshold is increased to 80% while players are talking within a certain range of it."
        ],
        evidence: [
            EvidenceType.SpiritBox,
            EvidenceType.Orbs,
            EvidenceType.Dots
        ]
    },
    {
        name: 'Yurei',
        wikiUrl: 'https://phasmophobia.fandom.com/wiki/Yurei',
        sanityThreshold: 50,
        strengthsShort: [
            'Known to have a stronger effect on player Sanity.'
        ],
        weaknessesShort: [
            "Smudging the Yurei's place of death will trap it temporarily, reducing how much it wanders."
        ],
        abilitiesShort: [
            "May randomly shut a door and drain nearby players' sanity."
        ],
        notes: [
            'The ability has a radius of 7.5 meters around the ghost and drains 15% sanity.',
            'The ability fully closes the door and produces an EMF reading, but the ghost will not appear or hiss.',
            'A Yurei is not able to use its ability if the room has no doors.',
            'Note that all ghosts can shut a door, but a Yurei may do it more often'
        ],
        evidence: [
            EvidenceType.Orbs,
            EvidenceType.FreezingTemps,
            EvidenceType.Dots
        ]
    }
]
