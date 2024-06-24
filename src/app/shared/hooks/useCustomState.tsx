import { useState } from 'react'

// Define a generic type for the state object
type State<T> = {
  [K in keyof T]: T[K]
}

function useCustomState<T extends object>(
  initialState: T
): readonly [T, <K extends keyof T>(fieldOrUpdater: K | ((prev: T) => T), value?: T[K]) => void]
function useCustomState<T>(initialState: T): readonly [T, (value: T | ((prev: T) => T)) => void]

function useCustomState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)

  if (typeof initialState === 'object' && initialState !== null) {
    const set = <K extends keyof T>(fieldOrUpdater: K | ((prev: T) => T), value?: T[K]) => {
      if (typeof fieldOrUpdater === 'function') {
        setState((prevState) => (fieldOrUpdater as (prev: T) => T)(prevState))
      } else {
        setState((prevState) => ({
          ...(prevState as T),
          [fieldOrUpdater]: value
        }))
      }
    }

    return [state, set] as const
  } else {
    const set = (value: T | ((prev: T) => T)) => {
      setState((prevState) =>
        typeof value === 'function' ? (value as (prev: T) => T)(prevState) : value
      )
    }

    return [state, set] as const
  }
}

export default useCustomState
