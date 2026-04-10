import { CommandResult } from '../types'
import { systemCommands, getCwd } from './systemCommands'
import { appCommands } from './appCommands'
import { easterEggs } from './easterEggs'
import { c, formatError, prompt } from '../utils/formatOutput'

const ALL_COMMANDS = {
  ...systemCommands,
  ...appCommands,
  ...easterEggs,
}

export const ALL_COMMAND_NAMES = Object.keys(ALL_COMMANDS)

function parseAndRunSingle(input: string): CommandResult & { prompt: string } {
  if (!input) return { output: '', prompt: prompt(getCwd()) }

  // Try exact match first (for multi-word commands like 'sudo party')
  if (ALL_COMMANDS[input]) {
    const result = ALL_COMMANDS[input]([])
    return { ...result, prompt: prompt(getCwd()) }
  }

  const [cmd, ...args] = input.split(/\s+/)
  const key = cmd.toLowerCase()

  if (key === 'open' && appCommands['open']) {
    const result = appCommands['open'](args)
    return { ...result, prompt: prompt(getCwd()) }
  }

  if (ALL_COMMANDS[key]) {
    const result = ALL_COMMANDS[key](args)
    return { ...result, prompt: prompt(getCwd()) }
  }

  return {
    output: [
      `\r\n${c.red}${cmd}: command not found${c.reset}`,
      `${c.gray}Type 'help' to see available commands.${c.reset}`,
      '',
    ].join('\r\n'),
    prompt: prompt(getCwd()),
  }
}

export function parseAndRun(raw: string): CommandResult & { prompt: string } {
  const input = raw.trim()
  if (!input) return { output: '', prompt: prompt(getCwd()) }

  // Basic pipe support: cmd | grep pattern
  if (input.includes(' | grep ')) {
    const pipeIdx = input.indexOf(' | grep ')
    const leftCmd = input.slice(0, pipeIdx).trim()
    const pattern = input.slice(pipeIdx + 8).trim()
    const leftResult = parseAndRunSingle(leftCmd)
    if (leftResult.output && pattern) {
      const lines = leftResult.output.split('\r\n')
      const matched = lines.filter(l => l.includes(pattern))
      const output = matched.length > 0
        ? matched.join('\r\n')
        : `\r\n${c.gray}(no matches for '${pattern}')${c.reset}\r\n`
      return { ...leftResult, output, prompt: prompt(getCwd()) }
    }
    return { ...leftResult, prompt: prompt(getCwd()) }
  }

  return parseAndRunSingle(input)
}

export function getCompletions(partial: string): string[] {
  if (!partial) return []
  return ALL_COMMAND_NAMES.filter(name => name.startsWith(partial.toLowerCase()))
}