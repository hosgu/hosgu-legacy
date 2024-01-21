import * as readline from 'readline'
import { exec } from 'child_process'
import * as path from 'path'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(
  'Enter the package name (e.g., @architecturex/components.counter): ',
  (packageName: string) => {
    const scriptPath = path.join('node_modules', packageName, 'dist', 'export.js')
    const command = `node ${scriptPath} ./src/components`

    console.log(`Executing script from ${packageName}...`)

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return
      }
      console.log(`Stdout: ${stdout}`)
    })

    rl.close()
  }
)
