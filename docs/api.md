# API Documentation

Base URL: `http://localhost:5000/api` — Response: `{ "success": true, "data": ... }` hoặc `{ "success": false, "message": "...", "errors": { field: [..] } }`.
Trừ `register`, `login`, `forgot-password`, `reset-password`, `health` (và các API công khai của `/catalog`), mọi API cần header `Authorization: Bearer <token>`.

## Auth
| Method | URL | Body | Ghi chú |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | 201 → `{ user, token }`; 409 nếu trùng email. `name` lưu vào `display_name` |
| POST | `/auth/login` | `{ email, password }` | 200 → `{ user, token }`; 401 nếu sai |
| POST | `/auth/forgot-password` | `{ email }` | Công khai. **Luôn** 200 `{ requested: true }` dù email có tồn tại hay không. 503 nếu máy chủ chưa cấu hình email; 429 nếu vượt giới hạn (5 lần/15 phút/IP) |
| POST | `/auth/reset-password` | `{ token, newPassword }` | Công khai. 200 `{ reset: true }`. 400 `Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn...` cho mọi token sai/hết hạn/đã dùng; 400 + `errors.newPassword` nếu mật khẩu không hợp lệ; 429 nếu vượt 10 lần/15 phút/IP |
| GET | `/auth/me` | — | user hiện tại (`displayName, avatarUrl, dailyGoal, currentStreak, longestStreak, totalXp`) |

### Quên mật khẩu
1. `POST /auth/forgot-password` — nếu email tồn tại, server tạo token ngẫu nhiên 256 bit, **chỉ lưu SHA-256 của token** (`password_reset_tokens`), rồi gửi email chứa `FRONTEND_URL/reset-password#token=<token>` (token nằm trong fragment `#` để không lọt vào log server/Referer). Mỗi tài khoản tối đa 3 token/giờ (vượt thì im lặng bỏ qua, phản hồi vẫn như thường). Email gửi nền; lỗi SMTP chỉ được log (không log token/địa chỉ) và token tương ứng bị xoá.
2. `POST /auth/reset-password` — token hiệu lực `PASSWORD_RESET_TOKEN_TTL_MINUTES` (mặc định 30 phút), dùng **một lần** (cập nhật nguyên tử `used_at`); thành công thì mọi token reset còn lại của tài khoản bị vô hiệu và `users.password_changed_at` được đặt: **mọi JWT cấp trước thời điểm đó bị từ chối (401 "Phiên đăng nhập đã hết hiệu lực")**. Mật khẩu mới dùng cùng quy tắc đăng ký (6–72 ký tự). Server không bao giờ gửi mật khẩu qua email.
3. Lưu ý: `authenticateToken` giờ tra DB mỗi request để kiểm tra user còn tồn tại và `password_changed_at`; token của tài khoản đã xoá trả 401.

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
1. `POST /practice/sessions` — `{ sessionType?: "mixed"|"daily_review"|"practice", sessionSize?: 1-50, exerciseTypes?: string[], sentenceSource?: "saved", scope?: { level?, topic?, band? } }` → 201 `{ sessionId, sessionType, composition, questions:[{ vocabularyId, exerciseId, exerciseType, inputMode, prompt, display, options[], tokens?, exampleId?, hint?, reveal? }] }` (không lộ đáp án; `reveal` chỉ có ở dạng tự chấm). 400 nếu chưa có từ nào.
   - Server lưu **kế hoạch phiên** (`study_sessions.plan`: từ, loại bài, câu nền của từng câu hỏi).
   - `sentenceSource: "saved"`: chỉ lấy các từ bạn đã lưu câu (có `translation`) và dùng chính các câu đó làm câu nền.
   - **Fallback đúng loại bài:** nếu *mọi* loại bài được yêu cầu cần câu nền (`FILL_BLANK`, `SENTENCE_ORDER`, `TRANSLATION`, `TRANSLATION_HUB`) thì từ thiếu câu nền bị **bỏ** khỏi phiên (không còn hạ cấp âm thầm xuống `QUIZ`); nếu không còn câu nào → 400 nói rõ thiếu câu ví dụ. Phiên trộn nhiều loại (vd `/practice/multi`) vẫn hạ cấp từng câu xuống `QUIZ` và `exerciseType` phản ánh đúng loại thực tế.
2. `POST /practice/sessions/:sessionId/answers` — `{ vocabularyId, exerciseType, selectedAnswer?, quality?, exampleId?, responseTimeMs? }` → `{ attemptId, isCorrect, correctAnswer, feedback, xpAwarded, quality, intervalDays, nextReviewAt, masteryLevel, status, currentStreak, newAchievements }`. Server ghi `exercise_attempts`, `srs_reviews`, cập nhật `user_vocabularies`, `xp_transactions`, `users.total_xp`, `daily_statistics`, streak, mở khoá thành tích.
   - Từ chối: từ không thuộc phiên / sai `exerciseType` so với câu hỏi đã sinh (400); câu đã trả lời, phiên đã nhận đủ `totalQuestions`, hoặc phiên đã hoàn thành (409). Việc kiểm tra + ghi chạy trong một giao dịch có khoá phiên nên request song song không nhận XP/SRS hai lần. Phiên tạo trước khi có `plan` (cột null) vẫn dùng được, không kiểm tra kế hoạch.
   - `exampleId` của client chỉ được dùng cho phiên cũ; phiên mới lấy câu nền từ `plan`.
3. `PUT /practice/sessions/:sessionId/complete` — → `{ sessionId, totalQuestions, answeredQuestions, correctAnswers, accuracy, xpEarned, completionBonus, durationSeconds, newAchievements }` (+50 XP nếu `daily_review` có trả lời). 409 nếu đã hoàn thành (kể cả khi gọi song song: chỉ một request thắng).
4. `GET /practice/sessions`, `GET /practice/sessions/:sessionId` — lịch sử / chi tiết phiên của CHÍNH bạn (404 với phiên người khác).

### Dạng bài nào được chấm tự động?
| `exerciseType` | Chấm | Ghi chú |
|---|---|---|
| `QUIZ`, `REVERSE_QUIZ`, `PINYIN`, `LISTENING`, `FILL_BLANK`, `TRANSLATION` | Tự động (so khớp đáp án chọn) | |
| `DICTATION`, `SENTENCE_ORDER`, `TRANSLATION_HUB` | Tự động (so khớp chuỗi đã bỏ dấu câu; chính tả chấp nhận Pinyin) | Không chấm đồng nghĩa/ngữ pháp: câu đúng nghĩa nhưng khác từ ngữ vẫn bị tính sai |
| `SENTENCE_CREATION` / `SENTENCE` | **Chỉ kiểm tra từ khoá**: câu phải chứa từ mục tiêu và dài hơn từ đó | **Không chấm ngữ pháp/ngữ nghĩa** |
| `WRITING` | **Người học tự đánh giá** (`quality` 0–5) | Mô hình nhận diện (`/handwriting`) chỉ là tham khảo, không thay đổi `quality`/XP |
| `SPEAKING` | **Người học tự đánh giá** (`quality`) | Nhận dạng giọng nói của trình duyệt chỉ hiển thị cho người học, không gửi lên server; server chưa chấm phát âm |
| `FLASHCARD` | **Người học tự đánh giá** (Again/Hard/Good/Easy → `quality`) | |

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


## Handwriting — nhận diện chữ viết (cần xác thực)
Model nhận diện **một chữ Hán mỗi ảnh** (347 chữ trong `classes.json`). Backend gọi dịch vụ model qua adapter (xem `docs/handwriting-model.md`). **Model không có phân tích nét/thứ tự nét** nên API **không** trả lỗi/gợi ý sửa (`analysis` luôn `null`, `analysisSupported: false`).

| Method | URL | Ghi chú |
|---|---|---|
| GET | `/handwriting/status` | → `{ configured, available, provider, minConfidence, maxImageBytes, acceptedMimeTypes, analysisSupported }`. `configured=false` khi chưa đặt `HANDWRITING_SERVICE_URL`; `available=false` khi dịch vụ không phản hồi |
| POST | `/handwriting/recognize?vocabularyId=<uuid>` | Body = **bytes ảnh thô** (không multipart/base64), header `Content-Type: image/png`\|`image/jpeg`\|`image/webp`. `vocabularyId` tuỳ chọn, phải thuộc danh sách học của bạn |
| GET | `/handwriting/attempts?limit=20` | Lịch sử nhận diện của bạn (không có ảnh) |

`POST /handwriting/recognize` → 200:
```json
{
  "attemptId": "…",
  "status": "recognized | low_confidence | unrecognized | no_content",
  "message": "hướng dẫn hiển thị cho người học (kể cả cách thử lại)",
  "predicted": { "char": "你", "confidence": 0.93 },
  "candidates": [{ "char": "你", "confidence": 0.93 }, { "char": "尔", "confidence": 0.02 }],
  "minConfidence": 0.5,
  "match": { "targetChars": ["学","校"], "unsupportedChars": ["校"], "matchesTarget": false },
  "analysis": null,
  "analysisSupported": false
}
```
- `status`: `recognized` (độ tin cậy ≥ `HANDWRITING_MIN_CONFIDENCE`), `low_confidence` (dưới ngưỡng — vẫn có `predicted` nhưng cần thử lại), `unrecognized` (không có dự đoán), `no_content` (ảnh trống, không có nét chữ; `predicted = null`).
- `match` chỉ có khi gửi `vocabularyId`: `matchesTarget` = chữ dự đoán có nằm trong các chữ của từ; `unsupportedChars` = chữ của từ mà model **không** nhận diện được (ngoài 347 chữ).
- Lỗi: 400 (body rỗng, ảnh hỏng/không khớp chữ ký tệp), 401, 404 (`vocabularyId` không thuộc bạn), 413 (vượt `HANDWRITING_MAX_IMAGE_BYTES`, mặc định 2 MB), 415 (không phải PNG/JPEG/WebP), 422 (dịch vụ không đọc được ảnh), 429 (20 lần/phút/user), 503 (chưa cấu hình hoặc dịch vụ model không khả dụng — **không** trả kết quả giả).
- **Ảnh không được lưu** (không ghi đĩa, không ghi DB, không log). `handwriting_attempts` chỉ giữ trạng thái, chữ dự đoán, độ tin cậy, `matches_target`.
