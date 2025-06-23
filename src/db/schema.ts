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
  location: text().notNull(),
});

//JUNCTION/JOIN TABLE
// a user is connected to many battles via userBattles table
// a battle is connected to many users via userBattles

//Define the junction table foreign key constraints at the database level
export const userBattlesTable = pgTable(
  'user_battles',
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
  (t) => [primaryKey({ columns: [t.user_id, t.battle_id] })],
);

//define relationship logic at DRIZZLE ORM level
//a user can have many user_battles
export const usersRelations = relations(usersTable, ({ many }) => ({
  user_battles: many(userBattlesTable),
}));

//a battle can have many user_battles and many questions
export const battlesRelations = relations(battlesTable, ({ many }) => ({
  user_battles: many(userBattlesTable),
  questions: many(questionsTable),
}));

/* define that user_battles table row is associated with 1 user and 1 battle
 */
export const userBattlesRelations = relations(userBattlesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userBattlesTable.user_id],
    references: [usersTable.id],
  }),
  battle: one(battlesTable, {
    fields: [userBattlesTable.battle_id],
    references: [battlesTable.id],
  }),
}));

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

export const questionsRelations = relations(
  questionsTable,
  ({ one, many }) => ({
    battle: one(battlesTable, {
      fields: [questionsTable.battle_id],
      references: [battlesTable.id],
    }),
    question_answers: many(questionAnswersTable),
  }),
);

export const questionAnswersTable = pgTable('question_answers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: date().notNull().defaultNow(),
  answer_text: text('answer_text').notNull(),
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
