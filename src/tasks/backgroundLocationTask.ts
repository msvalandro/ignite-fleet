import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

import {
  removeStorageLocation,
  saveStorageLocation,
} from '../libs/async-storage/locationStorage'

export const BACKGROUND_TASK_MANAGER = 'location-tracking'

TaskManager.defineTask(
  BACKGROUND_TASK_MANAGER,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ data, error }: any) => {
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

      await saveStorageLocation(currentLocation)
    } catch (error) {
      console.log(error)
      stopLocationTask()
    }
  },
)

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
      await removeStorageLocation()
    }
  } catch (error) {
    console.log(error)
  }
}
