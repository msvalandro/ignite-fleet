import { Realm } from '@realm/react'

interface GenerateProps {
  user_id: string
  license_plate: string
  description: string
}

// eslint-disable-next-line no-use-before-define
export class History extends Realm.Object<History> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  status!: string
  created_at!: string
  updated_at!: string

  static generate({ user_id, license_plate, description }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      status: 'departure',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema = {
    name: 'History',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
