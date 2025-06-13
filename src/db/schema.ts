//DEFINE TABLES AND COLUMNS
import {
  date,
  integer,
  jsonb,
  pgTable,
  text,
  primaryKey,
  uuid,
  boolean,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: date().notNull().defaultNow(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});

export const battlesTable = pgTable('battles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
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
export const usersToBattlesTable = pgTable(
  'users_to_battles',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
    battle_id: integer()
      .notNull()
      .references(() => battlesTable.id),
    progress: integer(),
    unlocked: boolean().default(false),
    completed: boolean().default(false),
  },
  //Composite Primary Key: the primary key is on both user_id and battle_id together, ensuring:
  // No duplicate pairs (a user cannot be linked to the same battle multiple times).
  //Efficient lookups by either or both columns.
  (t) => [primaryKey({ columns: [t.user_id, t.battle_id] })],
);

//!relations() defines logical relationship, not column names

// Define users table relation
//associated with usersToBattles table and this is a many association
export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToBattles: many(usersToBattlesTable),
}));

//define battle relation
//is associated with usersToBattles, many association
//is associated with questions table, many association

export const battlesRelations = relations(battlesTable, ({ many }) => ({
  usersToBattles: many(usersToBattlesTable),
  questions: many(questionsTable),
}));

//defines that usersToBattlesRelations table is associated with user and battle in a one /singular relationship
//Each row in users_to_battles belongs to one user, and one battle
//* define the relationship logic at the DRIZZLE ORM logic
export const usersToBattlesRelations = relations(
  usersToBattlesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToBattlesTable.user_id],
      references: [usersTable.id],
    }),
    battle: one(battlesTable, {
      fields: [usersToBattlesTable.battle_id],
      references: [battlesTable.id],
    }),
  }),
);

export const commandersTable = pgTable('commanders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  battle_id: integer()
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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: date().notNull().defaultNow(),
  answer_text: text('answer_text'),
  title: text('title').notNull(),
  question_id: integer()
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
