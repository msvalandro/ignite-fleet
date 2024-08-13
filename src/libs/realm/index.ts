import { createRealmContext } from '@realm/react'

import { Coords } from './schemas/Coords'
import { History } from './schemas/History'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
} as Realm.SyncConfiguration

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [History, Coords],
    schemaVersion: 0,
  })
