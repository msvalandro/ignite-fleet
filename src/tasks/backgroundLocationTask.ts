import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

export const BACKGROUND_TASK_MANAGER = 'location-tracking'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
TaskManager.defineTask(BACKGROUND_TASK_MANAGER, ({ data, error }: any) => {
  try {
    if (error) {
      throw error
    }

    const { coords, timestamp } = data.locations[0]

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    console.log(currentLocation)
  } catch (error) {
    console.log(error)
  }
})

export async function startLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_MANAGER,
    )

    if (hasStarted) {
      await stopLocationTask()
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_MANAGER, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function stopLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_MANAGER,
    )

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_MANAGER)
    }
  } catch (error) {
    console.log(error)
  }
}
