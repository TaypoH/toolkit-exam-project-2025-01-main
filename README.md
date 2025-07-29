# BUG FIXED

Bugs fixed, all libraries updated, class components converted to functional ones

## LAYOUT

- created how-it-works page, link from user menu CONTESTS/How it Works leads to it
- added dynamic branding
- added Events page with countdown timers functionality
- added link to "Events" in user menu
- added ButtonGroup component on /startContest/nameContest page
- added link to "Button Group" in user menu

## DB NO-SQL

Added db-no-sql repository:
https://github.com/TaypoH/task5_parovoz_count

It contains a query.mongodb query to count the number of records containing the word "паровоз" in the Messages collection.

## DB SQL

Added db-sql repositories:

https://github.com/TaypoH/task6_SQL_chat

https://github.com/TaypoH/7_8_9_tasks

- Task Display the number of users by roles {admin: 40, customer: 22, ...} File: task7.sql
- All users with the customer role who made orders during the New Year holidays from December 25 to January 14 must receive 10% cashback from all orders during this period. File: task8.sql
- For the creative role, you need to pay 3 users with the highest rating $ 10 to their accounts. File: task9.sql

developed a scheme for chat migration from NO-SQL to SQL, screenshot erd-diagram.png

## NODEJS

- created error logger (server/utils/errorLogger.js) with unified structure
- implemented daily log archiving and transformation (server/utils/archiveLogs.js)
- added schedule to copy and clear error log file automatically

## FULLSTACK

- added new role Moderator
- implemented moderation of offers (approve/reject by moderator only)
- added separate page for moderator to view and manage offers
- customer sees only approved offers, creative sees only their own offers and statuses
- added email notification to creative about moderator's decision
- added pagination for offers table

## MIGRATE CHAT FROM MONGO TO POSTGRES

- described Sequelize models and migrations
- changed the logic of requests on the server and client
- application now works with chat on SQL database instead of NoSQL 