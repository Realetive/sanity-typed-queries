import { expectType, expectError } from 'tsd'

import { createSchema } from '../../src'

const { builder } = createSchema('heatExemplar', {
  name: {
    type: 'string',
    validation: Rule => Rule.required(),
  },
  postcode: {
    type: 'string',
    validation: Rule => Rule.required(),
  },
  cost: {
    type: 'number',
  },
  description: {
    type: 'text',
    rows: 2,
    validation: Rule => Rule.required(),
  },
})

const a = builder.pick('description').use()[1]
expectType<string[]>(a)

const b = builder.first().pick('description').use()[1]
expectType<string | null>(b)

const c = builder.pick('description').first().use()[1]
expectType<string | null>(c)

const d = builder.use()[1]
expectType<
  Array<{
    name: string
    postcode: string
    cost: number
    description: string
    _createdAt: string
    _updatedAt: string
    _id: string
    _rev: string
    _type: 'heatExemplar'
  }>
>(d)

const e = builder.pick('_updatedAt').first().use()[1]
expectType<string | null>(e)

const f = builder.pick(['_type', 'name']).first().use()[1]
expectType<{ _type: 'heatExemplar'; name: string } | null>(f)

expectError(builder.pick('nothere'))
