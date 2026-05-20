// Venus Bleeds — Content Data
// All hooks, captions, rules, and system data pre-loaded from the handoff document

const VB_DATA = {

  brand: {
    name: "Venus Bleeds",
    handle: "@venusbleeds",
    label: "Burning Sanctuary",
    tagline: "Burn your sanctuary before it burns you.",
    latestSingle: "The Unself",
    goal: 100000,
  },

  rules: [
    "Never announce yourself. No 'hey guys I'm back.' Just post.",
    "Start mid-sentence or mid-action. First word IS the hook.",
    "Captions: literary not descriptive. Add a layer, don't explain.",
    "Always end with #venusbleeds. Every post. No exceptions.",
    "P1 & P2: viral sounds only. P3 only: The Unself as background.",
    "3–5 hashtags in caption. Clean. Quality over quantity.",
    "Saves and shares beat likes. Design content people forward at midnight.",
    "One fixed filming location: warm light, textured wall, clip mic on collar.",
  ],

  pillars: [
    {
      id: "p1",
      name: "The Feeling",
      number: 1,
      format: "5–10 seconds. Loopable. Shareable. Meme energy.",
      purpose: "Reach and virality. Designed to be forwarded in group chats at midnight.",
      sound: "Viral sounds from TikTok — NOT The Unself.",
      mechanics: "Back-to-camera, POV framing, visual incompleteness, no face required.",
      textRule: "Optional but powerful. 3–5 words max.",
      hashtags: ["#queerarab", "#arabdiaspora", "#queertiktok", "#fyp", "#venusbleeds"],
      color: "#c0392b",
    },
    {
      id: "p2",
      name: "The Thought",
      number: 2,
      format: "60–90 seconds. Direct to camera. Declarations. Intimate. Never scripted.",
      purpose: "Depth, connection, follower conversion. The 'stay' content.",
      sound: "Viral sounds as background — NOT The Unself.",
      mechanics: "Start mid-sentence or mid-action. First word IS the hook.",
      textRule: "3–5 word phrase, all lowercase, fades by second 4, never repeats what's spoken.",
      hashtags: ["#queerarab", "#arabqueer", "#arabmen", "#queertiktok", "#venusbleeds"],
      color: "#8B1A1A",
    },
    {
      id: "p3",
      name: "The Artist",
      number: 3,
      format: "40–60 seconds. Peer-to-peer. World-building. Never promotional.",
      purpose: "Music audience building. Plant The Unself in people's ears without announcing it.",
      sound: "The Unself as background — present but never announced.",
      mechanics: "Talk about music, influence, creative process as a creative peer.",
      textRule: "On-screen title optional. Same rules — lowercase, minimal.",
      hashtags: ["#independentartist", "#darkpop", "#queerartist", "#altpop", "#venusbleeds"],
      color: "#5a1010",
    },
  ],

  weeklySchedule: [
    { day: "Thursday", pillar: "p1", note: "Hook, loopable" },
    { day: "Friday", pillar: "p2", note: "Declaration, long-form" },
    { day: "Saturday", pillar: "p1", note: "Weekend energy, shareable" },
    { day: "Sunday", pillar: "p3", note: "Artist world-building" },
    { day: "Monday", pillar: null, note: "Rest day" },
    { day: "Tuesday", pillar: "p2", note: "1am energy, one truth" },
    { day: "Wednesday", pillar: "p1", note: "Group-chat material" },
  ],

  hookMechanics: [
    {
      name: "Context Withheld",
      description: "Visual tells the story without words. Face never shown.",
      example: "Walking back-to-camera, Paris street. No text. The walk IS the answer.",
    },
    {
      name: "Visual Incompleteness",
      description: "Open mouth, hard cut to black. Caption names the unsayable then takes it back.",
      example: "Face camera, open mouth — cut. Caption: 'what I actually think about being someone's Arab fantasy. actually forget it.'",
    },
    {
      name: "Paced Reveal",
      description: "Text builds line by line, 1.5s apart. Tension through timing.",
      example: "'there is a version of me' / 'that survived every room' / 'by disappearing inside it' / 'I've been trying to find him for six years'",
    },
    {
      name: "Direct Address",
      description: "Opens with 'this is for you' — locks in target audience in first second.",
      example: "On-screen: 'this is for you' / Hook: 'If you've ever been the most Arab person in a queer room...'",
    },
    {
      name: "Named Stake",
      description: "Leads with something nobody says, creates immediate tension.",
      example: "On-screen: 'nobody says this' / Hook: 'I have one true thing to say about how white gay men in Paris treat Arab men...'",
    },
    {
      name: "Incomplete Truth",
      description: "Starts a sentence, cuts, re-earns at second 8.",
      example: "'I left Beirut because I needed to. What I didn't know was—' [cut] '—that I'd spend three years in Paris performing...'",
    },
    {
      name: "Interrupted Delivery",
      description: "States a bold claim, then cuts before the explanation. Forces the watch.",
      example: "'the Lebanese diaspora in Paris has a specific political mentality that nobody wants to name out loud and—' [cut]",
    },
    {
      name: "Quiet Authority",
      description: "No hook needed. Just speaks. The confidence is the hook.",
      example: "Sits down. Begins talking. No text. The absence of trying is the pull.",
    },
    {
      name: "Inverse Logic",
      description: "Opens with a statement that sounds wrong.",
      example: "'the most radical thing I did this year wasn't leaving. it was staying in the room.'",
    },
    {
      name: "Mirror Recognition",
      description: "Articulates something the viewer has felt but never heard said.",
      example: "'you ever notice that 'exotic' only applies to people white people don't have to share power with'",
    },
  ],

  onScreenTitles: {
    p2: [
      "they said pick a side",
      "nobody warned me",
      "two worlds. zero tables.",
      "i didn't leave. i was already gone.",
      "the funniest joke is me",
      "underestimated in arabic. dismissed in french.",
      "too much. not enough. pick one.",
      "beirut made me. paris is still deciding.",
      "the music nobody asked for",
      "paris doesn't care.",
      "this is for you",
      "nobody says this",
      "the part i skipped",
      "i'll say it",
    ],
    p3: [
      "what i was trying to say",
      "the song came from this",
      "before the unself",
      "this is what burning sounds like",
      "i made this from the part i almost deleted",
      "the version of me that didn't make it",
      "what does it mean to unmake yourself",
    ],
  },

  spokenHooks: {
    p1: [
      "Walking shot, back to camera, warm Paris light. Caption: 'both my identities told me to tone it down. I told both of them no.'",
      "Text builds one line at a time — 'there is a version of me / that survived every room / by disappearing inside it / I've been trying to find him for six years'",
    ],
    p2: [
      "If you've ever been the most Arab person in a queer room and the most queer person at an Arab table — and you stopped correcting people's assumptions because it was just easier — stay.",
      "I have one true thing to say about how white gay men in Paris treat Arab men — and it's not a compliment dressed as a complaint.",
      "I left Beirut because I needed to. What I didn't know was— [cut] —that I'd spend three years in Paris performing the version of myself I thought Europe wanted.",
      "the Lebanese diaspora in Paris has a specific political mentality that nobody in that community wants to name out loud and— [cut]",
      "you ever notice that 'exotic' only applies to people white people don't have to share power with",
      "the most radical thing I did this year wasn't leaving. it was staying in the room.",
    ],
  },

  captionFormulas: [
    { type: "POV / identity short", caption: "still here though.", hashtags: "#queerarab #arabdiaspora #lebaneseinparis #queertiktok #venusbleeds" },
    { type: "Lebanese in Paris", caption: "beirut raised me to take up space. paris is still learning.", hashtags: "#lebaneseabroad #libanaisaparis #arabdiaspora #immigrantlife #venusbleeds" },
    { type: "Voice / declaration", caption: "said what i said.", hashtags: "#queerarab #arabqueer #arabmen #queertiktok #venusbleeds" },
    { type: "Music / artist", caption: "the unself is the one who stays anyway.", hashtags: "#independentartist #darkpop #queerartist #altpop #venusbleeds" },
    { type: "Meme / reaction", caption: "anyway.", hashtags: "#gaymemesoncrack #queerarab #queertiktok #fyp #venusbleeds" },
  ],

  hashtagSets: {
    p1: "#queerarab #arabdiaspora #queertiktok #fyp #venusbleeds",
    p2: "#queerarab #arabqueer #arabmen #queertiktok #venusbleeds",
    p3: "#independentartist #darkpop #queerartist #altpop #venusbleeds",
  },

  donts: [
    "Don't use The Unself on P1 or P2",
    "Don't announce 'The Unself' directly — let it live in the atmosphere",
    "Don't over-script — authenticity is the brand",
    "Don't mix font styles — Archivo Black + Archivo only",
    "Don't post without #venusbleeds",
    "Don't describe the video in the caption",
    "Don't use more than 5 hashtags",
  ],

};
