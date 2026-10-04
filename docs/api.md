# API Documentation

Base URL: `http://localhost:5000/api` — Response: `{ "success": true, "data": ... }` hoặc `{ "success": false, "message": "...", "errors": { field: [..] } }`.
Trừ `register`, `login`, `health`, mọi API cần header `Authorization: Bearer <token>`.

## Auth
| Method | URL | Body | Ghi chú |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | 201 → `{ user, token }`; 409 nếu trùng email. `name` lưu vào `display_name` |
| POST | `/auth/login` | `{ email, password }` | 200 → `{ user, token }`; 401 nếu sai |
| GET | `/auth/me` | — | user hiện tại (`displayName, avatarUrl, dailyGoal, currentStreak, longestStreak, totalXp`) |

## Vocabularies
| Method | URL | Ghi chú |
|---|---|---|
| GET | `/vocabularies?page&limit&search&tag&level` | → `{ items, pagination }`; mỗi item kèm `examples[]`, `tags[]` (mảng tên) |
| GET | `/vocabularies/:id` | 404 nếu không có |
| POST | `/vocabularies` | Body: `hanzi, pinyin, meaning` (bắt buộc); tuỳ chọn `pronunciation, audioUrl, level, partOfSpeech, notes, examples:[{sentenceHanzi, sentencePinyin, sentenceMeaning, audioUrl?}], tags:["..."]` |
| PUT | `/vocabularies/:id` | Partial; nếu gửi `examples`/`tags` thì **thay thế toàn bộ** |
| DELETE | `/vocabularies/:id` | |

## Tags
`GET /tags` → danh sách tag.

## User Vocabularies (từ đang học)
| Method | URL | Ghi chú |
|---|---|---|
| GET | `/user-vocabularies` | kèm `vocabulary` |
| GET | `/user-vocabularies/:id` | |
| POST | `/user-vocabularies/:vocabularyId` | 201, `status="new"`; 409 nếu đã có |
| DELETE | `/user-vocabularies/:vocabularyId` | |

## Practice (Mixing + Exercise + SM-2)
1. `POST /practice/sessions` — `{ sessionType?: "mixed"|"daily_review"|"practice", sessionSize?: 1-50 }` → 201 `{ sessionId, sessionType, questions:[{ vocabularyId, exerciseId, exerciseType, hanzi, prompt, options[] }] }` (không lộ đáp án). 400 nếu chưa có từ nào.
2. `POST /practice/sessions/:sessionId/answers` — `{ vocabularyId, exerciseId, exerciseType, selectedAnswer, responseTimeMs? }` → `{ attemptId, isCorrect, correctAnswer, xpAwarded, nextReviewAt, masteryLevel, status }`. Server ghi `exercise_attempts`, `srs_reviews`, cập nhật `user_vocabularies`, `xp_transactions`, `users.total_xp`, `daily_statistics`, streak, mở khoá thành tích.
3. `PUT /practice/sessions/:sessionId/complete` — → `{ sessionId, totalQuestions, correctAnswers, xpEarned, completionBonus }` (+50 XP nếu `daily_review`). 409 nếu đã hoàn thành.

## Dashboard
| URL | Trả về |
|---|---|
| `GET /dashboard/summary` | `xp, dailyGoal, currentStreak, longestStreak, totalWords, masteredWords, dueWords, wordsLearnedToday, wordsReviewedToday, accuracyToday` |
| `GET /dashboard/weak-words` | top 10 từ `incorrect_count` cao nhất |
| `GET /dashboard/weekly-activity` | 7 ngày `{ date, wordsReviewed, xpEarned }` (từ `daily_statistics`) |
| `GET /dashboard/recent-xp` | 10 giao dịch XP gần nhất |

## Achievements
`GET /achievements` → toàn bộ catalog kèm `unlocked`, `earnedAt`.

## User Sentences (luyện đặt câu)
| Method | URL | Body |
|---|---|---|
| GET | `/user-sentences?vocabularyId=` | |
| POST | `/user-sentences` | `{ vocabularyId, sentence, pinyin? }` → `status="pending"` |
| PUT | `/user-sentences/:id` | `{ correction?, status?: "pending"\|"reviewed" }` (chấm tự động bằng AI để giai đoạn sau) |
| DELETE | `/user-sentences/:id` | |

## Health
`GET /health` → `{ "status": "ok" }`
