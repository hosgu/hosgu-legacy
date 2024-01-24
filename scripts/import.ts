import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

// Define the structure of package.json
interface PackageJson {
  devDependencies?: { [key: string]: string }
}

// Read and parse package.json
const packageJson: PackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Extract devDependencies
const devDependencies = packageJson.devDependencies || {}

// Filter @architecturex/components packages
const architecturexComponents = Object.keys(devDependencies).filter((packageName) =>
  packageName.startsWith('@architecturex/components.')
)

// Function to execute export script for a package
const executeExportScript = (packageName: string): void => {
  const scriptPath = path.join('node_modules', packageName, 'dist', 'export.js')
  const command = `node ${scriptPath} ./src/components`

  console.log(`Executing script from ${packageName}...`)

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error in ${packageName}: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Stderr in ${packageName}: ${stderr}`)
      return
    }
    console.log(`Stdout from ${packageName}: ${stdout}`)
  })
}

// Execute export script for each package
architecturexComponents.forEach(executeExportScript)
