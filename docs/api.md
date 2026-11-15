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

## Pinyin (hỗ trợ nhập)
| Method | URL | Body | Ghi chú |
|---|---|---|---|
| POST | `/pinyin/convert` | `{ text, style?: \"word\"\|\"sentence\" }` | → `{ input, pinyin, hadHanzi, hadToneNumbers }`. Đổi Hán tự (`老师` → `lǎoshī`) và Pinyin số thanh (`lao3shi1` → `lǎoshī`, `nv3` → `nǚ`) sang Pinyin có dấu. `word` ghép liền, `sentence` tách âm tiết bằng khoảng trắng |

### Tra cứu từ bằng AI (gợi ý, không ghi DB)
`POST /vocabularies/ai-lookup` — cần đăng nhập, **giới hạn 30 lượt AI / 10 phút / user** (429 + `Retry-After`; dùng chung với `/user-sentences/generate`).

Body: `{ text, focus?: "all"|"examples", avoidSentences?: string[≤10], force?: boolean }`. `text` ≤ 50 ký tự; câu dài / có dấu câu → 400; không có Hán tự → 400.

Trả về `{ input, inputType: "word"|"phrase", existing: { items, exactMatch }, suggestion, ai: { status: "ok"|"skipped"|"unavailable"|"error", message, cached }, aiGenerated, warnings }`.
- `suggestion`: `hanzi, pinyin, meaning, partOfSpeech, level, notes, examples[{sentenceHanzi, sentencePinyin, sentenceMeaning, explanation, source: "database"|"ai"}], alternativeReadings[], aiMeaning, sources{...}`.
- Quy trình: chuẩn hoá/phân loại → tra kho chung → Pinyin bằng `pinyin-pro` (không lấy Pinyin của AI) → gọi AI **chỉ khi** kho chưa đủ (thiếu nghĩa hoặc < 2 ví dụ) hoặc `force`/`focus:"examples"` → kiểm tra Zod, loại ví dụ không chứa đúng từ / trùng.
- Dữ liệu có sẵn trong kho **không bị ghi đè**; nghĩa khác của AI nằm ở `aiMeaning`. `level` từ AI luôn là *chưa xác minh* (`sources.level = "ai"`).
- Chưa cấu hình AI / AI lỗi: vẫn trả 200 với `ai.status = "unavailable"|"error"` + Pinyin từ thư viện. Lưu từ vẫn qua `POST /vocabularies` (409 nếu trùng cả Hán tự + Pinyin + nghĩa).

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
   - Tuỳ chọn `sentenceSource: "saved"`: chỉ lấy các từ bạn đã lưu câu (có `translation`) và dùng chính các câu đó làm câu nền cho `FILL_BLANK`, `SENTENCE_ORDER`, `TRANSLATION`, `TRANSLATION_HUB`. Ở chế độ thường, câu đã lưu cũng tham gia như câu ví dụ của từ. Tiến độ/SRS vẫn chỉ cập nhật qua `answers`.
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
| DELETE | `/user-sentences/:id` | Chỉ xoá được câu của chính mình (404 nếu không phải của bạn) |

**Lưu câu do hệ thống tạo** — `POST /user-sentences` nhận thêm: `translation` (bắt buộc khi `source ≠ manual`), `explanation?`, `topic?`, `level?` (ước lượng), `source: "manual"|"ai"|"existing"` (mặc định `manual`), `usedWords?: [{ vocabularyId, role: "target"|"known" }]`. Server kiểm tra lại: câu phải chứa từ mục tiêu, từ phải thuộc danh sách học của bạn, chống trùng (409), Pinyin tính lại bằng thư viện, `usedWords` chỉ giữ từ của bạn thực sự có trong câu.

**Sinh câu (xem trước, KHÔNG ghi DB)** — `POST /user-sentences/generate` (cùng giới hạn AI):
`{ mode: "new_word"|"review_mix"|"topic"|"level"|"selected_words", count?: 1-5 (mặc định 3), vocabularyId? (new_word), vocabularyIds? ≤8 (selected_words), topic? (school|family|food|shopping|time|work|daily), level? ("HSK 1"…"HSK 6") }`.
→ `{ mode, sentences[{ tempId, hanzi, pinyin, meaning, explanation, usedWords[], primaryVocabularyId, topic, level, source: "ai"|"existing" }], targets[], levelEstimated: true, usedFallback, ai, warnings[], generatedAt }`.
Chỉ dùng từ của user đăng nhập; mỗi lần chỉ gửi ≤ 5 từ mục tiêu + ≤ 8 từ bổ trợ cho AI. Câu bị loại nếu không chứa từ mục tiêu, thiếu bản dịch hoặc trùng. AI không dùng được → trả câu ví dụ có sẵn (`source: "existing"`, `usedFallback: true`), nếu không có thì lỗi 503/502/504.

## Health
`GET /health` → `{ "status": "ok" }`


---
> **Cập nhật:** nhiều endpoint đã thay đổi/bổ sung (shape của `GET /user-vocabularies`, `POST /practice/sessions`, câu hỏi không còn trả `hanzi` ở top-level mà nằm trong `display`...). Xem `docs/integration-changelog.md` để biết danh sách đầy đủ.

## Catalog — Thư viện từ vựng (theo cấp độ HSK / chủ đề / trình độ)
Phạm vi một "bộ từ": `level` (`HSK 1`…`HSK 6`, chấp nhận cả `HSK1`), `topic` (tên chủ đề = tên tag), `band` (`beginner` HSK 1-2 · `intermediate` HSK 3-4 · `advanced` HSK 5-6). Kết hợp được.

| Method | URL | Auth | Kết quả |
|---|---|---|---|
| GET | `/catalog/overview` | Công khai (có token thì kèm tiến độ `learned`) | `{ totalWords, levels[{level,number,band,total,learned}], bands[{key,label,description,levels,total,learned}], topics[{name,icon,total,learned}], authenticated }` |
| GET | `/catalog/words?level=&topic=&band=&search=&page=&limit=` | Công khai (có token thì kèm `inMyList`) | `{ items:[{id,hanzi,pinyin,meaning,partOfSpeech,level,tags[],examples[≤1],inMyList}], pagination }` — `limit` ≤ 100, mặc định 30 |
| GET | `/catalog/words/:id` | Công khai (có token thì kèm `inMyList`) | Chi tiết một từ: như trên nhưng đủ `notes` và toàn bộ `examples` |
| POST | `/catalog/enroll` | Bắt buộc | Body `{ level?|topic?|band?, limit? (1-300, mặc định 20) }` → thêm tối đa `limit` từ **chưa có** của bộ vào danh sách học (trạng thái `new`), idempotent. → `{ added, totalInScope, inMyList, remaining }` |

`POST /practice/sessions` nhận thêm `scope: { level?, topic?, band? }` → chỉ luyện các từ **trong danh sách học của bạn** thuộc bộ đó (ưu tiên đến hạn ôn → từ yếu → từ mới). 400 nếu bạn chưa thêm từ nào của bộ. `sentenceSource: "saved"` được ưu tiên hơn `scope`.

