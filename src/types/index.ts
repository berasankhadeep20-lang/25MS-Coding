export type AppId = 'terminal' | 'home' | 'about' | 'team' | 'stack' | 'contact' | 'neofetch' | 'clock' | 'asteroids' | 'pong' | 'periodic' | 'fourier' | 'gravity' | 'dna' | 'grapher' | 'guestbook' | 'poll' | 'jokes' | 'slashdotai' | 'matrix-calc' | 'physics' | 'molecular' | 'gameoflife' | 'typing' | 'achievements' | 'flappy' | 'dungeon' | 'fileexplorer' | 'settings' | 'snake' | 'notepad' | 'taskmanager' | 'jsonformat' | 'base64' | 'markdown' | 'colorpicker' | 'passgen' | 'diffview' | 'coderunner' | 'lorem' | 'hashgen' | 'paint' | 'asciiart' | 'pixelart' | 'calendar' | 'pomodoro' | 'stopwatch' | 'currency' | 'bmi' | 'agecalc' | 'habittracker' | 'newsticker' | 'leaderboard' | 'githubstats' | 'wikipedia' | 'tamagotchi' | 'stocks' | 'horoscope' | 'lovecalc' | 'magic8' | 'deployed' | 'sortvis' | 'pathvis' | 'binconv' | 'truthtable' | 'eqsolver' | 'mandelbrot' | 'cellaut' | 'statsCalc' | 'fibprime' | 'logicgate' | 'isstrack' | 'apod' | 'bookSearch' | 'exchRate' | 'ipgeo' | 'randuser' | 'flashcard' | 'budget' | 'recipe' | 'countdown' | 'mealgent' | 'studysched' | 'faketwitter' | 'fakewhatsapp' | 'confession' | 'compliment' | 'insult' | 'debate' | 'linuscall' | 'cgpasim' | 'ratemycode' | 'rickroll' | 'excusegen' | 'screensaver' | 'fakeload' | 'fortunecook' | 'fixbug' | 'kbtrainer' | 'syslog' | 'clipboard' | 'events' | 'showcase' | 'sortvis' | 'pathvis' | 'binconv' | 'truthtable' | 'eqsolver' | 'mandelbrot' | 'cellaut' | 'statsCalc' | 'fibprime' | 'logicgate' | 'isstrack' | 'apod' | 'bookSearch' | 'exchRate' | 'ipgeo' | 'randuser' | 'flashcard' | 'budget' | 'recipe' | 'countdown' | 'mealgent' | 'studysched' | 'faketwitter' | 'fakewhatsapp' | 'confession' | 'compliment' | 'insult' | 'debate' | 'linuscall' | 'cgpasim' | 'ratemycode' | 'rickroll' | 'excusegen' | 'screensaver' | 'fakeload' | 'fortunecook' | 'fixbug' | 'kbtrainer' | 'syslog' | 'clipboard'

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
