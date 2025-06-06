//DEFINE TABLES AND COLUMNS
import {
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
  boolean,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: date().notNull().defaultNow(),
  display_name: text('display_name').notNull(),
  email: uuid('email').notNull(),
});

export const battlesTable = pgTable('battles', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: date().notNull().defaultNow(),
  prelude: text('prelude').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image_url: text('image_url').notNull(),
  video_url: text('video_url').notNull(),
  date: date(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  army_one: jsonb().notNull(),
  army_two: jsonb().notNull(),
  result: text('result').notNull(),
  start_date: date(),
  end_date: date(),
});

//JUNCTION/JOIN TABLE - used to handle many-to-many relationships between 2 other tables
//it breaks the many to many relationship into two one-to-many relationships
//each row in the junction table links one user to one battle
// a user can be connected to many battles via usersToBattles junction table,
//and a battle connected to many users via usersToBattles

//*Define the foreign key constraints at the database level
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

//!relations() defines logical relationship, not column names

// Define users table relation
//associated with usersToBattles table and this is a many association
export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToBattles: many(usersToBattles),
}));

//define battle relation
//is associated with usersToBattles, many association
//is associated with questions table, many association

export const battlesRelations = relations(battlesTable, ({ many }) => ({
  usersToBattles: many(usersToBattles),
  questions: many(questionsTable),
}));

//defines that usersToBattlesRelations table is associated with user and battle in a one /singular relationship
//Each row in users_to_battles belongs to one user, and one battle
//* define the relationship logic at the DRIZZLE ORM logic
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

export const commandersTable = pgTable('commanders', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: date().notNull().defaultNow(),
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

export const questionsTable = pgTable('questions', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  battle_id: uuid()
    .notNull()
    .references(() => battlesTable.id),
  text: text('text'),
  created_at: date().notNull().defaultNow(),
});

export const questionsRelations = relations(questionsTable, ({ one }) => ({
  battle: one(battlesTable, {
    fields: [questionsTable.battle_id],
    references: [battlesTable.id],
  }),
}));

export const questionAnswersTable = pgTable('question_answers', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: date().notNull().defaultNow(),
  answer_text: text('answer_text'),
  title: text('title').notNull(),
  question_id: uuid()
    .notNull()
    .references(() => questionsTable.id),
  is_correct: boolean().notNull().default(false),
});

export const questionAnswersRelations = relations(
  questionAnswersTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [questionAnswersTable.question_id],
      references: [questionsTable.id],
    }),
  }),
);
