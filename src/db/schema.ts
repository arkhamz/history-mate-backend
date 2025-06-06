import {
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey(),
  created_at: timestamp(),
  display_name: text('display_name').notNull(),
  email: uuid('email').notNull(),
});

export const battlesTable = pgTable('battles', {
  id: uuid().primaryKey(),
  created_at: timestamp(),
  prelude: text('prelude').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image_url: text('image_url').notNull(),
  video_url: text('video_url').notNull(),
  date: date().notNull(),
  latitude: integer().notNull(),
  longitude: integer().notNull(),
  army_one: jsonb().notNull(),
  army_two: jsonb().notNull(),
  result: text('result').notNull(),
  questions: text('questions').notNull(),
});

//JUNCTION/JOIN TABLE
//connects many users to many battles with extra progress and status
export const usersToBattles = pgTable(
  'users_to_battles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
    battleId: uuid('battle_id')
      .notNull()
      .references(() => battlesTable.id),
    progress: integer(),
    status: text('status'),
  },
  (t) => [primaryKey({ columns: [t.userId, t.battleId] })],
);

//foreign key relations

//a user can be connected to many battles via usersToBattles junction table
export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToBattles: many(usersToBattles),
}));
//a battle can be connected to many users via usersToBattles junction table
export const battlesRelations = relations(battlesTable, ({ many }) => ({
  usersToBattles: many(usersToBattles),
}));

//defines that each userS_to_battles junction table row belongs to one user and one battle
export const usersToBattlesRelations = relations(usersToBattles, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToBattles.userId],
    references: [usersTable.id],
  }),
  battle: one(battlesTable, {
    fields: [usersToBattles.battleId],
    references: [battlesTable.id],
  }),
}));

// export const userProgressTable = pgTable('user_progress', {
//   id: uuid().primaryKey(),
//   created_at: timestamp(),
//   user_id: uuid().notNull(),
//   battle_id: uuid().notNull(),
//   progress: integer(),
//   status: text('status'),
// });

export const commandersTable = pgTable('commanders', {
  id: uuid().primaryKey(),
  created_at: timestamp(),
  full_name: text('full_name').notNull(),
  title: text('title').notNull(),
  loyalty: text('loyalty').notNull(),
  loyalty_image_url: text('loyalty_image_url').notNull(),
  image_url: text('image_url').notNull(),
  birth_date: date().notNull(),
  death_date: date().notNull(),
  birth_location: text('birth_location').notNull(),
  bio: text('bio').notNull(),
});
