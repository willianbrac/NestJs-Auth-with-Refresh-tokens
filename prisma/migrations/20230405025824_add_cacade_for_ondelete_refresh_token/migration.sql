-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refresh_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresIn" DATETIME,
    CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_refresh_tokens" ("expiresIn", "id", "token", "userId") SELECT "expiresIn", "id", "token", "userId" FROM "refresh_tokens";
DROP TABLE "refresh_tokens";
ALTER TABLE "new_refresh_tokens" RENAME TO "refresh_tokens";
CREATE UNIQUE INDEX "refresh_tokens_userId_key" ON "refresh_tokens"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
