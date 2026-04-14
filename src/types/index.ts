export type AppId =
  'terminal' | 'home' | 'about' | 'team' | 'stack' | 'contact' | 'neofetch' | 'clock' |
  'asteroids' | 'pong' | 'flappy' | 'snake' |
  'periodic' | 'fourier' | 'gravity' | 'dna' | 'physics' | 'molecular' |
  'sortvis' | 'pathvis' | 'binconv' | 'truthtable' | 'statsCalc' | 'fibprime' | 'logicgate' |
  'isstrack' | 'apod' | 'ipgeo' | 'randuser' |
  'guestbook' | 'poll' | 'jokes' | 'slashdotai' |
  'newsticker' | 'leaderboard' | 'githubstats' | 'wikipedia' |
  'horoscope' | 'excusegen' | 'screensaver' | 'fortunecook' |
  'kbtrainer' | 'syslog' | 'clipboard' | 'cgpasim' |
  'insult' | 'compliment' | 'faketwitter' | 'fakewhatsapp' | 'confession' |
  'base64' | 'markdown' | 'colorpicker' | 'hashgen' |
  'paint' | 'asciiart' |
  'calendar' | 'pomodoro' | 'stopwatch' | 'countdown' | 'mealgent' | 'studysched' | 'flashcard' |
  'fileexplorer' | 'settings' | 'notepad' | 'taskmanager' |
  'events' | 'showcase' | 'blog' | 'resources' | 'halloffame' | 'rules' | 'newsletter' | 'memberlist' | 'recruitment' | 'alumni' | 'gallery' | 'contactform' | 'feedback' | 'campusmap' | 'timetable' | 'roadmap' | 'slashdotfaq' | 'campusmap' | 'lhcrooms' | 'timetable' | 'roadmap' | 'slashdotfaq' |
'githubcontrib' | 'todayincs' | 'hackernews' | 'wikirandom'
export interface WindowState {
  id: string
  appId: AppId
  title: string
  isMinimized: boolean
  isFocused: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface TeamMember {
  name: string
  role: string
  github?: string
  fun_fact: string
  ascii: string
}

export interface TechItem {
  name: string
  version?: string
  description: string
  category: 'frontend' | 'tooling' | 'library' | 'language'
}

export interface CommandResult {
  output: string
  action?: {
    type: 'open_window'
    appId: AppId
    title: string
  } | {
    type: 'clear'
  } | {
    type: 'easter_egg'
    effect: string
  }
}

export type CommandHandler = (args: string[]) => CommandResult
