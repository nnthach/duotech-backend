<!-- ──────────────────────────────────────────────────────────────
  Duotech — Template CLAUDE.md cho service Node.js mới
  Copy vào ROOT của project. Claude Code / Cursor / AI agents đọc file
  này tự động để tuân theo kiến trúc & convention khi sinh code.
  Thay <PLACEHOLDER> và xoá phần không dùng.
─────────────────────────────────────────────────────────────── -->

# user-authenticate

> Node.js + TypeScript (backend). Tuân theo Duotech Engineering Conventions.

## ⚡ Quy tắc tối quan trọng (đọc trước khi sinh bất kỳ code nào)

1. **`strict: true`, KHÔNG dùng `any`.** Dùng `unknown` + narrow. Validate mọi dữ liệu vào (request, env, message queue) bằng **Zod** — không tin client.
2. **Phân tầng rõ ràng.** `routes/controller` (HTTP) → `services` (business logic thuần, không biết HTTP) → `repositories` (truy cập DB). Logic nghiệp vụ KHÔNG nằm trong controller.
3. **Error handling tập trung.** Throw lỗi có kiểu (custom error class), bắt ở 1 middleware duy nhất. Không nuốt lỗi bằng `catch {}` rỗng.
4. **Secret chỉ đọc qua `src/config/env.ts`** (đã validate bằng Zod). Không hardcode, không đọc `process.env` rải rác.
5. **Mọi I/O bất đồng bộ phải `await`** — không để floating promise (ESLint chặn).

## 🌳 Đặt file ở đâu (kiến trúc bắt buộc)

```text
src/
├── index.ts          # entrypoint: khởi tạo server, đăng ký middleware
├── routes/           # định nghĩa endpoint, map sang controller
├── controllers/      # nhận request → gọi service → trả response (mỏng)
├── services/         # business logic thuần, test được, không biết HTTP
├── repositories/     # truy cập DB / external store
├── lib/              # client bên thứ 3, helper dùng chung
├── validations/      # Zod schema cho input
├── middlewares/      # auth, error handler, logging
├── types/            # type/interface dùng chung
└── config/           # env.ts (Zod-validated), constants.ts
```

**Bảng quyết định nhanh:**

| Tạo gì | Đặt vào |
|:-------|:--------|
| Endpoint mới | `routes/` + `controllers/` |
| Business logic | `services/` |
| Truy vấn DB | `repositories/` |
| Zod schema | `validations/` |
| Middleware (auth, log) | `middlewares/` |
| Client gọi service ngoài | `lib/` |

## 📝 Naming & Style

- File: `kebab-case.ts`. Thư mục: `kebab-case`. Class/type: `PascalCase`.
- Biến/hàm `camelCase`, hằng `UPPER_SNAKE_CASE`, boolean `is/has/can*`.
- Import alias `@/` thay vì `../../`. `import type` cho type.
- File ≤ ~250 dòng. Format do Prettier lo (đừng tự canh).

## 🔧 Mẫu code chuẩn

```ts
// Controller mỏng — validate + gọi service, không chứa business logic
export async function createOrder(req: Request, res: Response) {
  const input = CreateOrderSchema.parse(req.body); // Zod, không tin client
  const order = await orderService.create(input, req.user.id);
  res.status(201).json(order);
}
```

```ts
// env.ts — validate biến môi trường một lần khi khởi động
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
});

export const env = EnvSchema.parse(process.env);
```

## ✅ Trước khi coi là xong

- `npm run lint` + `npm run typecheck` + `npm run build` đều xanh.
- Business logic mới có test (Vitest).
- Mọi env var mới thêm vào `.env.example` + `src/config/env.ts`.

## 🛠️ Lệnh

```bash
npm run dev          # dev server (watch)
npm run build        # tsc build ra dist/
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm test             # vitest
```

## 📚 Tài liệu đầy đủ

Convention chi tiết: repo `duotech-workflows/conventions/` — `nodejs.md` (layering, error handling), `deployment.md`. Naming + git workflow nằm trong `conventions/README.md`.

<!-- Project-specific notes: thêm bên dưới (schema DB, service ngoài, quirk riêng...) -->
